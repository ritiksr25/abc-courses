import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../../utils/routes";

let message;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
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
        const { name, email, password } = this.state;

        let payload = {
            name,
            email,
            password
        };
        try {
            const response = await axios.post(ROUTES.register, payload);
            if (response.status === 200) {
                window.location = "/login";
            }
        } catch (err) {
            if (err.response === undefined) {
                console.log(err.message);
                message = err.message;
            } else {
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
                        <h2 className="text-center">Register</h2>
                        <form
                            className="text-center"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter Your Email"
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
                            <div className="form-group">
                                <label>{message}</label>
                            </div>
                            <button className="btn btn-primary " type="submit">
                                {" "}
                                Signup{" "}
                            </button>
                        </form>
                        <div className="form-group mt-2">
                            <Link
                                to="/login"
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                Already Registered? Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
