import React, { Component } from "react";
import { Link } from "react-router-dom";
import banner from "./banner.jpg";
import axios from "axios";
import * as ROUTES from "../../utils/routes";

class Course extends Component {
    state = {
        data: ""
    };

    async componentDidMount() {
        const token = localStorage.getItem("token");
        const { data } = await axios.post(`${ROUTES.payorder}/${this.props.match.params.id}`, {
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
                <div
                    className="container pt-4 pb-4"
                    style={{
                        backgroundColor: "#f5f4f4"
                    }}
                >
                    <div className="row">
                        {data ? (
                            <div className="col-sm-8 offset-sm-2 text-center">
                                <div className="card">
                                    <img
                                        className="card-img-top"
                                        src={
                                            data.image ? data.image.url : banner
                                        }
                                        height="200px"
                                        width="200px"
                                    />
                                    <h4 className="card-title mt-2">
                                        {data.title}
                                    </h4>
                                    <p className="card-block">
                                        <strong
                                            className="description"
                                            style={{
                                                fontSize: "22px",
                                                marginTop: "5px"
                                            }}
                                        >
                                            {" "}
                                            {data.description}
                                        </strong>
                                    </p>
                                    <span className="platform">
                                        {data.category}
                                    </span>
                                    <p className="card-block">
                                        <i className="fas fa-cart-plus "></i>{" "}
                                        {data.sales} &nbsp; &nbsp;&nbsp; &nbsp;
                                        <i className="fas fa-plus-circle "></i>{" "}
                                        {data.createdAt.slice(0,10)} <br />{" "}
                                    </p>
                                    <p
                                        className="card-block"
                                        style={{
                                            fontSize: "25px",
                                            textAlign: "right"
                                        }}
                                    >
                                        <i className="fas fa-rupee-sign"></i>{" "}
                                        {data.price}
                                    </p>
                                </div>
                                <div className="card">
                                    <Link
                                        to={`/order/${data._id}`}
                                        className="btn btn-outline-dark sec_btn custom_btn ml-0 mb-2"
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Course;