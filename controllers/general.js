const { request, response } = require('express');
const {
  General,
  Cargo,
  Area,
  dependencia,
  Tipodocumento,
  Personal,
  Organo,
  UnidadOrganica,
  TipoPersonal,
  Historial,
} = require('../models');
const { obtenerDependencia } = require('../helpers/obtener-depedencia');
const { Op, DOUBLE, NUMBER, FLOAT } = require('sequelize');
const { subirArchivo, funDate } = require('../helpers');
const mostrarGeneral = async (req = request, res = response) => {
  const { tipofiltro, dato } = req.query;
  let array = [];
  if (tipofiltro === '' && dato === '') {
    const resp = await General.findAll({
      include: [
        {
          model: Personal,
        },
        {
          model: Cargo,
        },
      ],
    });
    if (resp.length > 0) {
      for (let i = 0; i < resp.length; i++) {
        const data = {
          id: i + 1,
          codigo_documento: resp[i].codigo_documento,
          dependencia: resp[i].dependencia,
          id_personal: resp[i].id_personal,
          id_cargo: resp[i].id_cargo,
          inicio: resp[i].inicio,
          fin: resp[i].fin,
          documento: resp[i].documento,
          Personal: resp[i].Personal,
          Cargo: resp[i].Cargo,
          horainicial:resp[i].horainicial,
          horafinal:resp[i].horafinal
        };
        array.push(data);
      }
    }
    return res.json({
      ok: true,
      msg: 'Se muestran los datos correctamente',
      resp: array,
    });
  }

  switch (tipofiltro) {
    case '1':
      const resps = await General.findAll({
        where: {
          [Op.or]: [
            {
              codigo_documento: {
                [Op.startsWith]: `%${dato}%`,
              },
            },
          ],
        },
        include: [
          {
            model: Personal,
          },
          {
            model: Cargo,
          },
        ],
      });
      if (resps.length > 0) {
        for (let i = 0; i < resps.length; i++) {
          const data = {
            id: i + 1,
            codigo_documento: resps[i].codigo_documento,
            dependencia: resps[i].dependencia,
            id_personal: resps[i].id_personal,
            id_cargo: resps[i].id_cargo,
            inicio: resps[i].inicio,
            fin: resps[i].fin,
            documento: resps[i].documento,
            Personal: resps[i].Personal,
            Cargo: resps[i].Cargo,
          };
          array.push(data);
        }
      }
      return res.json({
        ok: true,
        msg: 'Se muestran los datos correctamente',
        resp: array,
      });
    case '2':
      const reps = await General.findAll({
        where: {
          [Op.or]: [
            {
              dependencia: {
                [Op.startsWith]: `%${dato}%`,
              },
            },
          ],
        },
        include: [
          {
            model: Personal,
          },
          {
            model: Cargo,
          },
        ],
      });
      if (reps.length > 0) {
        for (let i = 0; i < reps.length; i++) {
          const data = {
            id: i + 1,
            codigo_documento: reps[i].codigo_documento,
            dependencia: reps[i].dependencia,
            id_personal: reps[i].id_personal,
            id_cargo: reps[i].id_cargo,
            inicio: reps[i].inicio,
            fin: reps[i].fin,
            documento: reps[i].documento,
            Personal: reps[i].Personal,
            Cargo: reps[i].Cargo,
          };
          array.push(data);
        }
      }
      return res.json({
        ok: true,
        msg: 'Se muestran los datos correctamente',
        resp: array,
      });
    case '3':
      const resp = await General.findAll({
        include: [
          {
            model: Personal,
            where: {
              [Op.or]: [
                {
                  nombre: {
                    [Op.startsWith]: `%${dato}%`,
                  },
                },
                {
                  apellido: {
                    [Op.startsWith]: `%${dato}%`,
                  },
                },
              ],
            },
          },
          {
            model: Cargo,
          },
        ],
      });

      if (resp.length > 0) {
        for (let i = 0; i < resp.length; i++) {
          const data = {
            id: i + 1,
            codigo_documento: resp[i].codigo_documento,
            dependencia: resp[i].dependencia,
            id_personal: resp[i].id_personal,
            id_cargo: resp[i].id_cargo,
            inicio: resp[i].inicio,
            fin: resp[i].fin,
            documento: resp[i].documento,
            Personal: resp[i].Personal,
            Cargo: resp[i].Cargo,
          };
          array.push(data);
        }
      }
      return res.json({
        ok: true,
        msg: 'Se muestran los datos correctamente',
        resp: array,
      });
    case '4':
      const resp4 = await General.findAll({
        include: [
          {
            model: Personal,
          },
          {
            model: Cargo,
            where: {
              [Op.or]: [
                {
                  descripcion: {
                    [Op.startsWith]: `%${dato}%`,
                  },
                },
              ],
            },
          },
        ],
      });

      if (resp4.length > 0) {
        for (let i = 0; i < resp4.length; i++) {
          const data = {
            id: i + 1,
            codigo_documento: resp4[i].codigo_documento,
            dependencia: resp4[i].dependencia,
            id_personal: resp4[i].id_personal,
            id_cargo: resp4[i].id_cargo,
            inicio: resp4[i].inicio,
            fin: resp4[i].fin,
            documento: resp4[i].documento,
            Personal: resp4[i].Personal,
            Cargo: resp4[i].Cargo,
          };
          array.push(data);
        }
      }
      return res.json({
        ok: true,
        msg: 'Se muestran los datos correctamente',
        resp: array,
      });
    default:
      return res.json({
        ok: true,
        msg: 'Se muestran los datos correctamente',
        resp: null,
      });
  }
};
const mostrarGeneralPersonal = async (req = request, res = response) => {
  const { id } = req.params;

  const resp = await General.findAll({
    where: {
      id_personal: id,
    },
    order: [['inicio', 'ASC']],
    include: [
      {
        model: Personal,
      },
      {
        model: Cargo,
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
        dependencia: resp[i].dependencia,
        id_personal: resp[i].id_personal,
        id_cargo: resp[i].id_cargo,
        inicio: resp[i].inicio,
        fin: resp[i].fin,
        documento: resp[i].documento,
        Personal: resp[i].Personal,
        Cargo: resp[i].Cargo,
        horainicial:resp[i].horainicial,
        horafinal:resp[i].horafinal
      };
      array.push(data);
    }
  }
  return res.json({
    ok: true,
    msg: 'Se muestran los datos correctamente',
    resp: array,
  });
};


const mostrarGeneralPersonalDni = async (
  req = request,
  res = response
) => {
  const { dni } = req.params;
  const personal = await Personal.findOne({
    where: {
      dni,
    },
  });
  if (!personal) {
    return res.json({
      ok: false,
      msg: `no se encontro personal con el dni`,
    });
  }
  const resp = await General.findAll({
    where: {
      id_personal: personal.id,
    },
    order: [['inicio', 'ASC']],
    include: [
      {
        model: Personal,
      },
      {
        model: Cargo,
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
        dependencia: resp[i].dependencia,
        id_personal: resp[i].id_personal,
        id_cargo: resp[i].id_cargo,
        inicio: resp[i].inicio,
        fin: resp[i].fin,
        documento: resp[i].documento,
        Personal: resp[i].Personal,
        Cargo: resp[i].Cargo,
        horainicial:resp[i].horainicial,
        horafinal:resp[i].horafinal
      };
      array.push(data);
    }
  }
  return res.json({
    ok: true,
    msg: 'Se muestran los datos correctamente',
    resp: array,
  });
};


const agregarGeneral = async (req = request, res = response) => {
  try {


    const {
      tipo_sigla,
      autoriza,
      tipo_dependencia,
      dependencia,
      tipo_documento,
      ano,
      numero,
      desde,
      hasta,
      personal,
      horainicial,
      horafinal,
      ...data
    } = req.body;
    let secundario = {}

    if (desde === hasta) {
      if (horainicial !== '' & horafinal === '') {
        return res.status(400).json({
          ok: false,
          msg: 'falta completar las horas finales'
        })
      }
      if (horainicial === '' & horafinal !== '') {
        return res.status(400).json({
          ok: false,
          msg: 'falta completar las horas iniciales'
        })
      }
      if (horainicial > horafinal) {
        return res.status(400).json({
          ok: false,
          msg: 'la hora inicial debe ser mayor a la hora de termino'
        })
      }
      if (horainicial !== '' & horafinal !== '') {
        secundario.tipo = 1;
        secundario.horainicial = horainicial;
        secundario.horafinal = horafinal;
        const ini = horainicial.split(':');
        const fini = horafinal.split(':');
        const numeber1 = Number(`${ini[0]}.${ini[1]}`);
        const numeber2 = Number(`${fini[0]}.${fini[1]}`);
        const horatotal = numeber2 - numeber1;
        secundario.horatotal = horatotal.toFixed(2)
      } else {
        secundario.tipo = 0;
        secundario.horainicial = null;
        secundario.horafinal = null;
        secundario.horatotal = null
      }

    }
    const admin = req.adminToken;
    let codigo = '';
    let documento = '';
    const file = req.files;
    const { fecha, hora } = funDate();
    if (file) {
      documento = await subirArchivo(file, ['pdf'], 'record-laboral');
    } else {
      documento = '';
    }
    const tipodoc = await Tipodocumento.findOne({
      where: {
        id: tipo_documento,
      },
    });
    const depen = await obtenerDependencia(tipo_dependencia, dependencia);
    if (
      tipodoc.descripcion === 'BASE DE DATOS' ||
      tipodoc.descripcion === 'SIGA'
    ) {
      codigo = tipodoc.descripcion;
      const datos = {
        codigo_documento: codigo,
        id_personal: data.id_personal,
        id_cargo: data.id_cargo,
        inicio: desde,
        dependencia: depen,
        fin: hasta === '' ? '2030-12-30' : hasta,
        documento,
        periodo: data.periodo,
        tipo_documento,
        tipo_dependencia,
        id_dependencia: dependencia,
        ...secundario
      };
      const general = await General.create(datos);

      const dataHisto = {
        fecha,
        hora,
        descripcion: `Se agrego un record laboral del personal: ${personal}`,
        id_tipo_record: 1,
        id_record: general.id,
        id_administrador: admin.id,
      };
      const historial = await Historial.create(dataHisto);
      return res.json({
        ok: true,
        msg: 'Se creo el Record laboral con exito',
        resp: general,
      });
    }
    if (tipodoc.descripcion === 'CONTRATO ADMINISTRATIVO') {
      if (numero === '' || ano === '') {
        return res.status(400).json({
          ok: false,
          msg: 'Completa bien los datos',
        });
      }
      codigo = `CONTRATO ADMINISTRATIVO N° ${numero}-${ano}`;
      const datos = {
        codigo_documento: codigo,
        id_personal: data.id_personal,
        id_cargo: data.id_cargo,
        inicio: desde,
        dependencia: depen,
        fin: hasta === '' ? '2030-12-30' : hasta,
        documento,
        periodo: data.periodo,
        tipo_documento,
        tipo_dependencia,
        numero,
        ano,
        id_dependencia: dependencia,
        ...secundario
      };
      const general = await General.create(datos);
      const dataHisto = {
        fecha,
        hora,
        descripcion: `Se agrego un record laboral del personal: ${personal}`,
        id_tipo_record: 1,
        id_record: general.id,
        id_administrador: admin.id,
      };
      const historial = await Historial.create(dataHisto);
      return res.json({
        ok: true,
        msg: 'Datos registrados con exito',
        resp: general,
      });
    } else {
      if (tipo_sigla !== '0') {
        if (autoriza !== '0') {
          switch (tipo_sigla) {
            case '1':
              const organo = await Organo.findOne({
                where: {
                  id: autoriza,
                },
              });
              codigo = `${tipodoc.descripcion} N° ${numero}-${ano}-${organo.sigla}-CSJUC/PJ`;
              break;
            case '2':
              const unidad = await UnidadOrganica.findOne({
                where: {
                  id: autoriza,
                },
                include: [
                  {
                    model: Organo,
                  },
                ],
              });
              codigo = `${tipodoc.descripcion} N° ${numero}-${ano}-${unidad.sigla}-${unidad.Organo.sigla}-CSJUC/PJ`;
              break;
            case '3':
              const area = await Area.findOne({
                where: {
                  id: autoriza,
                },
                include: [
                  {
                    model: UnidadOrganica,
                    include: [
                      {
                        model: Organo,
                      },
                    ],
                  },
                ],
              });
              codigo = `${tipodoc.descripcion} N° ${numero}-${ano}-${area.sigla}-${area.UnidadOrganica.sigla}-${area.UnidadOrganica.Organo.sigla}-CSJUC/PJ`;
              break;
            default:
              break;
          }
          const datos = {
            codigo_documento: codigo,
            id_personal: data.id_personal,
            id_cargo: data.id_cargo,
            inicio: desde,
            dependencia: depen,
            fin: hasta === '' ? '2030-12-30' : hasta,
            documento,
            periodo: data.periodo,
            tipo_documento,
            tipo_dependencia,
            tipo_sigla,
            numero,
            ano,
            id_dependencia: dependencia,
            id_area: autoriza,
            ...secundario

          };
          const general = await General.create(datos);
          const dataHisto = {
            fecha,
            hora,
            descripcion: `Se agrego un record laboral del personal: ${personal}`,
            id_tipo_record: 1,
            id_record: general.id,
            id_administrador: admin.id,
          };
          const historial = await Historial.create(dataHisto);
          return res.json({
            ok: true,
            msg: 'Datos registrados con exito',
            resp: general,
          });
        } else {
          return res.status(400).json({
            ok: false,
            msg: 'Selecciona bien los datos',
          });
        }
      }
      return res.status(400).json({
        ok: false,
        msg: 'Selecciona bien los datos',
      });
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const modificarGeneral = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const {
      tipo_sigla,
      autoriza,
      tipo_dependencia,
      dependencia,
      tipo_documento,
      ano,
      numero,
      desde,
      hasta,
      personal,
      horainicial,
      horafinal,
      ...data
    } = req.body;
    const admin = req.adminToken;
    let secundario = {}
    if (desde === hasta) {
      if (horainicial !== '' && horafinal !== '') {
        if (horainicial !== '' & horafinal === '') {
          return res.status(400).json({
            ok: false,
            msg: 'falta completar las horas finales'
          })
        }else if (horainicial === '' & horafinal !== '') {
          return res.status(400).json({
            ok: false,
            msg: 'falta completar las horas iniciales'
          })
        }else if (horainicial > horafinal) {
          return res.status(400).json({
            ok: false,
            msg: 'la hora inicial debe ser mayor a la hora de termino'
          })
        }else{
          secundario.tipo = 1;
          secundario.horainicial = horainicial;
          secundario.horafinal = horafinal;
          const ini = horainicial.split(':');
          const fini = horafinal.split(':');
          const numeber1 = Number(`${ini[0]}.${ini[1]}`);
          const numeber2 = Number(`${fini[0]}.${fini[1]}`);
          const horatotal = numeber2 - numeber1;
          secundario.horatotal = horatotal.toFixed(2)
        }
      } else {
        secundario.tipo = 0;
        secundario.horainicial = null;
        secundario.horafinal = null;
        secundario.horatotal = 0;
      }
    }else{
      secundario.tipo = 0;
      secundario.horainicial = null;
      secundario.horafinal = null;
      secundario.horatotal = 0;
    }
    const { fecha, hora } = funDate();
    let codigo = '';

    const tipodoc = await Tipodocumento.findOne({
      where: {
        id: tipo_documento,
      },
    });
    const depen = await obtenerDependencia(tipo_dependencia, dependencia);
    if (
      tipodoc.descripcion === 'BASE DE DATOS' ||
      tipodoc.descripcion === 'SIGA'
    ) {
      codigo = tipodoc.descripcion;
      const datos = {
        codigo_documento: codigo,
        id_personal: data.id_personal,
        id_cargo: data.id_cargo,
        inicio: desde,
        dependencia: depen,
        fin: hasta === '' ? '2030-12-30' : hasta,
        periodo: data.periodo,
        tipo_documento,
        tipo_dependencia,
        id_dependencia: dependencia,
        numero:'',
        ano:'',
        id_area:null,
        tipo_sigla:null,
        ...secundario
      };
      const general = await General.update(datos, {
        where: {
          id,
        },
      });
      const dataHisto = {
        fecha,
        hora,
        descripcion: `SE EDITO EL RECORD LABORAL DEL PERSONAL: ${personal}`,
        id_tipo_record: 1,
        id_record: id,
        id_administrador: admin.id,
      };
      const historial = await Historial.create(dataHisto);
      return res.json({
        ok: true,
        msg: 'Datos ingresados con exitoso',
        resp: general,
      });
    }
    if (tipodoc.descripcion === 'CONTRATO ADMINISTRATIVO') {
      if (numero === '' || ano === '') {
        return res.status(400).json({
          ok: false,
          msg: 'Completa bien los datos',
        });
      }
      codigo = `CONTRATO ADMINISTRATIVO N° ${numero}-${ano}`;
      const datos = {
        codigo_documento: codigo,
        id_personal: data.id_personal,
        id_cargo: data.id_cargo,
        inicio: desde,
        dependencia: depen,
        fin: hasta === '' ? '2030-12-30' : hasta,
        periodo: data.periodo,
        tipo_documento,
        tipo_dependencia,
        numero,
        ano,
        id_area:null,
        tipo_sigla:null,
        id_dependencia: dependencia,
        ...secundario
      };
      const general = await General.update(datos, {
        where: {
          id,
        },
      });
      const dataHisto = {
        fecha,
        hora,
        descripcion: `SE EDITO EL RECORD LABORAL DEL PERSONAL: ${personal}`,
        id_tipo_record: 1,
        id_record: id,
        id_administrador: admin.id,
      };
      const historial = await Historial.create(dataHisto);
      return res.json({
        ok: true,
        msg: 'Datos ingresados con exitos',
        resp: general,
      });
    } else {
      if (tipo_sigla !== '0') {
        if (autoriza !== '0') {
          switch (tipo_sigla) {
            case '1':
              const organo = await Organo.findOne({
                where: {
                  id: autoriza,
                },
              });
              codigo = `${tipodoc.descripcion} N° ${numero}-${ano}-${organo.sigla}-CSJUC/PJ`;
              break;
            case '2':
              const unidad = await UnidadOrganica.findOne({
                where: {
                  id: autoriza,
                },
                include: [
                  {
                    model: Organo,
                  },
                ],
              });
              codigo = `${tipodoc.descripcion} N° ${numero}-${ano}-${unidad.sigla}-${unidad.Organo.sigla}-CSJUC/PJ`;
              break;
            case '3':
              const area = await Area.findOne({
                where: {
                  id: autoriza,
                },
                include: [
                  {
                    model: UnidadOrganica,
                    include: [
                      {
                        model: Organo,
                      },
                    ],
                  },
                ],
              });
              codigo = `${tipodoc.descripcion} N° ${numero}-${ano}-${area.sigla}-${area.UnidadOrganica.sigla}-${area.UnidadOrganica.Organo.sigla}-CSJUC/PJ`;
              break;
            default:
              break;
          }
          const datos = {
            codigo_documento: codigo,
            id_personal: data.id_personal,
            id_cargo: data.id_cargo,
            inicio: desde,
            dependencia: depen,
            fin: hasta === '' ? '2030-12-30' : hasta,
            periodo: data.periodo,
            tipo_documento,
            tipo_dependencia,
            tipo_sigla,
            numero,
            ano,
            id_dependencia: dependencia,
            id_area: autoriza,
            ...secundario
          };
          const general = await General.update(datos, {
            where: {
              id,
            },
          });
          const dataHisto = {
            fecha,
            hora,
            descripcion: `SE EDITO EL RECORD LABORAL DEL PERSONAL: ${personal}`,
            id_tipo_record: 1,
            id_record: id,
            id_administrador: admin.id,
          };
          const historial = await Historial.create(dataHisto);
          return res.json({
            ok: true,
            msg: 'Datos ingresados con exito',
            resp: general,
          });
        } else {
          return res.status(400).json({
            ok: false,
            msg: 'Selecciona bien los datos',
          });
        }
      }
      return res.status(400).json({
        ok: false,
        msg: 'Selecciona bien los datos',
      });
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const mostrarIdGeneral = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await General.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Cargo,
          include: [
            {
              model: TipoPersonal,
            },
          ],
        },
      ],
    });
    res.json({
      ok: true,
      msg: 'Id se muestran los datos correctamente',
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const eliminarGeneral = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { personal } = req.query;
    const admin = req.adminToken;
    const { fecha, hora } = funDate();
    const resp = await General.destroy({
      where: {
        id,
      },
    });
    const dataHisto = {
      fecha,
      hora,
      descripcion: `SE ELIMINO EL RECORD LABORAL DEL PERSONAL: ${personal}`,
      id_tipo_record: 1,
      id_record: id,
      id_administrador: admin.id,
    };
    const historial = await Historial.create(dataHisto);
    res.json({
      ok: true,
      msg: 'Record eliminado con exito',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

module.exports = {
  mostrarGeneral,
  mostrarGeneralPersonal,
  mostrarGeneralPersonalDni,
  agregarGeneral,
  modificarGeneral,
  eliminarGeneral,
  mostrarIdGeneral,
};
