const router = require("express").Router();
const ctrls = require("../Controllers/User");
const { verifyAccessToken, isAdmin } = require("../Middlewares/verifyToken");
//GET
router.post("/register", ctrls.Register);
router.post("/login", ctrls.Login);
router.post("/refreshtoken", ctrls.refreshAccessToekn);
//GET

//POST
router.get("/logout", ctrls.logOut);
router.get("/current", verifyAccessToken, ctrls.getCurrentUser);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers);
router.get("/forgotpassword", ctrls.forgotPassword);
//POST

//DELETE
router.delete("/", [verifyAccessToken, isAdmin], ctrls.deleteUsers);
//DELETE

//PUT
router.put("/resetpassword", ctrls.resetPassword);
router.put("/current", verifyAccessToken, ctrls.updateUser);
router.put("/:uid", [verifyAccessToken], ctrls.updateUserByAdmin);
//PUT

module.exports = router;
