import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../../utils/routes";

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: ""
      };
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  
    handleSubmit = async e => {
      e.preventDefault();
      const { email, password } = this.state;
      
      let payload = {
        email,
        password
      };
      try {
        const response = await axios.post(ROUTES.login, payload);
        if (response.status === 200) {
          localStorage.setItem("token", response.headers["x-auth-token"]);
          window.location = "/";
        }
      } catch (err) {
        if (err.response === undefined){
             console.log(err.message);
            //  message = err.message;
        }
        else {
            console.log(err.response);
            // message = err.response;
      }
    }
};

    render() {
        return (
        <div className="container pt-4 pb-4">
            <div className="col-md-8 mx-auto">
                <div className="card">
                <h2 className="text-center">LogIn</h2>
                <form className="text-center" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••••••••"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>{message}</label>
                    </div> */}
                    <button
                        className="btn btn-primary "
                        type="submit"
                    > Login </button>
                        </form>
                    <div className="form-group mt-2">
        <Link to="/register" onClick={() => window.scrollTo(0, 0)}>
          Not yet Registered? Signup
        </Link>
        </div>
      </div>
      </div>
      </div>
          );
};
}

export default Login;
