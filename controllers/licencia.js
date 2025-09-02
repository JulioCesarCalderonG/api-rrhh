const { request, response } = require('express');
const { subirArchivo, funDate } = require('../helpers');
const Licencia = require('../models/licencia');
const DetalleLicencia = require('../models/detalle-licencia');
const TipoLicencia = require('../models/tipo-licencia');
const { Historial, Personal } = require('../models');

const mostrarLicenciasPersonal = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    
    const resp = await Licencia.findAll({
      where: {
        id_personal: id,
      },
      order: [['inicio', 'ASC']],
      include: [
        {
          model: DetalleLicencia,
          include: [
            {
              model: TipoLicencia,
            },
          ],
        },
      ],
    });
    let array = [];
    if (resp.length > 0) {
      for (let i = 0; i < resp.length; i++) {
        const data = {
          ids: i + 1,
          id: resp[i].id,
          codigo_documento: resp[i].codigo_documento,
          id_personal: resp[i].id_personal,
          id_detalle_licencia: resp[i].id_detalle_licencia,
          dias: resp[i].dias,
          inicio: resp[i].inicio,
          fin: resp[i].fin,
          documento: resp[i].documento,
          DetalleLicencium: resp[i].DetalleLicencium,
        };
        array.push(data);
      }
    }
    res.json({
      ok: true,
      msg: 'Se muestran los datos con exito',
      resp: array,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const mostrarLicenciasPersonalDni = async (req = request, res = response) => {
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
    const resp = await Licencia.findAll({
      where:{
        id_personal:personal.id
      },
      order: [['inicio', 'ASC']],
      include: [
        {
          model: DetalleLicencia,
          include: [
            {
              model: TipoLicencia,
            },
          ],
        },
      ],
    });
    let array = [];
    if (resp.length > 0) {
      for (let i = 0; i < resp.length; i++) {
        const data = {
          ids: i + 1,
          id: resp[i].id,
          codigo_documento: resp[i].codigo_documento,
          id_personal: resp[i].id_personal,
          id_detalle_licencia: resp[i].id_detalle_licencia,
          dias: resp[i].dias,
          inicio: resp[i].inicio,
          fin: resp[i].fin,
          documento: resp[i].documento,
          DetalleLicencium: resp[i].DetalleLicencium,
        };
        array.push(data);
      }
    }
    res.json({
      ok: true,
      msg: 'Se muestran los datos con exito',
      resp: array,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const mostrarLicencias = async (req = request, res = response) => {};

const guardarLicencias = async (req = request, res = response) => {
  try {
    const file = req.files;
    const { tipo_documento, area, numero, ano, inicio, fin,personal, ...data } = req.body;
    const admin = req.adminToken;
    const {fecha,hora} = funDate();
    let codigodoc = '';
    if (tipo_documento === '1') {
      switch (area) {
        case '1':
          codigodoc = `PROVEIDO N° ${numero}-${ano}-P-CSJUC/PJ`;
          break;
        case '2':
          codigodoc = `PROVEIDO N° ${numero}-${ano}-CRH-UAF-GAD-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    if (tipo_documento === '2') {
      switch (area) {
        case '1':
          codigodoc = `R.A N° ${numero}-${ano}-P-CSJUC/PJ`;
          break;
        case '2':
          codigodoc = `R.A N° ${numero}-${ano}-CRH-UAF-GAD-CSJUC/PJ`;
          break;
        case '3':
          codigodoc = `R.A N° ${numero}-${ano}-CRH-UAF-GAD-CSJUC/PJ`;
          break;
        case '4':
          codigodoc = `R.A N° ${numero}-${ano}-OA-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    data.codigo_documento = codigodoc;
    data.inicio = inicio;
    data.fin = fin;
    data.tipo_documento = tipo_documento;
    data.area = area;
    data.numero = numero;
    data.ano = ano;
    const inicioarr = inicio.split('-');
    const finarr = fin.split('-');
    const fechaInicio = new Date(
      `${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`
    );
    const fechaFin = new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
    const dias =
      (fechaFin.getTime() - fechaInicio.getTime()) / 1000 / 60 / 60 / 24 + 1;
    data.dias = dias;
    const documento = await subirArchivo(file, ['pdf'], 'licencias');
    data.documento = documento;
    const resp = await Licencia.create(data);
    const dataHisto = {
      fecha,
      hora,
      descripcion:`SE AGREGO EL RECORD DE LICENCIA DEL PERSONAL: ${personal}`,
      id_tipo_record:3,
      id_record:resp.id,
      id_administrador:admin.id
    }
    const historial= await Historial.create(dataHisto);
    res.json({
      ok: true,
      msg: 'Se creo la licencia con exito',
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const modificarLicencias = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { tipo_documento, area, numero, ano, inicio, fin, personal, ...data } =
      req.body;
    const admin = req.adminToken;
    const {fecha,hora} = funDate(); 
    let codigodoc = '';
    if (tipo_documento === '1') {
      switch (area) {
        case '1':
          codigodoc = `PROVEIDO N° ${numero}-${ano}-P-CSJUC/PJ`;
          break;
        case '2':
          codigodoc = `PROVEIDO N° ${numero}-${ano}-CRH-UAF-GAD-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    if (tipo_documento === '2') {
      switch (area) {
        case '1':
          codigodoc = `R.A N° ${numero}-${ano}-P-CSJUC/PJ`;
          break;
        case '2':
          codigodoc = `R.A N° ${numero}-${ano}-CRH-UAF-GAD-CSJUC/PJ`;
          break;
        case '3':
          codigodoc = `R.A N° ${numero}-${ano}-CRH-UAF-GAD-CSJUC/PJ`;
          break;
        case '4':
          codigodoc = `R.A N° ${numero}-${ano}-OA-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    data.codigo_documento = codigodoc;
    data.inicio = inicio;
    data.fin = fin;
    data.tipo_documento = tipo_documento;
    data.area = area;
    data.numero = numero;
    data.ano = ano;
    const inicioarr = inicio.split('-');
    const finarr = fin.split('-');
    const fechaInicio = new Date(
      `${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`
    );
    const fechaFin = new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
    const dias =
      (fechaFin.getTime() - fechaInicio.getTime()) / 1000 / 60 / 60 / 24 + 1;
    data.dias = dias;
    const resp = await Licencia.update(data, {
      where: {
        id,
      },
    });
    const dataHisto = {
      fecha,
      hora,
      descripcion:`SE MODIFICO EL RECORD DE LICENCIA DEL PERSONAL: ${personal}`,
      id_tipo_record:3,
      id_record:id,
      id_administrador:admin.id
    }
    const historial= await Historial.create(dataHisto);
    res.json({
      ok: true,
      msg: 'Se edito la licencia con exito',
      resp,
      tipo_documento,
      area,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const mostrarIdLicencias = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await Licencia.findOne({
      where: {
        id,
      },
      include: [
        {
          model: DetalleLicencia,
          include: [
            {
              model: TipoLicencia,
            },
          ],
        },
      ],
    });
    res.json({
      ok: true,
      msg: 'Se muestra los datos correctamente',
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const eliminarLicencias = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const {personal}= req.query;
    const admin = req.adminToken;
    const {fecha,hora} = funDate();
    const resp = await Licencia.destroy({
      where: {
        id,
      },
    });
    const dataHisto = {
      fecha,
      hora,
      descripcion:`SE ELIMINO EL RECORD DE LICENCIA DEL PERSONAL: ${personal}`,
      id_tipo_record:3,
      id_record:id,
      id_administrador:admin.id
    }
    const historial= await Historial.create(dataHisto);
    res.json({
      ok: true,
      msg: 'Licencia eliminado con exito',
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
  mostrarLicenciasPersonal,
  mostrarLicenciasPersonalDni,
  guardarLicencias,
  mostrarLicencias,
  modificarLicencias,
  mostrarIdLicencias,
  eliminarLicencias
};
