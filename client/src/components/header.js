import React from 'react';

const Header = (props) => (
    
    <div>
        {/* Logged in*/}
        {props.providerData &&  
            <header className="headerLogin">
                <button 
                    aria-haspopup="true"
                    aria-expanded={"false"}
                    id="hamburger-menu" >
                    <i className="main-button-icon fa fa-bars fa-3x"></i>
                </button>
                <h1>Habit Tracker</h1> 
                <img src={props.providerData[0].photoURL}
                    alt={props.providerData[0].providerName}
                    className="container__profile--photo" />

            </header>
        }
        {/* Not Logged in*/}
        {!props.providerData && 
            <header >
                <h1>Habit Tracker</h1>
            </header>
        }
    </div>
);  

export default Header;