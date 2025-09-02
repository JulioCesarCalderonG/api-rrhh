const { request, response } = require("express");
const sequelize = require('../database/database');
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-creator-node");
const {
  Organo,
  Personal,
  Cargo,
  General,
  UnidadOrganica,
  Area,
  Sede,
  Merito,
  Sancion,
  Estado,
  Vacacional,
  RegimenLaboral,
  Condicion,
  Regimen,
} = require("../models");
const { Op } = require("sequelize");
const Licencia = require("../models/licencia");
const DetalleLicencia = require("../models/detalle-licencia");
const TipoLicencia = require("../models/tipo-licencia");
const { funDate } = require("../helpers");
const postRecordLaboral = async (req = request, res = response) => {
  try {
    const {
      tipofiltro,
      tipodependencia,
      dependencia,
      personal,
      fechainicio,
      fechafin,
    } = req.body;
    const fechafinal = fechafin === "" ? "2030-12-30" : fechafin;

    let array = [];
    let data = [];
    let nombredepedencia = "";
    let sede = "";
    const options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "28mm",
        contents: {
          first: "Cover page",
          2: "Second page", // Any page number is working. 1-based index
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: "Last Page",
        },
      },
    };

    if (tipofiltro === "1") {
      switch (tipodependencia) {
        case "1":
          const organo = await Organo.findOne({
            where: {
              id: dependencia,
            },
            include: [
              {
                model: Sede,
              },
            ],
          });
          const resp = await General.findAll({
            where: {
              dependencia: organo.nombre,
              [Op.or]: [
                {
                  [Op.and]: [
                    {
                      inicio: {
                        [Op.gte]: fechainicio,
                      },
                    },
                    {
                      inicio: {
                        [Op.lte]: fechafinal,
                      },
                    },
                  ],
                },
                {
                  [Op.and]: [
                    {
                      fin: {
                        [Op.gte]: fechainicio,
                      },
                    },
                    {
                      fin: {
                        [Op.lte]: fechafinal,
                      },
                    },
                  ],
                }
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
          data = resp;
          nombredepedencia = organo.nombre;
          sede = organo.Sede.nombre;
          break;
        case "2":
          const unidad = await UnidadOrganica.findOne({
            where: {
              id: dependencia,
            },
            include: [
              {
                model: Organo,
                include: [
                  {
                    model: Sede,
                  },
                ],
              },
            ],
          });
          const resp2 = await General.findAll({
            where: {
              dependencia: unidad.nombre,
              [Op.or]: [
                {
                  [Op.and]: [
                    {
                      inicio: {
                        [Op.gte]: fechainicio,
                      },
                    },
                    {
                      inicio: {
                        [Op.lte]: fechafinal,
                      },
                    },
                  ],
                },
                {
                  [Op.and]: [
                    {
                      fin: {
                        [Op.gte]: fechainicio,
                      },
                    },
                    {
                      fin: {
                        [Op.lte]: fechafinal,
                      },
                    },
                  ],
                }
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
          data = resp2;
          nombredepedencia = unidad.nombre;
          sede = unidad.Organo.Sede.nombre;
          break;
        case "3":
          const area = await Area.findOne({
            where: {
              id: dependencia,
            },
            include: [
              {
                model: UnidadOrganica,
                include: [
                  {
                    model: Organo,
                    include: [
                      {
                        model: Sede,
                      },
                    ],
                  },
                ],
              },
            ],
          });
          const resp3 = await General.findAll({
            where: {
              dependencia: area.nombre,
              [Op.or]: [
                {
                  [Op.and]: [
                    {
                      inicio: {
                        [Op.gte]: fechainicio,
                      },
                    },
                    {
                      inicio: {
                        [Op.lte]: fechafinal,
                      },
                    },
                  ],
                },
                {
                  [Op.and]: [
                    {
                      fin: {
                        [Op.gte]: fechainicio,
                      },
                    },
                    {
                      fin: {
                        [Op.lte]: fechafinal,
                      },
                    },
                  ],
                }
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
          data = resp3;
          nombredepedencia = area.nombre;
          sede = area.UnidadOrganica.Organo.Sede.nombre;
          break;
        default:
          break;
      }
    }
    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/relacionpersonal.html"),
      "utf-8"
    );
    const filename = "recordlaboralgeneral" + "_doc" + ".pdf";
    if (data.length === 0) {
      const prod = {
        id: "",
        documento: "",
        personal: "",
        dependencia: "",
        cargo: "",
        desde: "",
        hasta: "",
      };
      array.push(prod);
    } else {
      for (let i = 0; i < data.length; i++) {
        const prod = {
          id: `${i + 1}`,
          documento: data[i].codigo_documento,
          personal: `${data[i].Personal.nombre} ${data[i].Personal.apellido}`,
          dependencia: data[i].dependencia,
          cargo: `${data[i].Cargo.descripcion}`,
          desde: data[i].inicio,
          hasta: data[i].fin === "2030-12-30" ? "ACTUALIDAD" : data[i].fin,
        };
        array.push(prod);

      }
    }
    const obj = {
      prodlist: array,
      tipopersonal:
        tipodependencia === "1"
          ? "MAGISTRADOS Y PERSONAL JURISDICCIONAL"
          : "FUNCIONARIOS Y PERSONAL ADMINISTRATIVO",
      dependencia: nombredepedencia,
      sede: sede,
      inicio: fechainicio,
      fin: fechafin === "" ? "LA ACTUALIDAD" : fechafin,
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: "./pdf/reportes/" + filename,
    };
    const archivo = await pdf.create(document, options);
    const nom = archivo.filename.split("\\");
    const nombre = nom[nom.length - 1];
    return res.json({
      ok: true,
      msg: "Se creo documento",
      nombre: filename
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const postRecordLaboralPersona = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    let array = [];
    let array2 = [];
    const options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "24mm",
        contents: {
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        },
      },
      "timeout": 60000
    };

    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/recordlaboral.html"),
      "utf-8"
    );

    const filename = "recordlaboralpersonal" + "_doc" + ".pdf";
    const pathUrl = path.join(__dirname, "../pdf", "reportes", filename);
    const person = await Personal.findOne({
      where: {
        id,
      },
    });
    // ASIGNAMOS LA DEPENDENCIA ACTUAL
    const mayor = await General.max('fin', {
      where: {
        id_personal: id,
        periodo:1
      }
    });
    const depen = await General.findOne({
      where: {
        id_personal: id,
        fin: mayor,
        periodo:1
      },
      include: [
        {
          model: Cargo,
        },
      ],
    });
    //const mayor = await General.max('fin');
    /* const mayor = await General.findOne({
      attributes: [[sequelize.fn('max', sequelize.col('fin'))],"dependencia"],
    }); */
    let idcount = 0;
    /* SACANDO PORT TIPO = 0 */
    const resp = await General.findAll({
      where: {
        id_personal: id,
        periodo: 1,
        tipo: 0
      },
      order: [["inicio", "ASC"]],
      include: [
        {
          model: Personal,
        },
        {
          model: Cargo,
        },
      ],
    });
    let diasCountUno = 0;
    if (resp.length === 0) {
      const prod = {
        id: "",
        documento: "",
        personal: "",
        dependencia: "",
        cargo: "",
        desde: "",
        hasta: "",
      };
      array.push(prod);
    } else {
      for (let i = 0; i < resp.length; i++) {
        const prod = {
          id: `${i + 1}`,
          documento: resp[i].codigo_documento,
          dependencia: resp[i].dependencia,
          cargo: `${resp[i].Cargo.descripcion}`,
          desde: resp[i].inicio,
          hasta: resp[i].fin === "2030-12-30" ? "ACTUALIDAD" : resp[i].fin,
          horainicial:resp[i].horainicial,
          horafinal:resp[i].horafinal
        };
        const { fecha } = funDate();
        const inicioarr = resp[i].inicio.split("-");
        const finarr = resp[i].fin === '2030-12-30' ? fecha.split("-") : resp[i].fin.split("-");
        const fechaInicio = new Date(
          `${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`
        );
        const fechaFin = new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
        const dias =
          (fechaFin.getTime() - fechaInicio.getTime()) / 1000 / 60 / 60 / 24 + 1;
        diasCountUno = diasCountUno + dias;
        idcount = i + 1;
        array.push(prod);
      }

    }
    /* SACANDO POR TIPO = 1 */
    const resp3 = await General.findAll({
      where: {
        id_personal: id,
        periodo: 1,
        tipo: 1
      },
      order: [["inicio", "ASC"]],
      include: [
        {
          model: Personal,
        },
        {
          model: Cargo,
        },
      ],
    });
    let horascountUno = 0;
    if (resp3.length === 0) {
    } else {
      for (let i = 0; i < resp3.length; i++) {
        const prod = {
          id: `${i + 1}`,
          documento: resp3[i].codigo_documento,
          dependencia: resp3[i].dependencia,
          cargo: `${resp3[i].Cargo.descripcion}`,
          desde: resp3[i].inicio,
          hasta: resp3[i].fin === "2030-12-30" ? "ACTUALIDAD" : resp3[i].fin,
          horainicial:resp3[i].horainicial,
          horafinal:resp3[i].horafinal
        };
        
        horascountUno = resp3[i].horatotal+horascountUno;
        array.push(prod);
      }
    }
    const horas=24;
    let diasCountDos = 0;
    do {
      if (horascountUno >= horas) {
        diasCountDos++;
        horascountUno = (horascountUno - horas).toFixed(2);
      }
    } while (horascountUno >= 24);
    diasCountUno=diasCountDos+diasCountUno;
    const hora= String(horascountUno).split('.');
    let numero = {}
    if (hora.length===0) {
      numero={
        hora:'0',
        minutos:'0'
      }
    }
    else{
      if (hora.length===2) {
        numero={
          hora:`${hora[0]}`,
          minutos:`${hora[1]}`
        }
      }else{
        numero={
          hora:`${hora[0]}`,
          minutos:`0`
        }
      }
    }
    /* SANDO EL REPORTE 2 */
    
    const resp2 = await General.findAll({
      where: {
        id_personal: id,
        periodo: 2,
      },
      order: [["inicio", "ASC"]],
      include: [
        {
          model: Personal,
        },
        {
          model: Cargo,
        },
      ],
    });


    if (resp2.length === 0) {
      const prod = {
        id: "",
        documento: "",
        personal: "",
        dependencia: "",
        cargo: "",
        desde: "",
        hasta: "",
      };
      array2.push(prod);
    } else {
      for (let i = 0; i < resp2.length; i++) {
        const prod = {
          id: `${idcount + 1}`,
          documento: resp2[i].codigo_documento,
          dependencia: resp2[i].dependencia,
          cargo: `${resp2[i].Cargo.descripcion}`,
          desde: resp2[i].inicio,
          hasta: resp2[i].fin === "2030-12-30" ? "ACTUALIDAD" : resp2[i].fin,
          horainicial:resp2[i].horainicial,
          horafinal:resp2[i].horafinal
        };

        idcount = idcount + 1;
        array2.push(prod);
      }
    }
    const ano = 365;
    const meses = 30;
    const dias = 1;
    let anoCount = 0;
    let mesesCount = 0;
    let diasCount = 0;
    do {
      if (diasCountUno >= ano) {
        anoCount++;
        diasCountUno = diasCountUno - ano;
      } else if (diasCountUno >= meses) {
        mesesCount++;
        diasCountUno = diasCountUno - meses;
      } else if (diasCountUno >= dias) {
        diasCount++;
        diasCountUno = diasCountUno - dias;
      }
    } while (diasCountUno > 0);

    
    const obj = {
      prodlist: array,
      prodlist2: array2,
      personal: `${person.nombre} ${person.apellido}`,
      escalafon: person.escalafon,
      inicio: person.fecha_inicio,
      dependencia: depen ? depen.dependencia : "",
      cargo: depen ? depen.Cargo.descripcion : "",
      ano: anoCount,
      meses: mesesCount,
      dias: diasCount,
      ...numero
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: pathUrl,
    };
    const archivo = await pdf.create(document, options);

    return res.json({
      ok: true,
      msg: "Se creo documento",
      resp,
      nombre:filename
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const postLicenciaPersona = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    let array = [];
    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "24mm",
        contents: {
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        },
      },
    };

    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/licenciapersonal.html"),
      "utf-8"
    );
    const filename = "recordlicenciapersona" + "_doc" + ".pdf";
    const pathUrl = path.join(__dirname, "../pdf", "reportes", filename);
    const person = await Personal.findOne({
      where: {
        id,
      },
    });
    const depen = await General.findOne({
      where: {
        id_personal: id,
        fin: "2030-12-30",
      },
      include: [
        {
          model: Cargo,
        },
      ],
    });

    const resp = await Licencia.findAll({
      where: {
        id_personal: id,
      },
      include: [
        {
          model: Personal,
        },
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
    if (resp.length === 0) {
      const prod = {
        id: "",
        documento: "",
        personal: "",
        dependencia: "",
        cargo: "",
        desde: "",
        hasta: "",
      };
      array.push(prod);
    } else {
      for (let i = 0; i < resp.length; i++) {
        const prod = {
          id: `${i + 1}`,
          documento: resp[i].codigo_documento,
          tipolicencia: resp[i].DetalleLicencium.TipoLicencium.nombre,
          detallelicencia: `${resp[i].DetalleLicencium.nombre}`,
          dias: resp[i].dias,
          desde: resp[i].inicio,
          hasta: resp[i].fin,
        };
        array.push(prod);
      }
    }
    const obj = {
      prodlist: array,
      personal: `${person.nombre} ${person.apellido}`,
      escalafon: person.escalafon,
      inicio: person.fecha_inicio,
      dependencia: depen ? depen.dependencia : "",
      cargo: depen ? depen.Cargo.descripcion : "",
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: pathUrl,
    };
    const archivo = await pdf.create(document, options);

    return res.json({
      ok: true,
      msg: "Se creo documento",
      nombre: filename,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const postVacacionalPersona = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { id_regimen_laboral } = req.body;
    let array = [];
    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "10mm",
        contents: {
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        },
      },
    };
    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/vacacionalpersonal.html"),
      "utf-8"
    );
    const filename = "recordvacacionalpersona" + "_doc" + ".pdf";
    const pathUrl = path.join(__dirname, "../pdf", "reportes", filename);
    const person = await Personal.findOne({
      where: {
        id,
      },
    });
    const depen = await General.findOne({
      where: {
        id_personal: id,
        fin: "2030-12-30",
      },
      include: [
        {
          model: Cargo,
        },
      ],
    });
    const regimen = await RegimenLaboral.findOne({
      where: {
        id: id_regimen_laboral
      },
      include: [
        {
          model: Condicion,
          include: [
            {
              model: Regimen
            }
          ]
        }
      ]
    })
    const count = await Vacacional.count({
      where: {
        id_regimen_laboral
      },
      distinct: true,
      col: "periodo",
    });

    const resp = await Vacacional.findAll({
      where: {
        id_regimen_laboral,
      },
      order: [
        ["periodo", "ASC"],
        ["inicio", "ASC"],
      ],
    });
    /* Obtener por periodos */
    let array2 = [];
    if (resp.length > 0) {
      for (let i = 0; i < resp.length; i++) {
        const respu = array2.find(array3 => array3.periodo === resp[i].periodo);

        if (respu) {
          const respu2 = array2.filter((reso) => reso.periodo !== respu.periodo);
          array2 = respu2;
          const obj = {
            periodo: resp[i].periodo,
            dias: Number(respu.dias) + Number(resp[i].dias),
            generados: 30,
            saldo: 30 - (Number(respu.dias) + Number(resp[i].dias))
          }
          array2.push(obj);
        } else {
          const obj = {
            periodo: resp[i].periodo,
            dias: Number(resp[i].dias),
            generados: 30,
            saldo: 30 - Number(resp[i].dias)
          }
          array2.push(obj);
        }
      }
    }
    /* Obtener por ordenamiento */
    let efectivo = 0;
    if (resp.length === 0) {
      const prod = {
        id: "",
        documento: "",
        perido: "",
        inicio: "",
        termino: "",
        ejercicio: "",
      };
      array.push(prod);
    } else {
      for (let i = 0; i < resp.length; i++) {
        const prod = {
          id: `${i + 1}`,
          documento: resp[i].codigo_documento,
          periodo: resp[i].periodo,
          inicio: resp[i].inicio,
          termino: resp[i].termino,
          ejercicio: resp[i].dias,
        };
        efectivo = efectivo + Number(resp[i].dias);
        array.push(prod);
      }
    }
    const obj = {
      prodlist: array,
      prodlist2: array2,
      personal: `${person.nombre} ${person.apellido}`,
      escalafon: person.escalafon,
      inicio: regimen.inicio,
      fin: (regimen.fin === '2030-12-30') ? '' : regimen.fin,
      dependencia: depen ? depen.dependencia : "",
      cargo: depen ? depen.Cargo.descripcion : "",
      total: count ? count * 30 : 0,
      efectivo,
      resta: count * 30 - efectivo,
      regimen: regimen.Condicion.Regimen.nombre,
      condicion: regimen.Condicion.nombre,
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: pathUrl,
    };

    const archivo = await pdf.create(document, options);

    return res.json({
      ok: true,
      msg: "Se creo documento",
      nombre: filename,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const postMeritoPersona = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    let array = [];
    const options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "5mm",
        contents: {
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        },
      },
    };

    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/meritopersonal.html"),
      "utf-8"
    );
    const filename = "recordmeritopersona" + "_doc" + ".pdf";
    const pathUrl = path.join(__dirname, "../pdf", "reportes", filename);
    const person = await Personal.findOne({
      where: {
        id,
      },
    });
    const depen = await General.findOne({
      where: {
        id_personal: id,
        fin: "2030-12-30",
      },
      include: [
        {
          model: Cargo,
        },
      ],
    });
    const countAmonestacion = await Merito.count({
      where: {
        id_personal: id,
        id_sancion: 1,
      },
    });
    const countSuspencion = await Merito.count({
      where: {
        id_personal: id,
        id_sancion: 2,
      },
    });
    const countMultas = await Merito.count({
      where: {
        id_personal: id,
        id_sancion: 3,
      },
    });
    const countDestitucion = await Merito.count({
      where: {
        id_personal: id,
        id_sancion: 4,
      },
    });
    const countTotal = await Merito.count({
      where: {
        id_personal: id,
      },
    });
    const resp = await Merito.findAll({
      where: {
        id_personal: id,
      },
      include: [
        {
          model: Sancion,
        },
        {
          model: Estado,
        },
      ],
    });
    if (resp.length === 0) {
      const prod = {
        id: "",
        documento: "",
        instancia: "",
        sancion: "",
        fecha: "",
        estado: "",
        observacion: "",
      };
      array.push(prod);
    } else {
      for (let i = 0; i < resp.length; i++) {
        const prod = {
          id: `${i + 1}`,
          documento: resp[i].codigo_documento,
          instancia: resp[i].instancia,
          sancion: resp[i].Sancion.titulo,
          fecha: resp[i].fecha,
          estado: resp[i].Estado.descripcion,
          observacion: resp[i].observacion,
        };
        array.push(prod);
      }
    }
    const obj = {
      prodlist: array,
      personal: `${person.nombre} ${person.apellido}`,
      escalafon: person.escalafon,
      inicio: person.fecha_inicio,
      dependencia: depen ? depen.dependencia : "",
      cargo: depen ? depen.Cargo.descripcion : "",
      amonestacion: countAmonestacion ? countAmonestacion : 0,
      suspencion: countSuspencion ? countSuspencion : 0,
      multas: countMultas ? countMultas : 0,
      destitucion: countDestitucion ? countDestitucion : 0,
      total: countTotal ? countTotal : 0,
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: pathUrl,
    };
    const archivo = await pdf.create(document, options);

    return res.json({
      ok: true,
      msg: "Se creo documento",
      nombre: filename,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const postVacacionalGeneral = async (req = request, res = response) => {
  try {
    const personal = await Personal.findAll({
      where: {
        estado: 1
      }
    });
    let totalcount = 0;
    let ano = new Date().getFullYear();
    if (personal) {
      for (let i = 0; i < personal.length; i++) {
        const vacacional = await Vacacional.findAll({
          where: {
            id_personal: personal[0].id
          }
        });
        //array=vacacional;
        const count1 = await Vacacional.count({
          distinct: true,
          col: 'periodo',
          where: {
            id_personal: personal[1].id,
            periodo: {
              [Op.ne]: ano
            }
          }
        });
        const count2 = await Vacacional.count({
          distinct: true,
          col: 'periodo',
          where: {
            id_personal: personal[1].id,
            periodo: {
              [Op.eq]: ano
            }
          }
        });
        totalcount = count2 !== 0 ? count1 + count2 : count1 + 1;
      }
    }
    res.json({
      ok: true,
      //personal,
      //array,
      totalcount,
      ano
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`
    })
  }
}
const mostrarReporteRecordLaboral = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const pathImagen = path.join(__dirname, "../pdf", "reportes", nombre);
    return res.sendFile(pathImagen);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const mostrarLicenciaLaboral = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const pathImagen = path.join(__dirname, "../pdf", "reportes", nombre);
    return res.sendFile(pathImagen);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const mostrarMerito = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const pathImagen = path.join(__dirname, "../pdf", "reportes", nombre);
    return res.sendFile(pathImagen);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const mostrarVacacional = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const pathImagen = path.join(__dirname, "../pdf", "reportes", nombre);
    return res.sendFile(pathImagen);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
module.exports = {
  postRecordLaboral,
  postRecordLaboralPersona,
  postLicenciaPersona,
  postLicenciaPersona,
  postVacacionalPersona,
  mostrarReporteRecordLaboral,
  mostrarLicenciaLaboral,
  postMeritoPersona,
  mostrarMerito,
  mostrarVacacional,
  postVacacionalGeneral
};
