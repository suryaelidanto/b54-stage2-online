import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "bagushendrawan892@gmail.com",
    pass: "wpiz dsgd otlq hgeq", // application password / app password
  },
});
