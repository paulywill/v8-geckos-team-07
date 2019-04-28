import React from 'react';

const Header = (props) => (
    

    <header className="App-header">      
       
        {props.providerData && <button
            
            aria-haspopup="true"
            aria-expanded={"false"}
            id="hamburger-menu" >
            <i className="main-button-icon fa fa-bars fa-3x"></i>
        </button>}

            <h1>Habit Tracker</h1> 
        
        
        {props.providerData && 
               
                        <img src={props.providerData[0].photoURL}
                             alt={props.providerData[0].providerName}
                             className="container__profile--photo" />
                   
               }
            
    </header>
   
);

export default Header;