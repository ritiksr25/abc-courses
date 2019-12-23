import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div><hr />
            <footer>
                <div className="contactus">
                    <div className="container pt-4 pb-4 ">
                        <div className="row text-center">
                            <div className="col-lg-2 mb-4">
                                <h5 className="title " style={{color: "#444444"}}>
                                    ABC COURSES
                                </h5>
                                <li>
                                    <h6>
                                        <Link to="/">Home</Link>
                                    </h6>
                                </li>
                                <li>
                                    <h6>
                                        <Link to="/about">About</Link>
                                    </h6>
                                </li>
                            </div>

                            <div className="col-lg-4 mb-4 ">
                                <h5 className="title " style={{color: "#444444"}}>
                                    Information
                                </h5>
                                <li>
                                    <h6>
                                        <Link to="/courses">Courses</Link>
                                    </h6>
                                </li>
                                <li>
                                    <h6>
                                        <Link to="#">Terms and conditions</Link>
                                    </h6>
                                </li>
                                <li>
                                    <h6>
                                        <Link to="#">Privacy Policy</Link>
                                    </h6>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="text-center "
                    style={{
                        color: "#fff",
                        fontSize: "14px",
                        padding: "8px",
                        background: "#250505"
                    }}
                >
                    <p
                        style={{
                            margin: "0",
                            padding: "0"
                        }}
                    >
                        &copy; 2019 ABC Courses
                    </p>
                </div>
            </footer>
            </div>
    );
};

export default Footer;
