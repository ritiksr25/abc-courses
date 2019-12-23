import React, { Component } from "react";
import banner from "./banner.jpg";
import axios from "axios";
import * as ROUTES from "../../utils/routes";


class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: "",
          token: ""
        };
      }

    async componentDidMount() {
        let token = localStorage.getItem("token");
        const { data } = await axios.get(`${ROUTES.order}?id=${this.props.match.params.id}`, {
            headers: {
                "x-auth-token": token
            }
        });
        this.setState({ data: data, token: token });
    }
render(){
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
                                            data.course.image ? data.course.image.url : banner
                                        }
                                        height="200px"
                                        width="200px"
                                        alt="img"
                                    />
                                    <h4 className="card-title mt-2">
                                        {data.course.title}
                                    </h4>
                                    <p className="card-block">
                                        <strong
                                            className="description"
                                            style={{
                                                fontSize: "22px",
                                                marginTop: "5px"
                                            }}
                                        >
                                            {data.course.description}
                                        </strong>
                                    </p>
                                    <span className="platform">
                                        {data.course.category}
                                    </span>
                                </div>
                                <div className="card">
                                <p className="card-block">
                        <strong className=" description">Purchased On: </strong>${data.createdAt.slice(0,10)};
                      </p>
                      <p class="card-block">
                        <strong class=" description">Payment Status: </strong>{data.status};
                      </p>
                      <p class="card-block">
                        <strong class=" description">Transaction ID: </strong>{data.transacId};
                      </p>
                      <p class="card-block">
                        <strong class=" description">Invoice ID: </strong>{data.invoiceId};
                      </p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        )}}

        export default Order;