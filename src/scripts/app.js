import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';
import { createHistory, useBasename } from 'history';
import 'babel-polyfill';
import FirebaseHelper from './helpers/firebaseHelper.js';
import Login from './components/login.js';
import Logout from './components/logout.js';
import Register from './components/register.js';
import About from './components/about.js';

// for developer tools
window.React = React;

const history = useBasename(createHistory)({
  basename: '/farmstand'
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: FirebaseHelper.authData !== null
    };
    
    this.updateAuthStatus = this.updateAuthStatus.bind(this);
  }
  
  updateAuthStatus(authData) {
    this.setState({
      loggedIn: authData !== null
    });
  }
  
  componentWillMount() {
    FirebaseHelper.onAuth(this.updateAuthStatus);
  }
    
  render() {
    return (
      <div>
        { 
          this.state.loggedIn ? 
            (<Link to='/logout'>Logout</Link>) :
            (<Link to='/login'>Login</Link>)
        }
      
      {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>
      <Route path="logout" component={Logout}/>
      <Route path="register" component={Register}/>
      <Route path="about/:userId" component={About}/>
    </Route>
  </Router>,
  document.body
);
