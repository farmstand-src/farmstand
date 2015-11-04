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
    let farmer = this.refs.farmer.value;
    
    FirebaseHelper
      .createUser({ email: email, password: pass})
      .then((userData) => {
        return FirebaseHelper.addUser({user_id: userData.uid, name: name, isFarmer: !!farmer})})
      .then(() => {
        return FirebaseHelper.authWithPassword({email: email, password: pass})})
      .then((authData) => {
        this.props.history.replaceState(null, '/about/' + authData.uid)})
      .catch((error) => {
        this.setState({error: true})});
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="name" placeholder="name" defaultValue="Joe Plumber" /></label>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" /></label>
        <label>Farmer ?<input ref="farmer" type="checkbox" /></label><br />
        <button type="submit">register</button>
        {this.state.error && (
          <p>Registration failed</p>
        )}
      </form>
    )
  }
}