// file for Nav-Bar
import React from 'react'; 
import { withStyles }  from '@material-ui/core/styles';  // material-ui 의 컴포넌트 관리 클래스
import AppBar from '@material-ui/core/AppBar';  // 네비바
import Drawer from '@material-ui/core/Drawer';  // 네비바의 요소 (작대기 세개달린 누르면 열리는 메뉴 같은거)
import MenuItem from '@material-ui/core/MenuItem';  // 네비바의 세부 아이템
import IconButton from '@material-ui/core/IconButton';  // 아래의 아이콘이 버튼 동작을 하게 onClick을 여기에 등록.
import MenuIcon from '@material-ui/icons/Menu';  // 이게 실제 작대기세개 버튼. 눌리면 drawer 열림.
import { Link as RouterLink } from 'react-router-dom';  // 바로 밑 material-ui의 Link와 이름이 같으므로 as를 이용해서 버꾸어줌.
import Link from '@material-ui/core/Link';

const styles = {
    root: {
        flexGrow:1
    },
    menuButton: {
        marginRight: 'auto'
    },
    content: {
        margin: 'auto',
        marginTop: '20px',
        //backgroundColor: "#ff0000",
    }
}

class AppShell extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            toggle: false
        };
    }
    handleDrawerToggle = () => this.setState( {toggle: !this.state.toggle} );
    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="static">
                        <IconButton className={classes.menuButton} color="inherit" onClick={this.handleDrawerToggle}>
                            <MenuIcon/>
                        </IconButton>
                    </AppBar>
                    <Drawer open={this.state.toggle}>  {/*// toggle값이 true일때만 Drawer가 열림.*/}
                        <MenuItem onClick={this.handleDrawerToggle}> {/*  MenuItem의 항목이 늘렸을때 Drawer를 닫을 수 있게끔 onClick추가 */}
                            <Link component={RouterLink} to="/">
                                Home
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component={RouterLink} to="/texts">
                                Texts Management
                            </Link>
                        </MenuItem>

                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component={RouterLink} to="/words">  {/* router를 통해 이동하는것 처럼 보여도 결국은 그냥 re-rendering임 */}
                                Words Management
                            </Link>
                        </MenuItem>
                    </Drawer>
                </div>
                <div id='content' className={classes.content}>
                    {React.cloneElement(this.props.children)} {/*router를 통해 이동하는것이 아니고, 위의 navbar를 그린 후에, 지금 이위치에 새경로의 내용물이
                                                                *다시 그려지게 된다. 새로 그려질 내용인 xxx.js의 내용물은 this.props.children에
                                                                *다 포함어짐. 잘 모르겠는게 React.cloneElement( )를 빼고 그냥 this.props.children만
                                                                *남겨두어도 똑같은 결과임. cloneElement의 역할을 모르겠음. 찾아본 바로는 child에 props
                                                                *를 넘겨줄는 용도로 쓰는것 같은데 여기선 딱히 넘겨주는게 없어서 같은건가 싶기도함. */}
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(AppShell);