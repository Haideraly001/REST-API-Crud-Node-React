import nodemailer from "nodemailer"


const emailSender = async (option) => {
  try {
    // mailTrap
    // const transporter = nodemailer.createTransport({
    //   host: process.env.local.SMTP_MailTrap_HOST,
    //   port: process.env.local.SMTP_MailTrap_PORT,
    //   secure: false,
    //   auth: {
    //     user: process.env.local.SMTP_MailTrap_USER,
    //     pass: process.env.local.SMTP_MailTrap_PASS,
    //   },
    // });


    // brevo 
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_BREVO_HOST,
      port: process.env.SMTP_BREVO_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_BREVO_USER,
        pass: process.env.SMTP_BREVO_PASS,
      },
    });


    await transporter.sendMail({
      from: "haideralymughal@gmail.com",
      to: option.sendEmail,
      subject: "Password reset Notification ",
      text: option.text,
      // html: "<b>follow the text</b>",
    });

    console.log("success email send");
  } catch (err) {
    console.log("err-->", err.message);

  }

}

export {
  emailSender
}