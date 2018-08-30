import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Hero from './Hero/Hero'
import Login from './Login/Login'
import Logout from './Logout/Logout'
import Admin from './Admin/Admin'
//STYLES ANDS CSS
import './app.css'



class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Hero} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
