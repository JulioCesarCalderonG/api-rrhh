const { request, response } = require("express");
const { General, Vacacional, Merito, Historial } = require("../models");
const path = require("path");
const fs = require("fs");
const Licencia = require("../models/licencia");
const { subirArchivo, funDate } = require("../helpers");

const mostrarPdfRecordLaboral = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const resp = await General.findOne({
      where: {
        documento: nombre,
      },
    });
    if (!resp) {
      const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
      return res.sendFile(pathImagenDefault);
    }

    if (resp.documento) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        "record-laboral",
        resp.documento
      );
      return res.sendFile(pathImagen);
    }
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefault);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const putPdfLaboral = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const admin = req.adminToken;
    const {fecha,hora} = funDate();
    const {personal}= req.body;
    const file = req.files;
    const resp = await General.findOne({
      where: {
        id,
      },
    });
    if (resp.documento) {
      const pathDocumento = path.join(
        __dirname,
        "../uploads",
        "record-laboral",
        resp.documento
      );
      if (fs.existsSync(pathDocumento)) {
        fs.unlinkSync(pathDocumento);
      }
    }
    const documento = await subirArchivo(file, ['pdf'], "record-laboral");
    const actualizar = await General.update(
      {
        documento,
      },
      {
        where: {
          id,
        },
      }
    );
    const dataHisto = {
      fecha,
      hora,
      descripcion:`SE MODIFICO EL DOCUMENTO QUE AUTORIZA EL RECORD LABORAL DEL PERSONAL: ${personal}`,
      id_tipo_record:1,
      id_record:id,
      id_administrador:admin.id
    }
    const historial= await Historial.create(dataHisto);
    res.json({
      ok: true,
      msg: "Se actualizo el archivo con extio",
      resp: actualizar,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const mostrarPdfLicencia = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const resp = await Licencia.findOne({
      where: {
        documento: nombre,
      },
    });
    if (!resp) {
      const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
      return res.sendFile(pathImagenDefault);
    }

    if (resp.documento) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        "licencias",
        resp.documento
      );
      return res.sendFile(pathImagen);
    }
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefault);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const putPdfLicencia = async(req=request, res=response) =>{
  try {
    const {id} = req.params;
    const file = req.files;
    const admin = req.adminToken;
    const {fecha,hora} = funDate();
    const {personal}= req.body;
    const resp = await Licencia.findOne({
      where:{
        id,
      },
    });
    if (resp.documento) {
      const pathDocumento = path.join(__dirname,'../uploads', 'licencias', resp.documento);
      if (fs.existsSync(pathDocumento)) {
        fs.unlinkSync(pathDocumento);
      }
    }
    const documento = await subirArchivo(file, ['pdf'], "licencias");
    const actualizar = await Licencia.update({
      documento
    },{
      where:{
        id,
      },
    });
    const dataHisto = {
      fecha,
      hora,
      descripcion:`SE MODIFICO EL DOCUMENTO QUE AUTORIZA EL RECORD DE LICENCIA DEL PERSONAL: ${personal}`,
      id_tipo_record:3,
      id_record:id,
      id_administrador:admin.id
    }
    const historial= await Historial.create(dataHisto);
    res.json({
      ok:true,
      msg: "Se actualizo el archivo con extio",
      resp: actualizar
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
  };
const mostrarPdfVacacional = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const resp = await Vacacional.findOne({
      where: {
        documento: nombre,
      },
    });
    if (!resp) {
      const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
      return res.sendFile(pathImagenDefault);
    }

    if (resp.documento) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        "vacacional",
        resp.documento
      );
      return res.sendFile(pathImagen);
    }
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefault);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const putPdfVacacional = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const admin = req.adminToken;
    const {fecha,hora} = funDate();
    const {personal}= req.body;
    const file = req.files;
    const resp = await Vacacional.findOne({
      where: {
        id,
      },
    });
    if (resp.documento) {
      const pathDocumento = path.join(
        __dirname,
        "../uploads",
        "vacacional",
        resp.documento
      );
      if (fs.existsSync(pathDocumento)) {
        fs.unlinkSync(pathDocumento);
      }
    }
    const documento = await subirArchivo(file, ["pdf"], "vacacional");
    const actualizar = await Vacacional.update(
      {
        documento,
      },
      {
        where: {
          id,
        },
      }
    );
    const dataHisto = {
      fecha,
      hora,
      descripcion:`SE AGREGO EL DOCUMENTO QUE AUTORIZA EL RECORD VACACIONAL DEL PERSONAL: ${personal}`,
      id_tipo_record:2,
      id_record:id,
      id_administrador:admin.id
 }
    const historial= await Historial.create(dataHisto);
    res.json({
      ok: true,
      msg: "Se actulizo el archivo con exito",
      resp: actualizar,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const mostrarPdfMerito = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const resp = await Merito.findOne({
      where: {
        documento: nombre,
      },
    });
    
    if (!resp) {
      const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
      return res.sendFile(pathImagenDefault);
    }

    if (resp.documento) {
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        "meritos",
        resp.documento
      );
      return res.sendFile(pathImagen);
    }
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefault);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const putPdfMerito = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const admin = req.adminToken;
    const {fecha,hora} = funDate();
    const {personal}= req.body;
    const file = req.files;
    const resp = await Merito.findOne({
      where: {
        id,
      },
    });
    if (resp.documento) {
      const pathDocumento = path.join(
        __dirname,
        "../uploads",
        "meritos",
        resp.documento
      );
      if (fs.existsSync(pathDocumento)) {
        fs.unlinkSync(pathDocumento);
      }
    }
    const documento = await subirArchivo(file, ["pdf"], "meritos");
    const actualizar = await Merito.update(
      {
        documento,
      },
      {
        where: {
          id,
        },
      }
    );
    const dataHisto = {
      fecha,
      hora,
      descripcion:`SE AGREGO EL DOCUMENTO QUE AUTORIZA EL RECORD DEMERITO DEL PERSONAL: ${personal}`,
      id_tipo_record:4,
      id_record:id,
      id_administrador:admin.id
 }
 const historial= await Historial.create(dataHisto);
    res.json({
      ok: true,
      msg: "Se actulizo el archivo con exito",
      resp: actualizar,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
module.exports = {
  mostrarPdfRecordLaboral,
  mostrarPdfLicencia,
  mostrarPdfVacacional,
  putPdfVacacional,
  putPdfLaboral,
  putPdfLicencia,
  mostrarPdfMerito,
  putPdfMerito
};
