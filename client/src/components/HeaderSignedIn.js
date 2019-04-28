import React from 'react';

const HeaderSignedIn = (props) => {
    return (

        <section>
            <header className="headerLogin">
                <button
                    onClick={hamburgerToggle}
                    onKeyPress={hamburgerToggle}
                    aria-haspopup="true"
                    aria-expanded={"false"}
                    id="hamburger-menu" >
                    <i className="main-button-icon fa fa-bars fa-3x"></i>
                </button>

                <nav id="sidebar" className={hamburgerOpen ? "open" : null}>
                    <ul>
                        <li>User Settings</li>
                        <li>About</li>
                        <li>Resources</li>
                    </ul>
                </nav>

                <h1>Habit Tracker</h1>

                <h1>[placeholder]</h1>
            </header>
        </section>
    );
}

export default HeaderSignedIn;