import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import resume from './Resume';
import contact from './Contact';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/resume" component={resume} />
					<Route exact path="/contact" component={contact} />
				</Switch>
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
