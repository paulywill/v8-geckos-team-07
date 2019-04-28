// React core.
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Styles
import styles from './index.css'; // This uses CSS modules.
import './firebaseui-styling.global.css'; // Import globally.

// Get the Firebase config from the auto generated file.

// Instantiate a Firebase app.
const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
  //databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
});

class App extends Component {

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  state = {
    isSignedIn: undefined,
  };

  /**
   * @inheritDoc
   */
  componentDidMount() {
    this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
    });
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

/**
 * @inheritDoc
 */

  render() {
    return (
     
      <div className={styles.container}>
        
        <div className={styles.caption}>This is a cool demo app</div>
        {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
          <div>
            <StyledFirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig}
              firebaseAuth={firebaseApp.auth()} />
          </div>
        }
        {this.state.isSignedIn &&
          <div className={styles.signedIn}>
            Hello {firebaseApp.auth().currentUser.displayName}. You are now signed In!
            <a className={styles.button} onClick={() => firebaseApp.auth().signOut()}>Sign-out</a>
          </div>
        }
      </div>



      /* => TESTING: NOT FOR PROD
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route {...this.state} path="/dashboard" component={withAuthentication(Dashboard)} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      */
    );
  }
}

export default App;