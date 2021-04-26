import React, {useState} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";

const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation/> }
            <Switch>
            {isLoggedIn ? 
            <Router exact path="/"> 
                <Home></Home>
            </Router> : 

            <Router exact path="/">
                <Auth/>
            </Router>
            
            }

            </Switch>
        </Router>
    )
}

export default AppRouter;