import { Outlet, Link, BrowserRouter, Route, withRouter, Switch, useHistory } from "react-router-dom";
import React, { Component, useEffect, useState } from 'react'
import './Dashboard.css';
import SearchBar from '../Shared/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Configuration from "./Configuration";
import Settings from "./Settings";
import { render } from "@testing-library/react";
const axios = require('axios');

export const Dashboard2 = () => {
    const [allEvents, setEvents] = useState([]);
    const history = useHistory();

    const fetchEvents = async () => {
        axios
            .get("http://localhost:3002/api/v1/conditions")
            .then(function (response) {
                setEvents(response.data)
            });
    }

    useEffect(() => {
        fetchEvents();
    })

    const editEvent = (index) => {
        history.push({
            pathname: '/EditConfiguration',
            state: allEvents[index] //data array of objects
        })

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
                    <XAxis dataKey="name" stroke="white" label={{value: 'Events', fill: '#3b82f6', offset: -5, position: 'insideBottom', fontSize: '18px'}}/>
                    <YAxis dataKey="attendees" stroke="white" label={{ value: 'Number of Attendees', angle: -90, fill: '#3b82f6', fontSize: '16px'}}></YAxis>
                    <Tooltip  cursor={{ stroke: '#64748b', strokeWidth: 2, fill:'#64748b'}} />
                    <Legend verticalAlign="top" height={36} align="right" margin={{top: 0, left: 0, right: 0, bottom: 0 }}/>
                    <Bar dataKey="attendees" fill="#3b82f6" width={10}/>
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                    </BarChart>
                </div>
    
                <div className="EventsBox">
                    <p className="EventsHeader">Events</p>
                    {allEvents.map(function(object, i){
                        return <div className="eachEventCard">
                            <button className="editEventBtn" onClick={() => editEvent(i)}><FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon></button>
                           <p className="dashboardEventName">Event: {object.name}</p>
                           <p className="dashboardEventName">Verification Code: {object.identifier}</p>
                           <p className="dashboardEventName">Event Date: {object.startDate} - {object.endDate}</p>
                           </div>;

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