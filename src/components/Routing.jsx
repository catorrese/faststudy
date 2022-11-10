import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import Login from './Login'
import Dashboard from './Dashboard'

const Routing = ({ userInfo, triggerSessionValidation }) => {
  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={() =>
          userInfo ? <Redirect to="/fastudy" /> : <Login triggerSessionValidation={triggerSessionValidation} userInfo={userInfo} />
        }
      />
      <Route
        exact
        path="/fastudy"
        render={() =>
          userInfo ? (
          
            <Dashboard  userInfo={userInfo} triggerSessionValidation={triggerSessionValidation} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      
    </React.Fragment>
  );
};

export default Routing;
