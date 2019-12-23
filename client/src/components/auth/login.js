import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../../utils/routes";

let message;

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
             message = err.message;
        }
        else {
            console.log(err.response);
            message = err.response;
      }
    }
};

    render() {
        return (
        <div className="container pt-4 pb-4">
            <div className="col-lg-6 col-sm-6 col-12 mx-auto">
                <div className="card">
                <h2 className="text-center">LogIn</h2>
                <form className="text-center" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <label>Email address</label>
                        <input
                            className="form-control"
                            placeholder="abc@xyz.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••••••••"
                        />
                    </div>
                    <div className="form-group">
                        <label>{message}</label>
                    </div>
                    <button
                        className="btn btn-primary"
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
