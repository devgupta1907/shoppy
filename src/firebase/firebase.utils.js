import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyCGhMwsyzFJ9DnZoKJkEYMwHgW7GJJf6fo",
  authDomain: "shoppy-db-20334.firebaseapp.com",
  projectId: "shoppy-db-20334",
  storageBucket: "shoppy-db-20334.appspot.com",
  messagingSenderId: "181440089102",
  appId: "1:181440089102:web:c3a424480083f9a62dc05f",
  measurementId: "G-CRV6VYDSSK"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;