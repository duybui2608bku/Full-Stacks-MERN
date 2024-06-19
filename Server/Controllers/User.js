const User = require("../Models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../Middlewares/jwt.js");

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
    const { password, role, ...userData } = response.toObject();
    const accessToken = generateAccessToken(response._id, role);
    const refreshToken = generateRefreshToken(response._id);
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    //Lưu refreshToekn vào cokie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 1000,
    });
    return res.status(400).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid Credentials !");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");

  return res.status(200).json({
    success: true,
    dataUser: user ? user : "User Not Found",
  });
});

const refreshAccessToekn = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken) {
    throw Error("No refreshToken in cookie");
  }
  jwt.verify(cookie.refreshToken, process.env.JWT, async (err, decode) => {
    if (err) {
      throw Error("Invalid refreshToken");
    }
    const response = await User.findOne({
      _id: decode._id,
      refreshToken: cookie.refreshToken,
    });
    return res.status(200).json({
      success: response ? true : false,
      newAccessToken: response
        ? generateAccessToken({ _id: response._id, role: response.role })
        : "Refresh token not matched",
    });
  });
});

const logOut = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken) {
    throw Error("No refreshToken in cookies");
  }
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: false,
    message: "Logout is success !",
  });
});

module.exports = {
  Register,
  Login,
  getCurrentUser,
  refreshAccessToekn,
  logOut,
};
