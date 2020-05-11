const express = require("express");
const router = express.Router();

// load controller
const {
    courses,
    course,
    addCourse,
    updateCourse,
    deleteCourse
} = require("../../../controllers/course_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { adminAuth, allAuth } = require("../../../middlewares/auth");
let { courseValidation } = require("../../../middlewares/validations");
let { upload } = require("../../../config/imgUpload");

// routes
router.get("/", catchErrors(courses));
router.post(
    "/",
    adminAuth,
    courseValidation,
    upload.single("file"),
    catchErrors(addCourse)
);
router.put(
    "/:id",
    adminAuth,
    courseValidation,
    upload.single("file"),
    catchErrors(updateCourse)
);
router.delete("/:id", adminAuth, catchErrors(deleteCourse));
router.get("/:id", catchErrors(course));

// export router
module.exports = router;
