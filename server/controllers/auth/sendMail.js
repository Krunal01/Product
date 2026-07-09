const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (email, otp) => {
  const response = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: `Reset Password OTP : ${otp}`,
    html: `<h1>${otp}</h1>`,
  });
  return response;
};

module.exports = sendMail;
