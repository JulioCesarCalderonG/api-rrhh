const { request, response } = require("express");
const { subirArchivo, funDate } = require("../helpers");
const { Vacacional, RegimenLaboral, Historial, Personal } = require("../models");

const mostrarVacacionalPersonal = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await Vacacional.findAll({
      include:[
        {
          model:RegimenLaboral,
          where:{
            id_personal:id
          }
        }
      ],
      order: [
        ["periodo", "ASC"],
        ["inicio", "ASC"],
      ]
    });
    let array = [];
    if (resp.length > 0) {
      for (let i = 0; i < resp.length; i++) {
        const data = {
          ids: i + 1,
          id: resp[i].id,
          codigo_documento: resp[i].codigo_documento,
          periodo: resp[i].periodo,
          inicio: resp[i].inicio,
          termino: resp[i].termino,
          dias: resp[i].dias,
          id_personal: resp[i].id_personal,
          documento: resp[i].documento,
        };
        array.push(data);
      }
    }
    res.json({
      ok: true,
      msg: "Se muestran los datos con exito",
      resp: array,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const mostrarVacacionalPersonalDni = async (req = request, res = response) => {
  try {
    const {dni}= req.params;
        const personal = await Personal.findOne({
            where:{
                dni
            }
        });
        if (!personal) {
            return res.json({
                ok:false,
                msg:`no se encontro personal con el dni`
            })
        }
    const resp = await Vacacional.findAll({
      include:[
        {
          model:RegimenLaboral,
          where:{
            id_personal:personal.id
          }
        }
      ],
      order: [
        ["periodo", "ASC"],
        ["inicio", "ASC"],
      ]
    });
    let array = [];
    if (resp.length > 0) {
      for (let i = 0; i < resp.length; i++) {
        const data = {
          ids: i + 1,
          id: resp[i].id,
          codigo_documento: resp[i].codigo_documento,
          periodo: resp[i].periodo,
          inicio: resp[i].inicio,
          termino: resp[i].termino,
          dias: resp[i].dias,
          id_personal: resp[i].id_personal,
          documento: resp[i].documento,
        };
        array.push(data);
      }
    }
    res.json({
      ok: true,
      msg: "Se muestran los datos con exito",
      resp: array,
      personal
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const guardarVacacional = async (req = request, res = response) => {
  try {
    const file = req.files;
    const admin = req.adminToken;
    const {fecha,hora} = funDate();
    const { tipo_documento, area, numero, ano, inicio, fin,personal, ...data } =
      req.body;
    let codigodoc = "";
    if (tipo_documento === "1") {
      switch (area) {
        case "1":
          codigodoc = `R.A N° ${numero}-${ano}-P-CSJUC/PJ`;
          break;
        case "2":
          codigodoc = `R.A N° ${numero}-${ano}-GAD-CSJUC/PJ`;
          break;
        case "3":
          codigodoc = `R.A N° ${numero}-${ano}-UAF-GAD-CSJUC/PJ`;
          break;
        case "4":
          codigodoc = `R.A N° ${numero}-${ano}-OA-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    if (tipo_documento === "2") {
      switch (area) {
        case "1":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-GAD-CSJUC/PJ`;
          break;
        case "2":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-UAF-GAD-CSJUC/PJ`;
          break;
        case "3":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-OA-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    data.codigo_documento = codigodoc;
    data.inicio = inicio;
    data.termino = fin;
    data.tipo_documento = tipo_documento;
    data.area = area;
    data.numero = numero;
    data.ano = ano;
    const inicioarr = inicio.split("-");
    const finarr = fin.split("-");
    const fechaInicio = new Date(
      `${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`
    );
    const fechaFin = new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
    const dias =
      (fechaFin.getTime() - fechaInicio.getTime()) / 1000 / 60 / 60 / 24 + 1;
    const documento = await subirArchivo(file, ["pdf"], "vacacional");
    data.documento = documento;
    data.dias = dias;
    const resp = await Vacacional.create(data);
    const dataHisto = {
      fecha,
      hora,
      descripcion:`SE AGREGO EL RECORD VACACIONAL DEL PERSONAL: ${personal}`,
      id_tipo_record:2,
      id_record:resp.id,
      id_administrador:admin.id
 }
    const historial= await Historial.create(dataHisto);
    res.json({
      ok: true,
      msg: "Se creo record vacacional con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const editarVacacional = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const admin = req.adminToken;
    const {fecha,hora} = funDate();
    const { tipo_documento, area, numero, ano, inicio, fin,personal, ...data } =
      req.body;
    let codigodoc = "";
    if (tipo_documento === "1") {
      switch (area) {
        case "1":
          codigodoc = `R.A N° ${numero}-${ano}-P-CSJUC/PJ`;
          break;
        case "2":
          codigodoc = `R.A N° ${numero}-${ano}-GAD-CSJUC/PJ`;
          break;
        case "3":
          codigodoc = `R.A N° ${numero}-${ano}-UAF-GAD-CSJUC/PJ`;
        case "4":
          codigodoc = `R.A N° ${numero}-${ano}-OA-CSJUC/PJ`;
        default:
          break;
      }
    }
    if (tipo_documento === "2") {
      switch (area) {
        case "1":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-GAD-CSJUC/PJ`;
          break;
        case "2":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-UAF-GAD-CSJUC/PJ`;
          break;
        case "3":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-OA-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    data.codigo_documento = codigodoc;
    data.inicio = inicio;
    data.termino = fin;
    data.tipo_documento = tipo_documento;
    data.area = area;
    data.numero = numero;
    data.ano = ano;
    const inicioarr = inicio.split("-");
    const finarr = fin.split("-");
    const fechaInicio = new Date(
      `${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`
    );
    const fechaFin = new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
    const dias =
      (fechaFin.getTime() - fechaInicio.getTime()) / 1000 / 60 / 60 / 24 + 1;
    data.dias = dias;
    const resp = await Vacacional.update(data, {
      where: {
        id,
      },
    });
    const dataHisto = {
      fecha,
      hora,
      descripcion:`SE EDITO EL RECORD VACACIONAL DEL PERSONAL: ${personal}`,
      id_tipo_record:2,
      id_record:id,
      id_administrador:admin.id
 }
    const historial= await Historial.create(dataHisto);
    res.json({
      ok: true,
      msg: "Se edito record vacacional con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const mostrarIdVacacional = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await Vacacional.findOne({
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestra los datos correctamente",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error ${error}`,
    });
  }
};

const mostrarVacacional = async (req = request, res=response) => {};


const eliminarVacacional = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const admin = req.adminToken;
    const {fecha,hora} = funDate();
    const {personal}= req.query;
    const resp = await Vacacional.destroy({
      where: {
        id
      }
    });
    const dataHisto = {
      fecha,
      hora,
      descripcion:`SE MODIFICO EL DOCUMENTO QUE AUTORIZA EL RECORD LABORAL DEL PERSONAL: ${personal}`,
      id_tipo_record:2,
      id_record:id,
      id_administrador:admin.id
    }
    const historial= await Historial.create(dataHisto);
    res.json({
      ok: true,
      msg: "Record Vacacional eliminado con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

module.exports = {
  mostrarVacacionalPersonal,
  mostrarVacacionalPersonalDni,
  guardarVacacional,
  mostrarIdVacacional,
  editarVacacional,
  mostrarVacacional,
  eliminarVacacional,
};
