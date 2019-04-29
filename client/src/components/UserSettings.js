import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../containers/Layout';

class UserSettings extends Component {
    
    render() {
        return (
            <Layout>
                <h2>User Settings </h2>
                <p>Ability to change data about habit?</p>
                <p>Button to unlink google account</p>
                <p>Button to delete data from database</p>

                <Link to="/Dashboard">Back to Dashboard</Link>

            </Layout>
        )
    }
}

export default UserSettings;


/* TESTING: Require the unlink button in user settings

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class SocialProfileList extends PureComponent {
    static propTypes = {
        auth: PropTypes.func.isRequired,
        providerData: PropTypes.arrayOf(PropTypes.object).isRequired,
        unlinkedProvider: PropTypes.func.isRequired
    };

    /* Unlinks a provider from the current user account */

/*
    handleProviderUnlink = async (e, provider) => {
    const { auth, unlinkedProvider } = this.props;

    if (window.confirm(`Do you really want to unlink ${provider}?`)) {
        const providers = await auth()
            .currentUser.unlink(`${provider}.com`)
            .catch(err => console.error(err));

        unlinkedProvider(provider, providers.providerData);
    }
};

renderProfileList = ({ providerId, photoURL }) => {
    const providerName = providerId.split('.')[0];

    return (
        <div className="container__profile" key={providerName}>
            <img
                src={photoURL}
                alt={providerName}
                className="container__profile--photo"
            />


            <button
                className="container__profile--btn"
                onClick={e => this.handleProviderUnlink(e, providerName)}
            >Unlink
                </button>



        </div>
    );
};

render() {
    return (
        <Fragment>

            <div className="btn__profiles--list">
                {this.props.providerData.map(this.renderProfileList)}
            </div>
        </Fragment>
    );
}
}

export default SocialProfileList;

*/