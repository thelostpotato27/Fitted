import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import {app} from "../firebaseConfig"


function LoginPage() {

  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(getAuth(app));

  const uiConfig = {
    // callbacks: {
    //   signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    //     // User successfully signed in.
    //     // Return type determines whether we continue the redirect automatically
    //     // or whether we leave that to developer to handle.
    //     return true;
    //   },
    //   uiShown: function() {
    //     // The widget is rendered.
    //     // Hide the loader.
    //     document.getElementById('loader').style.display = 'none';
    //   }
    // },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    // signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        clientId: '409654008971-28t0d1p3ou1q4rgp1logh0plark9hrm9.apps.googleusercontent.com'
      },
      
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    // tosUrl: '<your-tos-url>',
    // Privacy policy url.
    // privacyPolicyUrl: '<your-privacy-policy-url>'
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
  };

  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);

  return(
    <div>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
    
  )
}

export default LoginPage;