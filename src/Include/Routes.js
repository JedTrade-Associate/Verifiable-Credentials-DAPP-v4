import React,{Component} from 'react';
import { Switch, Route, HashRouter, Redirect, BrowserRouter } from 'react-router-dom';
import Sidebar from '../Include/SideBar/Sidebar.js'
import SignUpPage from '../SignUp/SignPage';
import Configuration from '../Dashboard/Configuration';
import Dashboard from '../Dashboard/Dashboard';
import Settings from '../Dashboard/Settings';
import EditConfiguration from '../Dashboard/EditConfiguration.js';
import Router from 'react-router';


  class Routes extends Component {
    constructor(props) {
      super(props);       
      this.state = { 
          
      };      
  }
  async componentDidMount() { 
   console.log('Routes.js Component did mount')
  }

  render (){

  return (
    <BrowserRouter>
      <Switch>
      <Route
          exact={true}
          path='/'
          render={(e, props) =>
            <Redirect to="/SignUpPage" />
          }
        />
      <Route
          exact={true}
          path='/SignUpPage'
          render={(e, props) =>
            <SignUpPage {...e} data={props} />
          }
        />
         <Route
          exact={true}
          path='/Configuration'
          render={(e, props) => (
            <Sidebar>
            <Configuration {...e} data={props} />    
            </Sidebar>
          )}
        />
        <Route
          exact={true}
          path='/EditConfiguration'
          render={(e, props) => (
            <Sidebar>
            <EditConfiguration {...e} data={props} />    
            </Sidebar>
          )}
        />
         <Route
          exact={true}
          path='/Dashboard'
          render={(e, props) => (
           <Sidebar>
            <Dashboard {...e} data={props} />    
            </Sidebar>
          )}
        />
         <Route
          exact={true}
          path='/Settings'
          render={(e, props) => (
            <Settings {...e} data={props} />    
          )}
        />

      </Switch>
    </BrowserRouter>
  );
   }
}

export default Routes;
