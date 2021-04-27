import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";

const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation/> }
            <Switch>
            {isLoggedIn ?( 
            <>
            <Router exact path="/"> 
                <Home userObj={userObj}/>
            </Router> 
            <Router exact path="/"> 
                <Profile/>
            </Router>
            </>             
            ) : (
            <Router exact path="/">
                <Auth/>
            </Router>
            )
            }

            </Switch>
        </Router>
    )
}

export default AppRouter;