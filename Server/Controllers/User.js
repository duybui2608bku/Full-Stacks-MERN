const User = require("../Models/User");
const asyncHandler = require("express-async-handler");
const Register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      success: false,
      message: "Missing Input",
    });
  }

  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    throw new Error("Email has been registered !");
  } else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser ? "Register Successfully !" : "Something wrong !",
    });
  }
});

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing Input",
    });
  }

  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, Role, ...userData } = response.toObject();
    return res.status(400).json({
      success: true,
      userData,
    });
  } else {
    throw new Error("Invalid Credentials !");
  }
});

module.exports = { Register, Login };
