import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/general/index";
import About from "./components/general/about";
import Courses from "./components/courses/all";
import Course from "./components/courses/view";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import Orders from "./components/order/orders";
import Order from "./components/order/single";

import "./App.css";

class App extends Component {
  state = {
    loggedIn: false
  };
  UNSAFE_componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ loggedIn: true });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar user={this.state.loggedIn} />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/courses/:id" component={Course} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/orders/:id" component={Order} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <Route exact path="/logout" component={Logout} />
          <Redirect exact from="/" to="/" />
          <Redirect to="/" />
        </Switch>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
