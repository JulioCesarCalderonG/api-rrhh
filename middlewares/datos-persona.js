const { Personal, General } = require("../models");



const mostrarDatosPersona = async (id) => {
    let person;
    let mayor;
    let depen;
    try {
        person = await Personal.findOne({
            where: {
                id,
            },
        });
        // ASIGNAMOS LA DEPENDENCIA ACTUAL
        mayor = await General.max('fin', {
            where: {
                id_personal: id,
                periodo: 1
            }
        });
        depen = await General.findOne({
            where: {
                id_personal: id,
                fin: mayor,
                periodo: 1
            },
            include: [
                {
                    model: Cargo,
                },
            ],
        });

        return {
            person,
            mayor,
            depen
        }
    } catch (error) {
        console.log(error);
            return {
            person,
            mayor,
            depen
        }
    }
}


module.exports={
    mostrarDatosPersona
}