import nodemailer from "nodemailer"


const sendEmail = async (option) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "88554b773b0dec",
      pass: "eecd8ae41fab47"
    }
  });
  const emailMessage = {
    from: option.from,
    to: option.email,
    subject: option.subject,
    text: option.message,
    // html: option.html,
  }
  await transport.sendMail(emailMessage);

}


export {
  sendEmail
}