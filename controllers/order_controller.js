//send mail
const { sendMail } = require("../config/emailService");
//rzp order creater
const { createOrder } = require("../config/paymentGateway");

module.exports.orders = async (req, res) => {
    let { perPage, pageNo, sortBy, sortType, id } = req.query;
    let filter = {},
        orders;
    if (!req.user.isAdmin) {
        filter.user = req.user.id;
    }
    if (id) {
        orders = await Order.findById(id);
        return res
            .status(200)
            .json({ message: "success", error: false, data: orders });
    } else {
        perPage = perPage || 10;
        pageNo = pageNo || 1;
        sortBy = sortBy || "createdAt";
        sortType = sortType || "desc";
        orders = await Order.find(filter)
            .sort({ "[sortBy]": sortType })
            .limit(perPage * pageNo)
            .skip(perPage * pageNo - perPage)
            .populate("user")
            .populate("course");
        let totalOrdersSearched = await Order.countDocuments(filter);
        let totalPagesRequired = Math.floor(
            Number(totalOrdersSearched / perPage) + 1
        );
        let data = {
            orders,
            totalPagesRequired,
            totalOrdersSearched
        };
        res.status(200).json({ message: "success", error: false, data });
    }
};

module.exports.order = async (req, res) => {
    let { id } = req.params;
    let course = await Course.findById(id);
    if (course) {
        let order = await Order.findOne({
            $and: [{ user: req.user.id }, { course: id }]
        });
        if (order) {
            res.status(400).json({
                message: "Already Purchased",
                error: true,
                data: null
            });
        } else {
            let newOrder = {
                user: req.user.id,
                course: course._id
            };
            let order = await Order.create(newOrder);
            res.status(200).json({
                message: "success",
                error: false,
                data: order
            });
        }
    } else {
        res.status(400).json({
            message: "Invalid Course",
            error: true,
            data: null
        });
    }
};

module.exports.createRzpOrder = async (req, res) => {
    let orders = await Order.findById(req.params.id).populate("course");
    let order = await createOrder(orders.course.price, req.params.id);
    res.status(200).json({
        message: "success",
        order,
        key: process.env.RZP_KEY_ID
    });
};

module.exports.paymentSuccess = async (req, res) => {
    let {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature
    } = req.body;

    if (razorpay_payment_id) {
        let order = await Order.findById(razorpay_order_id);
        order.status = "paid";
        order.transacId = razorpay_payment_id;
        let curDate = new Date(Date.now());
        order.invoiceId = `INV${curDate.getFullYear() -
            2000}${curDate.getMonth() +
            1}${curDate.getDate()}${curDate.getHours()}${curDate.getMinutes()}${Math.floor(
            Math.random() * 99
        ) + 10}`;
        let course = await Course.findById(order.course);
        course.sales += 1;
        await order.save();
        order = await Order.findById(razorpay_order_id)
            .populate("user")
            .populate("course");
        let promises = [sendMail(order, "order-confirm"), course.save()];
        await Promise.all(promises);
        res.status(200).json({ message: "success", error: false, data: order });
    } else {
        res.status(500).json({
            message: "Payment failed!!",
            error: true,
            data: null
        });
    }
};
