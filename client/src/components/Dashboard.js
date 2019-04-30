import React, { Component } from 'react';
import axios from 'axios';

import NewHabit from './NewHabit';
import NewHabitForm from './NewHabitForm';
import CheckIn from './CheckIn';
import CurrentHabit from './CurrentHabit';
import Progress from './Progress';
import CheckInForm from './CheckInForm';

class Dashboard extends Component {
    
    state = {
        newEntry: false,
        newEntryButton: true,
        habitData: [],
        hamburgerOpen: false,
        checkIn: false,
        habitExist: false
    };

    //used componentDidUpdate due to async nature of firebase/props
    componentDidUpdate(prevProps) {
        if (this.props.email !== undefined && this.props.email !== prevProps.email) {
            // Do what you want with email
            const user = this.props.email            
            axios.get('/api/habits/first-habit/' + user)
                .then(res =>                
                    this.setState({ habitData: res.data.data }, () => {
                        this.state.habitData ? this.setState({
                            habitExist: true, newEntry: false, newEntryButton: false
                        }) : this.setState({ newEntry: true, newEntryButton: true, habitExist: false })
                    })
                )        
                .catch(error =>
                    console.log(error)
                )
        }
    }

    handleNewHabit = () => {
        this.setState({ newEntry: true })
    }
    handleNewHabitSubmit = (data) => {
        this.setState({ newEntry: false, newEntryButton: false, habitData: data });
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

    //open check in form
    handleCheckIn = () => {
        this.setState((prevState) => ({
            checkIn: !prevState.checkIn
        }))
    }

    render()  {       
        return (
            <div>           
                <main>
                    <h1>Hello, {this.props.displayName}!</h1>
                    <p>Have a habit? : {this.state.habitExist.toString()}</p>
                    {/* TESTING FORM  */}
                    <NewHabitForm />
                    <CheckInForm />
                    <br />
                    <br />
                    <br />
                    <br />
                    {/* TESTING FORM  */}
                    {this.state.habitExist && 
                        <div>
                            <button className='habitButton' onClick={this.handleCheckIn}>Check In</button> 
                            <CheckIn checkIn={this.state.checkIn}
                                habitId={this.state.habitData._id}
                                handleCheckIn={this.handleCheckIn}
                                handleCheckInSubmit={this.handleCheckInSubmit} />
                        </div>
                    }
                    
                    {!this.state.habitExist &&
                        <div>
                            <button className='habitButton' onClick={this.handleNewHabit} >Create New Habit</button> 
                            <NewHabit email={this.props.email}
                                handleNewHabitSubmit={this.handleNewHabitSubmit}
                                newEntry={this.state.newEntry} />
                        </div>
                    }

                    <h2>Daily Dashboard</h2>

                    <Progress />
                    <CurrentHabit {...this.state.habitData} />
                
                
                
                </main>


            </div>
        );
    }
}

export default Dashboard;
