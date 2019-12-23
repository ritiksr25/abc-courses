import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <React.Fragment>
        <div className="container">
        <div className="col-lg-12 pt-4">
            <div className="card"
                style={{
                    backgroundImage: "url(https://images.pexels.com/photos/436775/pexels-photo-436775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)"}}>
                <h1 className="title main__title mt-2">
                    ABC <span className="highlight">COURSES</span>
                </h1>
                <h3 className="description">Welcome to ABC COURSES!! Your one stop solution for all courses. </h3>
                <div className="col-sm-12 m-4 text-center">
                <span className="col-sm-3 btn btn-primary"> Variety of Courses </span> .
            <span className="col-sm-3 btn btn-primary"> Multiple Domains </span> .
            <span className="col-sm-3 btn btn-primary"> One-time Purchase</span>
            </div>
        </div>
    </div>
    </div>
    </React.Fragment>
    );
};

export default Header;
