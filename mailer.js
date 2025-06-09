const { config } = require('./config/config');
const mail = config.mail;
const mailPass = config.mailPass;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: mail, // generated ethereal user
        pass: mailPass // generated ethereal password
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: mail, // sender address
    to: "estadistica2@alexandrafarms.com", // list of receivers
    subject: "Try Mail", // Subject line
    text: "Mensajes o correos automaticos desde front React + Node Back + añadir archivos", // plain text body
    html: "<b>Mensajes o correos automaticos desde front React + Node Back + añadir archivos Exitoso</b>", // html body
    attachments: [
      {   // file on disk as an attachment
          filename: 'prueba.html',
          path: './prueba.html' // stream this file
      }
    ]
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main();
