import React from 'react';
import ReactDOM from 'react-dom';
import FirebaseHelper from '../helpers/firebaseHelper.js';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  
  render() {
    let {userId} = this.props.params;
    FirebaseHelper
      .getUser(userId)
      .then((userData) => { this.setState(userData) })
      .catch((error) => { this.setState({name: 'Error'})});
                        
    return <div>User's name is {this.state.name}</div>;
  }
}