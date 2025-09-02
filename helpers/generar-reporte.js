const { RegimenLaboral, Personal, General, Vacacional, Merito, Cargo, DetalleLicencia, TipoLicencia, Licencia, Sancion, Estado, Condicion, Regimen } = require("../models");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
const {funDate} = require('./fc-fecha');

const generarNombreReporte = async(id=0,tipo_reporte='',nombre='',fecha1='',hora='', id_regimen_laboral='')=>{
    try {
        const filename = String(nombre)+"-"+String(tipo_reporte)+"-"+String(fecha1)+"-"+ ".pdf";
        const pathUrl = path.join(__dirname,"../uploads","reportes",filename);
        if (tipo_reporte==='1') {
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
            };
        
            const html = fs.readFileSync(
              path.join(__dirname, "../pdf/html/recordlaboral.html"),
              "utf-8"
            );
            
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
            let idcount = 0;
            const resp = await General.findAll({
              where: {
                id_personal: id,
                periodo: 1,
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
            let diasCountUno=0;
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
                };
                const {fecha}= funDate();
                const inicioarr = resp[i].inicio.split("-");
                const finarr = resp[i].fin==='2030-12-30'?fecha.split("-"):resp[i].fin.split("-");
                const fechaInicio = new Date(
                  `${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`
                );
                const fechaFin = new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
                const dias =
                  (fechaFin.getTime() - fechaInicio.getTime()) / 1000 / 60 / 60 / 24 + 1;
                diasCountUno=diasCountUno+dias;
                idcount = i + 1;
                array.push(prod);
              }
            }
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
                };
                
                idcount = idcount + 1;
                array2.push(prod);
              }
            }
            const ano=365;
            const meses=30;
            const dias=1;
            let anoCount=0;
            let mesesCount=0;
            let diasCount=0;
            do {
              if (diasCountUno>=ano) {
                anoCount++;
                diasCountUno=diasCountUno-ano;
              }else if (diasCountUno>=meses) {
                mesesCount++;
                diasCountUno=diasCountUno-meses;
              }else if (diasCountUno>=dias) {
                diasCount++;
                diasCountUno=diasCountUno-dias;
              }
            } while (diasCountUno>0);
        
        
            const obj = {
              prodlist: array,
              prodlist2: array2,
              personal: `${person.nombre} ${person.apellido}`,
              escalafon: person.escalafon,
              inicio: person.fecha_inicio,
              dependencia: depen ? depen.dependencia : "",
              cargo: depen ? depen.Cargo.descripcion : "",
              ano:anoCount,
              meses:mesesCount,
              dias:diasCount
            };
            
            const document = {
              html: html,
              data: {
                products: obj,
              },
              path:pathUrl,
            };
            const archivo = await pdf.create(document, options);
        }
        if (tipo_reporte==='2') {
            
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
            const regimen =  await RegimenLaboral.findOne({
              where:{
                id:id_regimen_laboral
              },
              include:[
                {
                  model:Condicion,
                  include:[
                    {
                      model:Regimen
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
                id_regimen_laboral
              },
              order: [
                ["periodo", "ASC"],
                ["inicio", "ASC"],
              ],
            });
         /* Obtener por periodos */
            let array2=[];
            if (resp.length>0) {
              for (let i = 0; i < resp.length; i++) {
                const respu = array2.find(array3=> array3.periodo===resp[i].periodo);
                
                if (respu) {
                  const respu2= array2.filter((reso)=>reso.periodo!==respu.periodo);
                  array2=respu2;
                  const obj={
                    periodo:resp[i].periodo,
                    dias:Number(respu.dias)+Number(resp[i].dias),
                    generados:30,
                    saldo:30-(Number(respu.dias)+Number(resp[i].dias))
                  }
                  array2.push(obj);
                }else{
                  const obj={
                    periodo:resp[i].periodo,
                    dias:Number(resp[i].dias),
                    generados:30,
                    saldo:30-Number(resp[i].dias)
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
              prodlist2:array2,
              personal: `${person.nombre} ${person.apellido}`,
              escalafon: person.escalafon,
              inicio: regimen.inicio,
              fin:(regimen.fin==='2030-12-30')?'':regimen.fin,
              dependencia: depen ? depen.dependencia : "",
              cargo: depen ? depen.Cargo.descripcion : "",
              total: count ? count * 30 : 0,
              efectivo,
              resta: count * 30 - efectivo,
              regimen:regimen.Condicion.Regimen.nombre,
              condicion:regimen.Condicion.nombre,
            };
            const document = {
              html: html,
              data: {
                products: obj,
              },
              path: pathUrl,
            };
        
            const archivo = await pdf.create(document, options);
        }
        if (tipo_reporte==='3') {
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

        }
        if (tipo_reporte==='4') {
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
            const filename = Math.random() + "_doc" + ".pdf";
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
        }
        return filename;
    }catch (error) {
        return error
    }
}
const generarNombreReporteFirma = async(id=0,tipo_reporte='',nombre='',fecha1='',hora='', id_regimen_laboral='')=>{
  try {
      const filename = String(nombre)+"-"+String(tipo_reporte)+"-"+String(fecha1)+"-"+"firmado"+ ".pdf";
      const pathUrl = path.join(__dirname,"../uploads","reportes",filename);
      if (tipo_reporte==='1') {
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
          };
      
          const html = fs.readFileSync(
            path.join(__dirname, "../pdf/html2/recordlaboral.html"),
            "utf-8"
          );
          
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
          let idcount = 0;
          const resp = await General.findAll({
            where: {
              id_personal: id,
              periodo: 1,
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
          let diasCountUno=0;
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
              };
              const {fecha}= funDate();
              const inicioarr = resp[i].inicio.split("-");
              const finarr = resp[i].fin==='2030-12-30'?fecha.split("-"):resp[i].fin.split("-");
              const fechaInicio = new Date(
                `${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`
              );
              const fechaFin = new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
              const dias =
                (fechaFin.getTime() - fechaInicio.getTime()) / 1000 / 60 / 60 / 24 + 1;
              diasCountUno=diasCountUno+dias;
              idcount = i + 1;
              array.push(prod);
            }
          }
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
              };
              
              idcount = idcount + 1;
              array2.push(prod);
            }
          }
          const ano=365;
          const meses=30;
          const dias=1;
          let anoCount=0;
          let mesesCount=0;
          let diasCount=0;
          do {
            if (diasCountUno>=ano) {
              anoCount++;
              diasCountUno=diasCountUno-ano;
            }else if (diasCountUno>=meses) {
              mesesCount++;
              diasCountUno=diasCountUno-meses;
            }else if (diasCountUno>=dias) {
              diasCount++;
              diasCountUno=diasCountUno-dias;
            }
          } while (diasCountUno>0);
      
      
          const obj = {
            prodlist: array,
            prodlist2: array2,
            personal: `${person.nombre} ${person.apellido}`,
            escalafon: person.escalafon,
            inicio: person.fecha_inicio,
            dependencia: depen ? depen.dependencia : "",
            cargo: depen ? depen.Cargo.descripcion : "",
            ano:anoCount,
            meses:mesesCount,
            dias:diasCount
          };
          
          const document = {
            html: html,
            data: {
              products: obj,
            },
            path:pathUrl,
          };
          const archivo = await pdf.create(document, options);
          //console.log(html);
      }
      if (tipo_reporte==='2') {
          
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
            path.join(__dirname, "../pdf/html2/vacacionalpersonal.html"),
            "utf-8"
          );
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
          const regimen =  await RegimenLaboral.findOne({
            where:{
              id:id_regimen_laboral
            },
            include:[
              {
                model:Condicion,
                include:[
                  {
                    model:Regimen
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
              id_regimen_laboral
            },
            order: [
              ["periodo", "ASC"],
              ["inicio", "ASC"],
            ],
          });
       /* Obtener por periodos */
          let array2=[];
          if (resp.length>0) {
            for (let i = 0; i < resp.length; i++) {
              const respu = array2.find(array3=> array3.periodo===resp[i].periodo);
              
              if (respu) {
                const respu2= array2.filter((reso)=>reso.periodo!==respu.periodo);
                array2=respu2;
                const obj={
                  periodo:resp[i].periodo,
                  dias:Number(respu.dias)+Number(resp[i].dias),
                  generados:30,
                  saldo:30-(Number(respu.dias)+Number(resp[i].dias))
                }
                array2.push(obj);
              }else{
                const obj={
                  periodo:resp[i].periodo,
                  dias:Number(resp[i].dias),
                  generados:30,
                  saldo:30-Number(resp[i].dias)
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
            prodlist2:array2,
            personal: `${person.nombre} ${person.apellido}`,
            escalafon: person.escalafon,
            inicio: regimen.inicio,
            fin:(regimen.fin==='2030-12-30')?'':regimen.fin,
            dependencia: depen ? depen.dependencia : "",
            cargo: depen ? depen.Cargo.descripcion : "",
            total: count ? count * 30 : 0,
            efectivo,
            resta: count * 30 - efectivo,
            regimen:regimen.Condicion.Regimen.nombre,
            condicion:regimen.Condicion.nombre,
          };
          const document = {
            html: html,
            data: {
              products: obj,
            },
            path: pathUrl,
          };
      
          const archivo = await pdf.create(document, options);
      }
      if (tipo_reporte==='3') {
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
          path.join(__dirname, "../pdf/html2/licenciapersonal.html"),
          "utf-8"
          );
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

      }
      if (tipo_reporte==='4') {
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
          path.join(__dirname, "../pdf/html2/meritopersonal.html"),
          "utf-8"
          );
          const filename = Math.random() + "_doc" + ".pdf";
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
      }
      return filename;
  }catch (error) {
      return error
  }
}
module.exports = {
    generarNombreReporte,
    generarNombreReporteFirma
}