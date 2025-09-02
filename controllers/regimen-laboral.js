const { request, response } = require("express");
const { RegimenLaboral, Personal, Condicion, TipoPersonal, Regimen } = require("../models");
const { Op } = require("sequelize");
const sequelize = require('../database/database');

const mostrarRegimenLaborales =async(req=request,res=response)=>{
    try {
      const {estado,buscar} =req.query;
      if (buscar==='') {
        const consulta = `
        select RL.id, C.nombre as condicion, TP.titulo as tipo_personal, R.nombre as regimen, P.nombre, P.apellido,RL.inicio,RL.fin 
        from regimen_laboral as RL inner join condicion as C on C.id=RL.id_condicion inner join tipo_personal as TP on TP.id=RL.id_tipo_personal 
        inner join personal as P ON P.id= RL.id_personal inner join regimen as R on R.id= C.id_regimen 
        where RL.estado=${estado} order by P.nombre ASC
        `;
        const [results, metadata] = await sequelize.query(consulta);
        let array=[];

        if (results) {
          for (let i = 0; i < results.length; i++) {
            const obj={
              ids:i+1,
              id:results[i].id,
              condicion:results[i].condicion,
              tipo_personal:results[i].tipo_personal,
              regimen:results[i].regimen,
              nombre:results[i].nombre,
              apellido:results[i].apellido,
              inicio:results[i].inicio,
              fin:results[i].fin
            }
            array.push(obj);
          }
        }

        return res.json({
          ok:true,
          msg:'Se muestran los datos con exito',
          resp:array
        });
      }
      const consulta = `
      select RL.id, C.nombre as condicion, TP.titulo as tipo_personal, R.nombre as regimen, P.nombre, P.apellido, RL.inicio,RL.fin from regimen_laboral as RL 
      inner join condicion as C on C.id=RL.id_condicion inner join tipo_personal as TP on TP.id=RL.id_tipo_personal 
      inner join personal as P ON P.id= RL.id_personal inner join regimen as R on R.id= C.id_regimen 
      where RL.estado=${estado} and (R.nombre like '%${buscar}%' or P.nombre like '%${buscar}%' or P.apellido like '%${buscar}%') order by P.nombre ASC
      `;
      const [results, metadata] = await sequelize.query(consulta);
      let array=[];

      if (results) {
        for (let i = 0; i < results.length; i++) {
          const obj={
            ids:i+1,
            id:results[i].id,
            condicion:results[i].condicion,
            tipo_personal:results[i].tipo_personal,
            regimen:results[i].regimen,
            nombre:results[i].nombre,
            apellido:results[i].apellido,
            inicio:results[i].inicio,
            fin:results[i].fin
          }
          array.push(obj);
        }
      }

      return res.json({
        ok:true,
        msg:'Se muestran los datos con exito',
        resp:array
      });

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}

const mostrarRegimenLaboralId =async(req=request,res=response)=>{
    try {
      const {id} = req.params;
      const resp = await RegimenLaboral.findOne({
        where:{
          id
        },
        include:[
          {
            model:Condicion
          }
        ]
      });
      res.json({
        ok:true,
        msg:'Se muestra el dato con exito',
        resp
      })  
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const mostrarRegimenLaboralPersonalId =async(req=request,res=response)=>{
  try {
    const {id} = req.params;
    const resp = await RegimenLaboral.findAll({
      where:{
        id_personal:id
      },
      include:[
        {
          model:Condicion,
          include:[
            {
              model:Regimen
            }
          ]
        },
        {
          model:TipoPersonal
        }
      ]
    });
    res.json({
      ok:true,
      msg:'Se muestra el dato con exito',
      resp
    })  
  } catch (error) {
      res.status(400).json({
          ok:false,
          msg:`Error: ${error}`
      })
  }
}
const guardarRegimenLaboral =async(req=request,res=response)=>{
    try {
      
      const {id_personal,fin,...data} = req.body;

      const rpersonal = await RegimenLaboral.findAll({
        where:{
          id_personal
        }
      });

      if (rpersonal) {
        for (let i = 0; i < rpersonal.length; i++) {
          const inactivar = await RegimenLaboral.update({
            estado:0
          },{where:{
            id_personal
          }})
        }
      }
      if (fin==='') {
        data.fin='2030-12-30';
        
      }else{
        data.fin=fin;
        data.estado=0;
      }
      data.id_personal = id_personal;
      const resp = await RegimenLaboral.create(data);
      res.json({
        ok:true,
        msg:'Se creo el regimen laboral con exito',
        resp
      })  
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const modificarRegimenLaboral =async(req=request,res=response)=>{
    try {
      const {id} = req.params;
      const {fin,...data} = req.body;
      if (fin==='') {
        data.fin='2030-12-30'
      }else{
        data.fin=fin;
        data.estado=0;
      }
      const resp = await RegimenLaboral.update(data,{
        where:{
          id
        }
      });
      res.json({
        ok:true,
        msg:'Se edito el regimen laboral con exito',
        resp
      })  
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}

const eliminarRegimenLaboral =(req=request,res=response)=>{
    try {

      const {id} = req.params;
      const {estado} = req.query;

      res.json({
        ok:true
      })  
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}

module.exports = {
    mostrarRegimenLaborales,
    mostrarRegimenLaboralId,
    mostrarRegimenLaboralPersonalId,
    guardarRegimenLaboral,
    modificarRegimenLaboral,
    eliminarRegimenLaboral
}