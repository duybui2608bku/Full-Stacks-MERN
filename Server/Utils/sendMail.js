const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = asyncHandler(async ({ email, html }) => {
  const info = await transporter.sendMail({
    from: '"Shop Ecommerce" <no-reply@example.com>',
    to: email,
    subject: "Forgot Password",
    html: html,
  });
});

module.exports = sendMail;
