import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';  // bootstap 화면 구성과 비슷한것 가로 12쪽 낸것.
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab'; // 추가 버튼. 화면 우하단에 위치할 혼자 둥등 떠있는 add button.
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    }
});

const databaseURL="https://word-cloud-f3a21.firebaseio.com";

class Words extends React.Component {
    constructor() {
        super()
        this.state={
            words: {},
            dialog: false,  // dialog가 보이면 true, 안보이면 false
            word: '', // 사용자가 입력한 단어
            weight: '', // 사용자가 입력한 가중치
        };
    }
    __get() {   // firebase 서버에 있는 word 정보 싹 읽어오기.
        fetch(`${databaseURL}/words.json`).then(res=>{
            //console.log('try __get');
            if(res.status != 200){  
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(words=>this.setState({words:words}));
    }

    __post(word) {  // firebase 서버에 word add 요청.
        /*
        const jsWord = 
        `{ "${this.state.words.length}": 
            {
                "word": "${this.state.word}",
                "weight":"${this.state.weight}" 
            } 
        }`;
        
        return fetch( `${databaseURL}/words.json`, {
            method: 'PATCH',  body: jsWord     // 이유는 모르겠고, 원래는 'POST'로 보내야 하는데, 그렇게하면 1,2,3 순으로 인덱스가 붙지않고
        */                                     // 이상한 hash값 같은것에 붙어버림. PATCH로 해서 인덱스까지 포함시켜보냐야 제대로 동작함.
        return fetch( `${databaseURL}/words.json`, {
            method: 'POST',  body: JSON.stringify(word) //jsWord 
        }).then(res=>{                       
            console.log('try __post');
            if(res.status != 200){  
                throw new Error(res.statusText);
            };

            console.dir(res);
            return res.json();
        }).then( data => {
            let nextState=this.state.words;
            //console.dir(data);
            // nextState[`${this.state.words.length}`] = word;  //이건 'PATCH랑 동작할때 연속되는 숫자의 index를 전송하기위해
            nextState[data.name] = word;  // data.name 즉 post후 firebase db로 부터 return 받은 result에는 새로 입력된데이터의 hash id가 들어있음.
            this.setState({words: nextState})
            this.setState({word:''});
            this.setState({weight:''});
        })
    }
/*
    // Fetch the original image
fetch('./tortoise.png')
// Retrieve its body as ReadableStream
.then(response => response.body)
.then(body => {
  const reader = body.getReader();
 */
    __delete(id){  // firebase서버에 word 삭제 요청
        return fetch(`${databaseURL}/words/${id}.json`, {
            method: 'DELETE', 
        }).then(res=>{
            console.log('try __delete');
            if(res.status != 200){  
                throw new Error(res.statusText);
            };
            return res.json();
        }).then(data =>{
            console.log("delete id:"+id);
            let nextState=this.state.words;  // 에? this.state.words가 실제 배열이었구만.
      //      console.log(nextState);
            delete nextState[id];
            this.setState({words: nextState});
        });    
    }

    handleDialogToggle = ()=> this.setState({
        dialog: !this.state.dialog
    })

    handleValueChange = (e)=>{  //입력하면 해당 text 갱신해줌.
        let nextState ={};
        nextState[e.target.name]= e.target.value;
        this.setState(nextState);
    }

    handleSubmit = ()=>{

        const word={
            word: this.state.word,
            weight: this.state.weight
        }

        this.handleDialogToggle();
        if(!word.word && !word.weight){
            return;
        }
        this.__post(word);
    }

    handleDelete = (id)=>{
        this.__delete(id);
    }
    componentDidMount(){  // 처음 시작될때 읽어오기 시도.  useEffect( , [])를 써도 결과는 같을것임.
        this.__get();
    }

    render() {
        const { classes } = this.props;  // style을 props로 넘겨받아야 하네.
        return(
            <div>
         {/*      {Object.values(this.state.words).map( (word, idx)=>{ //아래것이나 결과는 비슷하지만 다름. 이건 words배열을 바로 불러와서 썼고,
                                                                     //map이 제공하는 idx를 index로 써서 반드시 db의 index가 숫자로 연속돼 있어야만 함.
        */}
        {/* 아래두줄은 윗줄과 다르게  index를 불러와서(firebase db에 word를 추가하면 index부분에 연속되는 숫자가 아닌
            hash key가 붙음 - mongo의 _id 비슷한것) map을 써서, 아래줄에서 index(hash key)로 다시 
            word를 가져옴. 그런데, Object.vaues()나 keys()를 map()을 위해 써야하는건 몰랐음.*/}
                {Object.keys(this.state.words).map( id=>{   
                    const word=this.state.words[id];
                    console.log(word);
                    return (
                        <div key={id}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        가중치 {word.weight}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h5" component="h2">
                                                {word.word}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="contained" color="primary" onClick={()=>this.handleDelete(id)}>Delete</Button>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
                {/* 화면 우하단에 위치할 add float button임. */}
                <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
                    <AddIcon/>
                </Fab>
                {/* 다이얼로그창 구성. 보통 세부분으로 구성 Title + Content(바디) + Action(OK, Cancel등의 버튼)으로 구성됨
                    <Dialog open을 toggle 변수에 직접 붙여놓으면, toggle변수의 값 만으로 dialog를 보였다, 안보였다 하게 할수 있다.
                    아래의 DialogContent를 보면 TextField의 value를 this.state에 직접 연결시켜놓고, OnChange에서 setState하게하여 rerender하게끔 한다.    
                */}
                <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}> 
                    <DialogTitle>Add Word</DialogTitle>
                    <DialogContent>
                        <TextField label = "Word" type="text" name='word' value={this.state.word} onChange={this.handleValueChange}/> <br/>
                        <TextField label = "weight" type="text" name='weight' value={this.state.weight} onChange={this.handleValueChange}/> <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='primary' onClick={this.handleSubmit}>Add</Button>
                        <Button variant='outlined' color='primary' onClick={this.handleDialogToggle}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(Words); 