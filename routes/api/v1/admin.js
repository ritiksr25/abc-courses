const express = require("express");
const router = express.Router();

// load controller
const { users } = require("../../../controllers/admin_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { adminAuth } = require("../../../middlewares/auth");

// routes
router.get("/users", adminAuth, catchErrors(users));

// export router
module.exports = router;
