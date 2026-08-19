import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface IData {
  to: string;
  subject: string;
  text: string;
}

const mail = async (Data: IData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Email_Password,
    },
  });

  const mailOptions = {
    from: "DigitalDokan<dptest23@getMaxListeners.com>",
    to: Data.to,
    subject: Data.subject,
    text: Data.text,
  };

  await transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
    if (error) {
      console.error(error);
    } else {
      console.log(info);
    }
  });
};

export default mail;
