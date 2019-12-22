const express = require("express");
const router = express.Router();

// load controller
const { users, orders } = require("../../../controllers/admin_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { adminAuth } = require("../../../middlewares/auth");

// routes
router.get("/users", adminAuth, catchErrors(users));
router.get("/orders", adminAuth, catchErrors(orders));

// export router
module.exports = router;
