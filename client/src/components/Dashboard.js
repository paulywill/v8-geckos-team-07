import React, { Component } from 'react';
import axios from 'axios';

import NewHabit from './NewHabit';
import CheckIn from './CheckIn';
import CurrentHabit from './CurrentHabit';
import Progress from './Progress';

class Dashboard extends Component {
    
    state = {
        newEntry: false,
        newEntryButton: true,
        habitData: [],
        hamburgerOpen: false,
        checkIn: false,
        habitExist: false
    };


    handleCheckIn = () => {


    }    

    componentDidMount(){
        console.log("did Mount: this.state.habitExist: " + this.state.habitExist)
    }

    //used componentDidUpdate due to async nature of firebase/props
    componentDidUpdate(prevProps) {
        if (this.props.email !== undefined && this.props.email !== prevProps.email) {
            // Do what you want with email
            const user = this.props.email
            console.log("Dashboard - email is: " + user)
            
            axios.get('/api/habits/first-habit/' + user)
                .then(res =>
                    
                    
                    
                    this.setState({ habitData: res.data.data }, () => {
                        this.state.habitData ? this.setState({
                            newEntry: false, newEntryButton: false,
                            habitExist: true
                        }) : this.setState({ newEntry: true, newEntryButton: true, habitExist: false })
                    })
                )
                        
                .catch(error =>
                    console.log(error)
                )

            console.log("Didupdate this.state.habitExist: " + this.state.habitExist)


            if (this.state.habitExist) {
                let checkInComp = <CheckIn checkIn={this.state.checkIn}
                    habitId={this.state.habitData._id}
                    handleCheckIn={this.handleCheckIn}
                    handleCheckInSubmit={this.handleCheckInSubmit} />;
                let checkInButton = <button className='habitButton' onClick={this.handleCheckIn}>Check In</button>
                console.log("checkInComp: " + checkInComp)
                console.log("checkInButton: " + checkInButton)

            } else {
                let checkInComp = null;
                let checkInButton = null;
                console.log("checkInComp: " + checkInComp)
                console.log("checkInButton: " + checkInButton)
            }

                    


        }
    }

    handleNewHabit = () => {
        this.setState({ newEntry: true })
    }
    handleNewHabitSubmit = (data) => {
        this.setState({ newEntry: false, habitExist: true, newEntryButton: false, habitData: data });
    }

    handleCheckInSubmit = () => {
        this.setState({ checkIn: false })
    }

    //toggle visibility of sidebar with Button
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

    render()  {
        let newHabitButton = null
        if (this.state.newEntryButton) {
            newHabitButton = <button className='habitButton' onClick={this.handleNewHabit} >Create New Habit</button>
        } else {
            newHabitButton = null
        }

        
        
        
        

        
        return (
            <div>

                
                <NewHabit email={this.props.email}
                    handleNewHabitSubmit={this.handleNewHabitSubmit}
                    newEntry={this.state.newEntry} />
                {/* checkInComp*/}
                <main>
                    <h1>Hello, {this.props.displayName}!</h1>

                    <p>Have a habit? : {this.state.habitExist.toString()}</p>
                   
                    {this.state.habitExist && 
                    <button className='habitButton' onClick={this.handleCheckIn}>Check In</button>}
                    

                    <h2>Daily Dashboard</h2>






                    {newHabitButton}
                    {/* checkInButton */}
                    <Progress />
                    <CurrentHabit {...this.state.habitData} />
                </main>
            </div>
        );
    }
}

export default Dashboard;
