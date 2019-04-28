import React from 'react';

const Header = (props) => (

    <header className="App-header">
        {props.providerData && <p>{props.providerData[0].displayName}</p>}

        <h1>Habit Tracker</h1>
    </header>
);

export default Header;