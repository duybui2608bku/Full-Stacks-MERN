const router = require("express").Router();
const ctrls = require("../Controllers/User");

router.post("/register", ctrls.Register);
router.post("/login", ctrls.Login);
module.exports = router;
