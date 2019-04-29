import React, { Component } from 'react';


class Dashboard extends Component {
   

    componentDidUpdate() {
        if (this.props.email != undefined && this.props.email) {
            // Do what you want with email
            console.log(this.props.email)
        }
    }

    render()  {
        const email = this.props.email
        
        return (
            <div>
                <h1>Hello, {this.props.displayName}!</h1>
                <h2>Your email is: {email}</h2> 
            </div>
        );
    }
}

export default Dashboard;
