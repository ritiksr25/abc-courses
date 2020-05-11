import React, { Component } from "react";
import { Redirect } from 'react-router'
import banner from "./banner.jpg";
import axios from "axios";
import * as ROUTES from "../../utils/routes";


class Course extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			token: ""
		};
	}

	async componentDidMount() {
		let token = localStorage.getItem("token");
		const { data } = await axios.get(
			`${ROUTES.courses}/${this.props.match.params.id}`,
			{
				headers: {
					"x-auth-token": token
				}
			}
		);
		this.setState({ data: data, token: token });
	}

	handlePayment = async (e, item) => {
		e.preventDefault();

		let token = this.state.token;
		try {
			const { data } = await axios.post(
				`${ROUTES.order}/${item._id}`,
				{},
				{
					headers: {
						"x-auth-token": token
					}
				}
			);
			const res = await axios.post(
				`${ROUTES.payorder}/${data.data._id}`,
				{},
				{
					headers: {
						"x-auth-token": token
					}
				}
			);
			const options = {
				key: res.data.key,
				name: "Payments",
				amount: res.data.order.amount,
				order_id: res.data.order.id,
				notes: res.data.order.notes,

				handler: async response => {
					try {
						const resp = await axios.post(
							ROUTES.paysuccess,
							{
								razorpay_payment_id: response.razorpay_payment_id,
								razorpay_order_id: response.razorpay_order_id,
								razorpay_signature: response.razorpay_signature
							},
							{
								headers: {
									"x-auth-token": token
								}
							}
						);

						if (resp.data.message === "success") {
							alert(
								"Payment successfully completed. Redirecting to order page"
							);
							return <Redirect to={"/orders" + resp.data.data._id} />;
						}
					} catch (err) {
						if (err.response === undefined) {
							console.log(err.message);
						} else {
							console.log(err.response);
						}
					}
				},
				theme: {
					color: "#9D50BB"
                }
			};
			const rzp1 = new window.Razorpay(options);
			rzp1.open();
		} catch (error) {
			if (error.response !== undefined) {
			} else {
			}
		}
	};
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
                                            data.courses.image ? data.image.url : banner
                                        }
                                        height="200px"
                                        width="200px"
                                        alt="img"
                                    />
                                    <h4 className="card-title mt-2">
                                        {data.courses.title}
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
                                            {data.courses.description}
                                        </strong>
                                    </p>
                                    <span className="platform">
                                        {data.courses.category}
                                    </span>
                                    <p className="card-block">
                                        <i className="fas fa-cart-plus "></i>{" "}
                                        {data.courses.sales} &nbsp; &nbsp;&nbsp; &nbsp;
                                        <i className="fas fa-plus-circle "></i>{" "}
                                        {data.courses.createdAt.slice(0,10)} <br />{" "}
                                    </p>
                                    <p
                                        className="card-block"
                                        style={{
                                            fontSize: "25px",
                                            textAlign: "right"
                                        }}
                                    >
                                        <i className="fas fa-rupee-sign"></i>{" "}
                                        {data.courses.price}
                                    </p>
                                </div>
                                
                                {this.state.token ? (
									<div className="card">
                                    	{data.isBuyable == true ?
                                    		<button
												className="btn btn-outline-dark sec_btn custom_btn ml-0 mb-2"
                                        		onClick={e => this.handlePayment(e, data.courses)}
											>
												Buy Now
											</button>
                                    	: 
											<button
                                    			className="btn btn-outline-dark sec_btn custom_btn ml-0 mb-2"
                                			>
                                    			Already Purchased
                                			</button>}
                                	</div>
								) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Course;