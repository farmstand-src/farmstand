import React from 'react';
import ReactDOM from 'react-dom';
import FirebaseHelper from '../helpers/firebaseHelper.js';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {error: false};
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    let email = this.refs.email.value;
    let pass = this.refs.pass.value;
    let name = this.refs.name.value;
    
    FirebaseHelper.createUser(
      { email: email, password: pass},
      (error, userData) => {
        if (error) {
          this.setState({error: true});
        } else {
          FirebaseHelper.addUser(
            { user_id: userData.uid, name: name },
            (error) => {
               if (error) {
                  this.setState({error: true});
                } else {
                  FirebaseHelper.authWithPassword(
                    {email: email, password: pass},
                    (error, authData) => {
                      if (error) {
                        // weird this would fail here!
                        this.setState({error: true});
                      } else {
                        this.props.history.replaceState(null, '/about');
                      }
                    });
                }
            });
        }
      });
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="name" placeholder="name" defaultValue="Joe Plumber" /></label>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" /></label><br />
        <button type="submit">register</button>
        {this.state.error && (
          <p>Registration failed</p>
        )}
      </form>
    )
  }
}