import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../../utils/routes";

class Orders extends Component {
    state = {
        data: ""
    };

    async componentDidMount() {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${ROUTES.order}`, {
            headers: {
                "x-auth-token": token
            }
        });
        this.setState({ data: data });
    }
    render() {
        const data = this.state.data.data;
        return (
                <div className="container pt-4 pb-4">
			<div className="row">
				<div className="col-sm-8 offset-sm-2 text-center">
					<h2>Order History</h2>
				</div>
            </div>
            <div className="container pt-4 pb-4">
            <div className="row">
			<div className="col-md-8 mx-auto" >
                <div className="card">
                    <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Course</th>
                            <th scope="col">Payment Status</th>
                            <th scope="col">Purchased On</th>
                            <th scope="col">?</th>
                          </tr>
                        </thead>
                        <tbody>
                        {data
                            ? data.orders.map((item, i) => (
                          <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{item.course.title}</td>
                            <td>{item.status}</td>
                            <td>{item.createdAt.slice(0,10)}</td>
                            <td><Link to={`/orders/${item._id}`}>View</Link></td>
                          </tr>
                         ))
                         : null}
    
                        </tbody>
                      </table>
                </div>
            </div>
            </div>
            </div>
            </div>
        );
    }
}

export default Orders;