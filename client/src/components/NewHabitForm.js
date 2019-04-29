import React from "react";

const NewHabitForm = props => (
    <form>
        <label className="header">
            <h2>New Habit</h2>
        </label>
        <label>
            Habit:
        </label>
        <input type='text' name='habit' placeholder="Please enter new habit to be tracked"  />
        <label>
            Smart Goals: (OPTIONAL)
        </label>
        <input type='text' name='smart' placeholder="Please separate goals with commas" />
        <label>
            Length of Time to Track:
        </label>
        <input type='text' name='length' placeholder="Please enter time in months"  />
        <label>
            Daily Checkin Intervals:
        </label>
        <select name='intervals'>
            <option value="select">Select One Option Please</option>
            <option value="daily">Daily</option>
            <option value="twoDays">Every Two Days</option>
            <option value="weekly">Weekly</option>
            <option value="biWeekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
        </select>
        
        <div className="buttons">
            <button className="button" >Exit</button>
            <input className="button" type="submit" value="Start Tracking"  />
        </div>
    </form>
);

export default NewHabitForm;