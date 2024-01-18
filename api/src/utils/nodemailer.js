const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_KEY,
  },
})

const sendEmail = (email, username) => {
  transporter.sendMail({
    from: '"Concursos Pampling" <proyectopampling@gmail.com>',
    to: `${email}`,
    subject: 'Diseño enviado',
    html: `
    <b>¡Hola, ${username}!</b> 
    <br>
    <p>Tu diseño ha sido subido con éxito, si los administradores consideran que cumple con los requisitos adecuados será publicado en nuestra web.</p>
    <br>
    <b>!Gracias por participar!</b>`,
  })
}

exports.sendEmail = sendEmail
