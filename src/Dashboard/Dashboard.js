import { Outlet, Link, BrowserRouter, Route, withRouter, Switch, useHistory } from "react-router-dom";
import React, { Component, useEffect, useState } from 'react'
import './Dashboard.css';
import SearchBar from '../Shared/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Configuration from "./Configuration";
import Settings from "./Settings";
import { render } from "@testing-library/react";

export const Dashboard2 = () => {
    const [allEvents, setEvents] = useState([
        {eventName: 'Hariths Birthday', VerificationCode: '123456', numberOfAttendees: 23},
        {eventName: 'Ruixuan Birthday', VerificationCode: '313112', numberOfAttendees: 12},
        {eventName: 'Seans Birthday', VerificationCode: '993122', numberOfAttendees: 17},
        {eventName: 'Brians Birthday', VerificationCode: '677222', numberOfAttendees: 39},
        {eventName: 'My Birthday', VerificationCode: '091272', numberOfAttendees: 67},
        
    ]);
    const history = useHistory();

    useEffect(() => {
        
    })
    const editEvent = () => {
        history.push('/EditConfiguration')
    // this.props.history.push({
            //     pathname: '/editConfiguration',
            //       state: this.state.allEvents // your data array of objects
            //   })
        //     this.props.history.push({
        //         pathname: '/editConfiguration',
        //           state: this.state.allEvents[0] // your data array of objects
        //       })
        //    this.props.history.go()

    }
        return(
            <>
            <div className="DashboardDiv">
    
            {/* <BrowserRouter>
               <Switch>
                <Route exact path={"/Dashboard"}></Route>
                <Route exact path={"/Configuration"} component={Configuration}></Route>
                <Route exact path={"/Settings"} component={Settings}></Route>
               </Switch>
            </BrowserRouter> */}
            <main className="items-center">
                <p className="mainHeader">Dashboard</p>
    
                <span>
                <div className="ActivitiesBox">
                    <p className="ActivitiesHeader">Attendees</p>
                    <BarChart width={650} height={300} data={allEvents} barSize={70}>
                    <XAxis dataKey="eventName" stroke="white" label={{value: 'Events', fill: '#3b82f6', offset: -5, position: 'insideBottom', fontSize: '18px'}}/>
                    <YAxis dataKey="numberOfAttendees" stroke="white" label={{ value: 'Number of Attendees', angle: -90, fill: '#3b82f6', fontSize: '16px'}}></YAxis>
                    <Tooltip  cursor={{ stroke: '#64748b', strokeWidth: 2, fill:'#64748b'}} />
                    <Legend verticalAlign="top" height={36} align="right" margin={{top: 0, left: 0, right: 0, bottom: 0 }}/>
                    <Bar dataKey="numberOfAttendees" fill="#3b82f6" width={10}/>
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                    </BarChart>
                </div>
    
                <div className="EventsBox">
                    <p className="EventsHeader">Events</p>
                    {allEvents.map(function(object, i){
                       return <div className="eachEventCard" onClick={editEvent}> <button className="editEventBtn"><FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon></button>
                       <p className="dashboardEventName">Event: {object.eventName}</p>
                        <p className="dashboardEventName">Verification Code: {object.VerificationCode}</p></div>;
                    })}
                </div>
                </span>
            </main>
            </div>
            <BrowserRouter>
            <Switch>
                    <Route exact path={"/Dashboard"}></Route>
                    <Route exact path={"/Configuration"} component={Configuration}></Route>
                    <Route exact path={"/Settings"} component={Settings}></Route>
       </Switch>
    </BrowserRouter>
    </>
)
   
}

export default withRouter(Dashboard2);