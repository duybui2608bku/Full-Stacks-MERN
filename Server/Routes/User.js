const router = require("express").Router();
const ctrls = require("../Controllers/User");
const { verifyAccessToken } = require("../Middlewares/verifyToken");
router.post("/register", ctrls.Register);
router.post("/login", ctrls.Login);
router.get("/logout", ctrls.logOut);
router.get("/current", verifyAccessToken, ctrls.getCurrentUser);
router.post("/refreshtoken", ctrls.refreshAccessToekn);
router.get("/forgotpassword", ctrls.forgotPassword);
router.post("/resetpassword", ctrls.resetPassword);
module.exports = router;
