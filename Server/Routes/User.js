const router = require("express").Router();
const ctrls = require("../Controllers/User");

router.post("/register", ctrls.Register);
module.exports = router;
