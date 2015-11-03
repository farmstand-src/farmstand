import React from 'react';
import ReactDOM from 'react-dom';
import FirebaseHelper from '../helpers/firebaseHelper.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAuthCallback = this.handleAuthCallback.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    let email = this.refs.email.value;
    let pass = this.refs.pass.value;
    
    FirebaseHelper.authWithPassword(
      { "email": email, "password": pass },
      this.handleAuthCallback
    );
  }
  
  handleAuthCallback(error, authData) {
    if (error) {
      this.setState({error: true});
    } else {
      this.setState({error: false});
    }
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
}