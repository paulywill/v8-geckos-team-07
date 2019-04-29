import React, { Component } from 'react';
import axios from 'axios';
import NewHabit from './NewHabit';
import CheckIn from './check-in';
import CurrentHabit from './CurrentHabit';
import Progress from './Progress';

class Dashboard extends Component {
    
    state = {
        providerData: this.props.providerData,
        newEntry: false,
        newEntryButton: true,
        habitData: [],
        user: "",
        hamburgerOpen: false,
        checkIn: false,
        habitExist: false,
        data: [],
    };

    
    componentDidMount = () => {
        /*
        const user = this.state.providerData
        this.setState({ user: user[0].email })
     
        axios.get('/api/habits/first-habit/' + user[0].email)
            .then(res => 
                this.setState({ habitData: res.data.data }, () => {
                    this.state.habitData ? this.setState({newEntry: false, newEntryButton: false, 
                        habitExist: true}) : this.setState({newEntry: true, newEntryButton: true, habitExist: false})
                })
            )
            .catch(error =>
                console.log(error)
            )            
       */ 
        }
    

    /*
    handleCurrentProviders = providerData => {
        this.updateProviders(providerData);
    };
    */



    handleNewHabit = () => {
        this.setState({newEntry: true})
    }
    handleNewHabitSubmit = (data) => {
        this.setState({newEntry: false, habitExist: true, newEntryButton: false, habitData: data});
    }

    handleCheckInSubmit = () => {
        this.setState({checkIn: false})
    }

    //toggle visability of sidebar with Button
    hamburgerToggle = () => {
        this.setState((prevState) => ({
            hamburgerOpen: !prevState.hamburgerOpen
        }));
    }

    //open check in form
    handleCheckIn = () => {
        this.setState((prevState) => ({
            checkIn: !prevState.checkIn
        }))
    }

    render() {

        let newHabitButton = null;
        if (this.state.newEntryButton){
            newHabitButton = <button className='habitButton' onClick={this.handleNewHabit} >Create New Habit</button>
        } else {
            newHabitButton = null
        }

        let checkInComp = null;
        let checkInButton = null;
        if (this.state.habitExist){
            checkInComp = <CheckIn checkIn={this.state.checkIn} 
                    habitId={this.state.habitData._id}
                    handleCheckIn={this.handleCheckIn} 
                    handleCheckInSubmit={this.handleCheckInSubmit} />;
            checkInButton = <button className='habitButton' onClick={this.handleCheckIn}>Check In</button>
        } else {
            checkInComp = null;
            checkInButton = null;
        }

        return (
            <div id="content-wrap">
                
                <main {...this.state}>

                    
                    <h2>Daily Dashboard</h2>
                    
                    
                    
                    {newHabitButton}
                    {checkInButton}
                    <Progress />
                    <CurrentHabit {...this.state.habitData} />
                </main>
            </div>
        );
    }
}

export default Dashboard;
