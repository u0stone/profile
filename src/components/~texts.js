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
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

const styles = theme => ({
    hidden:{
        display: 'none'
    },
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    }
});

const databaseURL="https://word-cloud-f3a21.firebaseio.com";

class Texts extends React.Component {
    constructor() {
        super()
        this.state={
            texts: {},  // db server로 부터 받아온 내용
            textName:'',  // db server에서 온 각 texts의 id (Hash key값)
            fileName: '',  // 보낼 파일이름
            fileContent: null,  // 보낼 파일내용
            dialog: false,  // dialog가 보이면 true, 안보이면 false
        };
    }

    __get() {   // firebase 서버에 있는 text 정보 싹 읽어오기.
        fetch(`${databaseURL}/texts.json`).then(res=>{
            //console.log('try __get');
            if(res.status != 200){  
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(texts=>this.setState({texts:(texts==null)? {}:texts}));
    }

    __post(text) {  // firebase 서버에 text upload 요청.
        return fetch( `${databaseURL}/texts.json`, {
            method: 'POST',  body: JSON.stringify(text) 
        }).then(res=>{                       
            console.log('try __post');
            if(res.status != 200){  
                throw new Error(res.statusText);
            };

            console.dir(res);
            return res.json();
        }).then( data => {
            let nextState=this.state.texts;
            nextState[data.name] = text;
            this.setState({texts: nextState})
            this.setState({text:''});
            this.setState({weight:''});
        })
    }
    
    __delete(id){  // firebase서버에 word 삭제 요청
        return fetch(`${databaseURL}/texts/${id}.json`, {
            method: 'DELETE', 
        }).then(res=>{
            console.log('try __delete');
            if(res.status != 200){  
                throw new Error(res.statusText);
            };
            return res.json();
        }).then(data =>{
            console.log("delete id:"+id);
            let nextState=this.state.texts;  // 에? this.state.words가 실제 배열이었구만.
      //      console.log(nextState);
            delete nextState[id];
            this.setState({texts: nextState});
        });    
    }
    
    handleDialogToggle = ()=> this.setState({
        dialog: !this.state.dialog,
        fileName: '',
        fileContent: '',
        textName:''
    })

    handleValueChange = (e)=>{  //입력하면 해당 text 갱신해줌.
        let nextState ={};
        nextState[e.target.name]= e.target.value;
        this.setState(nextState);
    }

    handleSubmit = ()=>{

        const text={
            textName: this.state.textName,
            textContent: this.state.fileContent
        }

        this.handleDialogToggle();
        console.log(text);
        if(!text.textName && !text.fileContent){
            return;
        }
        this.__post(text);
    }


    handleDelete = (id)=>{
        this.__delete(id);
    }

    componentDidMount(){  // 처음 시작될때 읽어오기 시도.  useEffect( , [])를 써도 결과는 같을것임.
        this.__get();
    }

    handleFileChange = (e)=>{   // 사용자가 파일을 upload 했을때 파일 내용을 this.state.fileContent에 담아준다.
                                // 파일 내용은 callback에서, 파일이름은 읽기 시도할때 e.target.value에 들어오고 이것도 this.state.fileName에 저장
        let reader = new FileReader();
        reader.onload = ()=> {
            let text=reader.result;
            this.setState( {fileContent: text} );
        }
        reader.readAsText(e.target.files[0], "UTF-8");
        this.setState( {fileName: e.target.value} );
    }

    render() {
        console.log("my Msg");
        console.log(this.props);        
        const { classes } = this.props;  // style을 props로 넘겨받아야 하네.
        return(
            <div>

                {Object.keys(this.state.texts).map( id=>{   
                    const text=this.state.texts[id];
                    console.log(text);
                    return (
                        <div key={id}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        name {text.textName}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h5" component="h2">
                                                Content: <TextTruncate line={1} truncateText="..." text={text.textContent} />
                                            {/* 또는 Content: {text.textContent.substring(0, 20)+"..."} */}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Link component={RouterLink} to={"detail/"+id} >
                                                <Button variant="contained" color="primary" >View</Button>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="primary" onClick={()=>this.handleDelete(id)}>Delete</Button>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>
                        </div>
                    );
                })}

                <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
                    <AddIcon/>
                </Fab>
                {/* 다이얼로그창 구성. 보통 세부분으로 구성 Title + Content(바디) + Action(OK, Cancel등의 버튼)으로 구성됨
                    <Dialog open을 toggle 변수에 직접 붙여놓으면, toggle변수의 값 만으로 dialog를 보였다, 안보였다 하게 할수 있다.
                    아래의 DialogContent를 보면 TextField의 value를 this.state에 직접 연결시켜놓고, OnChange에서 setState하게하여 rerender하게끔 한다.    
                */}
                <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}> 
                    <DialogTitle>Add Text</DialogTitle>
                    <DialogContent>
                       <TextField label = "Text Name" type="text" name='textName' value={this.state.textName} onChange={this.handleValueChange}/> <br/><br/>
                       <input className={classes.hidden} accept="text/plain" id="raised-button-file" type="file" 
                            file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName ? this.state.fileName : ".txt 파일 선택"}
                            </Button>
                        </label>
                        <TextTruncate line={1} truncateText="..." text={this.state.fileContent} />
                    {/* 또는   {this.state.fileContent.substring(0, 20)+"..."} */}
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

export default withStyles(styles)(Texts); 