const router = require("express").Router();
const userController = require("../controller/users.controller");

router.post("/", userController.register);
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateUserData);
router.delete("/:id", userController.deleteUser);

module.exports = router;
