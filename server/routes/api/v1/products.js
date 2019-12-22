const express = require("express");
const router = express.Router();

// load controller
const {
    products,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../../../controllers/products_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { adminAuth } = require("../../../middlewares/auth");
let { productValidation } = require("../../../middlewares/validations");
let { upload } = require("../../../config/imgUpload");

// routes
router.get("/", catchErrors(products));
router.post(
    "/",
    adminAuth,
    productValidation,
    upload.single("file"),
    catchErrors(addProduct)
);
router.put(
    "/:id",
    adminAuth,
    productValidation,
    upload.single("file"),
    catchErrors(updateProduct)
);
router.delete("/:id", adminAuth, catchErrors(deleteProduct));

// export router
module.exports = router;
