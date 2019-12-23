import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import Home from "./components/home/home";
// import Courses from "./components/courses/courses";
// import Navbar from "./components/navbar/navbar";
// import Logout from "./components/logout/logout";
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
        {/* <Navbar user={this.state.loggedIn} /> */}
        <Switch>
          {/* <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/about" component={About} />
          <Route exact path="/logout" component={Logout} /> */}
          <Redirect exact from="/" to="/" />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
