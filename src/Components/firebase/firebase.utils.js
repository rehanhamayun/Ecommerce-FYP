import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyDdOp9ZdnufdB6A_uAq6SmQSzyRBPMk44A",
    authDomain: "crown-ddbb.firebaseapp.com",
    databaseURL: "https://crown-ddbb.firebaseio.com",
    projectId: "crown-ddbb",
    storageBucket: "crown-ddbb.appspot.com",
    messagingSenderId: "874713485753",
    appId: "1:874713485753:web:6ddc800323f8bf29526668",
    measurementId: "G-MN4RY80TDH"
  };

  export const createUserProfileDoc =async (userAuth , addtionalData) => {

    if(!userAuth)
    return ;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
        const {displayName , email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...addtionalData
            })
        } catch (error) {
            console.log(error.message )
        }
    }
    return userRef;

      }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;