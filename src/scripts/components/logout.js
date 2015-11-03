import React from 'react';
import ReactDOM from 'react-dom';
import FirebaseHelper from '../helpers/firebaseHelper.js';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    FirebaseHelper.logout();
  }
  
  render() {
    return <div>You are successfully logged out</div>;
  }
}