import Firebase from 'firebase';

let firebaseRef = new Firebase('https://farmstand.firebaseio.com');
let usersRef = firebaseRef.child('users');

export default class FirebaseHelper {
  
  static get authData() {
    return firebaseRef.getAuth();
  }
  
  static createUser(authInput, createCallback) {
    firebaseRef.createUser(authInput, createCallback);
  }
  
  static authWithPassword(authInput, authCallback) {
    firebaseRef.authWithPassword(authInput, authCallback);
  }
  
  static logout() {
    firebaseRef.unauth();
  }
  
  static onAuth(onAuthHandler) {
    firebaseRef.onAuth(onAuthHandler);
  }
  
  static addUser(userData, addUserCallback) {
    //TODO: need to validate userData
    usersRef.child(userData.user_id).set(userData, addUserCallback);
  }
}

