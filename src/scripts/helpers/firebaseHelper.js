import Firebase from 'firebase';

let firebaseRef = new Firebase('https://farmstand.firebaseio.com');
let usersRef = firebaseRef.child('users');

export default class FirebaseHelper {
  
  static get authData() {
    return firebaseRef.getAuth();
  }
  
  static createUser(authInput) {
    return new Promise((resolve, reject) => {
      firebaseRef.createUser(
        authInput,
        (error, userData) => {
          if (error) {
            reject(error);
          } else {
            resolve(userData);
          }
        }
      );
    });
  }
  
  static authWithPassword(authInput) {
    return new Promise((resolve, reject) => {
      firebaseRef.authWithPassword(
        authInput,
        (error, authData) => {
          if (error) {
            reject(error);
          } else {
            resolve(authData);
          }
        }
      );
    });
  }
  
  static logout() {
    firebaseRef.unauth();
  }
  
  static onAuth(onAuthHandler) {
    firebaseRef.onAuth(onAuthHandler);
  }
  
  static addUser(userData, addUserCallback) {
    //TODO: need to validate userData
    return new Promise((resolve, reject) => {
      usersRef.child(userData.user_id).set(
        userData,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }
  
  static getUser(userId) {
    return new Promise((resolve, reject) => {
      usersRef.child(userId).once(
        'value', 
        (userDataSnapshot) => {
          //TODO: need to validate snapshot
          resolve(userDataSnapshot.val());
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}


