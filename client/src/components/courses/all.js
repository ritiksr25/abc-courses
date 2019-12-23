import React from "react";
import { Link } from "react-router-dom";
import banner from "./banner.jpg"

const AllCourses = () => {
    return (
    <div>
    <div className="container pt-4 pb-4">
			<div className="row">
				<div className="col-sm-8 offset-sm-2 text-center">
					<h2>Most Popular Courses</h2><Link className="btn btn-outline-dark sec_btn ml-0 mb-2" to="/courses">All Courses</Link>
				</div>
            </div>
    </div>
    <div className="container pt-4 pb-4" style={{
        backgroundColor: "#f5f4f4"
        }}>
            <div className="row">
			<div className="col-lg-3 col-sm-6 col-12">
                <Link className="card" to= "/">
                    <img className="card-img-top" src={banner} height="200px" width="200px" />
                    <h4 className="card-title mt-2">Course 1 gffchjgchjsgchsdcvhjshj</h4>
                    <span className="platform">WEB DEVELOPMENTS</span>
                    <p className="card-block" style={{
                        fontSize: "25px", textAlign: "right"}}>
                        <i className="fas fa-rupee-sign"></i> 500
                    </p>
                </Link>
            </div>
            </div>
    </div>
    </div>
    );
};

export default AllCourses;
