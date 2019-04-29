// React core.
import React, { Component } from 'react';

// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Styles
import styles from './index.css'; // This uses CSS modules.
import './firebaseui-styling.global.css'; // Import globally.

//Components
import Header from './components/Header';
import Login from './components/Login';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

// Instantiate a Firebase app.
const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
  //databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
});

class App extends Component {

  state = {
    isSignedIn: undefined,
    displayName: undefined,
    email: undefined
  };


  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
      //User is signed in.
      console.info('User is signed in.');
      this.setState({providerData: user.providerData}) 
      this.setState({ displayName: user.providerData[0].displayName })  
      this.setState({ email: user.providerData[0].email })   
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
     
      <div className={styles.container}>
        {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
          //Not signed-in yet
          <div>
            <Header />
            <Login />
            <StyledFirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig}
              firebaseAuth={firebaseApp.auth()} />
            <Footer />
          </div>
        }

        {this.state.isSignedIn &&
          //Signed in
          <div className={styles.signedIn} id="content-wrap">
            <Header providerData={this.state.providerData} />
            <Dashboard 
              displayName={this.state.displayName} 
              email={this.state.email} />
            <button>
              <a className={styles.button} onClick={() => firebaseApp.auth().signOut()}>Sign-out</a>
            </button>
            <Footer /> 
          </div>
        }   
      </div>
    );
  }
}

export default App;