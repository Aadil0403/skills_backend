const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "cet.sac.zairza@gmail.com",
    pass: "idnmluqsglvkxdie",
  },
});

async function sendMail(to, subject, text, html) {
  const info = await transporter.sendMail({
    from: 'cet.sac.zairza@gmail.com', // sender address
    to,
    subject,
    text,
    html
  });
}

module.exports = {sendMail}