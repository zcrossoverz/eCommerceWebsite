import nodeMailer from "nodemailer";

require("dotenv/config");

const sendMail = (to: string, subject: string, htmlContent: string) => {
  const transport = nodeMailer.createTransport({
    service: "Gmail",
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const options = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transport.sendMail(options);
};
export default sendMail;
