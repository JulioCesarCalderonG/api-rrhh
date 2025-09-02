const { Welcome } = require("../models");
const transport = require("../mail/mailer");
const enviarReporte = async (nombre = "", email='') => {
  //const welcome = await Welcome.find();

  try {
    const envioEmail = await transport.sendMail({
      from: '"Gongal Soft 👻" <gongalso@gongalsoft.com>', // sender address
      to: email, // list of receivers
      subject: `Remitimos solicitud de reporte`, // Subject line
      //text: "Hello world?", // plain text body
      html: `<h4>Para ver su reporte solicitado, ingrese al siguiente enlace</h4>
      <a href="https://backendrecordpj.gongalsoft.com/api/solicitud/imagen/${nombre}">Mostrar Reporte</a>
          `, // html body
    });
    if (!envioEmail) {
      return {
        ok: false,
        resp: "Mensaje no enviado",
        envioEmail,
      };
    }
    if (envioEmail) {
      return {
        ok: true,
        resp: "Mensaje enviado exitosamente",
        envioEmail,
      };
    }
  } catch (error) {
    return {
      ok: false,
      resp: `Porfavor, verifique su conexion a internet o el correo electronico`,
      error,
    };
  }
};
module.exports = {
  enviarReporte,
};
