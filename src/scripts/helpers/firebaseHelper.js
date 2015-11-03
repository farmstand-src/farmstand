import Firebase from 'firebase';

let firebaseRef = new Firebase('https://farmstand.firebaseio.com');

export default class FirebaseHelper {
  
  static get authData() {
    return firebaseRef.getAuth();
  }
  
  static authWithPassword(authInput, authCallback) {
    firebaseRef.authWithPassword(authInput, authCallback);
  }
  
  static onAuth(onAuthHandler) {
    firebaseRef.onAuth(onAuthHandler);
  }
}

