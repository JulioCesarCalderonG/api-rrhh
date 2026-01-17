const { request, response } = require("express");


const getPresidentes = async(req=request,res=response)=>{
    try {
        return res.json({
            ok:true,
            msg:''
        })
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const getPresidente = async(req=request,res=response)=>{
    try {
        return res.json({
            ok:true,
            msg:''
        })
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const postPresidente = async(req=request,res=response)=>{
    try {
        return res.json({
            ok:true,
            msg:''
        })
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const putPresidente = async(req=request,res=response)=>{
    try {
        return res.json({
            ok:true,
            msg:''
        })
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}
const deletePresidente = async(req=request,res=response)=>{
    try {
        return res.json({
            ok:true,
            msg:''
        })
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}

module.exports = {
    getPresidentes,
    getPresidente,
    postPresidente,
    putPresidente,
    deletePresidente
}