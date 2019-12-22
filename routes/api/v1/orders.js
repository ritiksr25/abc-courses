const express = require("express");
const router = express.Router();

// load controller
const {
    orders,
    createRzpOrder,
    paymentSuccess
} = require("../../../controllers/order_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { userAuth, allAuth } = require("../../../middlewares/auth");

// routes
router.get("/", allAuth, catchErrors(orders));
router.post("/payments/success", catchErrors(paymentSuccess));
router.post("/payments/:id", userAuth, catchErrors(createRzpOrder));

// export router
module.exports = router;
