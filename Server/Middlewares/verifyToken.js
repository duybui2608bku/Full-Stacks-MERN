const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const BEARER_TOKEN_PREFIX = "Bearer";

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith(BEARER_TOKEN_PREFIX)) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid AccessToken",
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "AccessToken required",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const role = req.user;
  if (role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Require role Admin !",
    });
  }
  next();
});

module.exports = { verifyAccessToken, isAdmin };
