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
//import HeaderSignedIn from './components/HeaderSignedIn';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';





// Get the Firebase config from the auto generated file.
// *** REMOVED : just using auth from Firebase

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
        
        


        {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
          //Not signed-in yet
          <div>
            <Header />  
            <StyledFirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig}
              firebaseAuth={firebaseApp.auth()} />
            <Footer />
          </div>
        }

        {this.state.isSignedIn &&
          //Signed in
          <div className={styles.signedIn} id="content-wrap">
            <Header />
            <Dashboard />
          <button><a className={styles.button} onClick={() => firebaseApp.auth().signOut()}>Sign-out</a></button>
            <Footer /> 
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