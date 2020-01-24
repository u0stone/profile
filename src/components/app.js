import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import Login from './login'

class App extends React.Component{
    render(){
        return (
            <Router>
                    <div>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/login' component={Login}/>
                    </div>
            </Router>
        );
    }
}
export default App;

/*
//import Texts from './Texts';
//import Words from './Words';
//import Detail from './detail';

  //                      <Route exact path='/texts' component={Texts}/>
  //                      <Route exact path='/words' component={Words}/>
  //                      <Route exact path='/detail/:textID' component={Detail}/>
*/