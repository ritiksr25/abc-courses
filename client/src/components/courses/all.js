import React, { Component } from "react";
import { Link } from "react-router-dom";
import banner from "./banner.jpg"
import axios from "axios";
import * as ROUTES from "../../utils/routes";

class AllCourses extends Component {
    state = {
        data: ""
    };

    async componentDidMount() {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(ROUTES.courses, {
            headers: {
                "x-auth-token": token
            }
        });
        this.setState({ data: data });
    }
    render() {
        const data = this.state.data.data;
        return (
            <div>
                <div className="container pt-4 pb-4">
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2 text-center">
                            <h2>All Courses</h2>
                            {/* <Link className="btn btn-outline-dark sec_btn ml-0 mb-2" to="/courses">All Courses</Link> */}
                        </div>
                    </div>
                </div>
                <div
                    className="container pt-4 pb-4"
                    style={{
                        backgroundColor: "#f5f4f4"
                    }}
                >
                    <div className="row">
                        {data
                            ? data.courses.map((item, i) => (
                                  <div className="col-lg-4 mt-4" key={i}>
                                      <Link
                                          className="card"
                                          to={ "/courses/" + item._id }
                                      >
                                          <img
                                              className="card-img-top"
                                              src={item.image ? item.image.url : banner}
                                              height="200px"
                                              width="200px"
                                              alt="img"
                                          />
                                          <h4 className="card-title mt-2">
                                              {item.title}
                                          </h4>
                                          <span className="platform">
                                              {item.category}
                                          </span>
                                          <p
                                              className="card-block"
                                              style={{
                                                  fontSize: "25px",
                                                  textAlign: "right"
                                              }}
                                          >
                                              <i className="fas fa-rupee-sign"></i>{" "}
                                              {item.price}
                                          </p>
                                      </Link>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default AllCourses;
