const { Op } = require("sequelize");
const { Perfil, Usuario, Menu, SubMenu, PerfilSubMenu, Area,
    Cargo,
    Tipodocumento,
    Personal,
    Administrador,
    Sede,
    DetalleLicencia, } = require("../models");




const validarNombrePerfil = async (nombre = "") => {
    const validar = await Perfil.findOne({
        where: {
            nombre: `${nombre.toUpperCase()}`
        }
    })
    if (validar) {
        throw new Error(`El perfil: ${nombre} ya esta registrado en la BD`);
    }
}
const validarExisteNombrePerfil = async (valor, { req }) => {
    const nombre = req.body.nombre.trim();
    const id = req.params.id;
    const validar = await Perfil.findOne({
        where: {
            nombre: `${nombre.toUpperCase()}`,
            idPerfil: { [Op.ne]: id }
        }
    })
    if (validar) {
        throw new Error(`El perfil: ${nombre} ya esta registrado en la BD`);
    }
}
const validarUsuario = async (user = "") => {
    const validar = await Usuario.findOne({
        where: {
            user: `${user.toUpperCase()}`
        }
    })
    if (validar) {
        throw new Error(`El usuario: ${user} ya esta registrado en la BD`);
    }
}
const validarExistUsuario = async (user = "", { req }) => {
    const id = req.params.id;
    const validar = await Usuario.findOne({
        where: {
            idUsuario: { [Op.ne]: id },
            user: `${user.toUpperCase()}`
        }
    })
    if (validar) {
        throw new Error(`El usuario: ${user} ya esta registrado en la BD`);
    }
}
const validarNombreCompleto = async (valor, { req }) => {
    const nombre = req.body.nombre?.trim();
    const apellido = req.body.apellido?.trim();
    const validar = await Usuario.findOne({
        where: {
            nombre,
            apellido
        }
    })
    if (validar) {
        throw new Error(`El usuario: ${nombre} ${apellido} ya esta registrado en la BD`);
    }
}
const validarExistNombreCompleto = async (valor, { req }) => {
    const nombre = req.body.nombre?.trim();
    const apellido = req.body.apellido?.trim();
    const id = req.params.id;
    const validar = await Usuario.findOne({
        where: {
            idUsuario: { [Op.ne]: id },
            nombre: nombre,
            apellido
        }
    })
    if (validar) {
        throw new Error(`El usuario: ${nombre} ${apellido} ya esta registrado en la BD`);
    }
}

const validarNombreMenu = async (nomMenu = "") => {
    const validar = await Menu.findOne({
        where: {
            nomMenu: `${nomMenu.toLowerCase()}`
        }
    })
    if (validar) {
        throw new Error(`El nombre del munu: ${nomMenu} ya esta registrado en la BD`);
    }
}

const validarTituloMenu = async (titulo = "") => {
    const validar = await Menu.findOne({
        where: {
            titulo: `${titulo.toUpperCase()}`
        }
    })
    if (validar) {
        throw new Error(`El titulo del munu: ${titulo} ya esta registrado en la BD`);
    }
}

const validarNombreExisteMenu = async (valor, { req }) => {

    const nomMenu = req.body.nomMenu?.trim();
    const id = req.params.id;
    const validar = await Menu.findOne({
        where: {
            nomMenu: `${nomMenu.toLowerCase()}`,
            idMenu: { [Op.ne]: id }
        }
    })
    if (validar) {
        throw new Error(`El nombre del munu: ${nomMenu} ya esta registrado en la BD`);
    }
}

const validarTituloExisteMenu = async (valor, { req }) => {
    const titulo = req.body.titulo?.trim();
    const id = req.params.id;
    const validar = await Menu.findOne({
        where: {
            titulo: `${titulo.toUpperCase()}`,
            idMenu: { [Op.ne]: id }
        }
    })
    if (validar) {
        throw new Error(`El titulo del munu: ${titulo} ya esta registrado en la BD`);
    }
}

const validarNombreSubMenu = async (subMenu = "") => {
    const validar = await SubMenu.findOne({
        where: {
            subMenu: `${subMenu.toLowerCase()}`
        }
    })
    if (validar) {
        throw new Error(`El nombre del submenu: ${subMenu} ya esta registrado en la BD`);
    }
}
const validarTituloSubMenu = async (titulo = "") => {
    const validar = await SubMenu.findOne({
        where: {
            titulo: `${titulo.toUpperCase()}`
        }
    })
    if (validar) {
        throw new Error(`El titulo del submenu: ${titulo} ya esta registrado en la BD`);
    }
}

const validarNombreExisteSubMenu = async (valor, { req }) => {
    const subMenu = req.body.subMenu?.trim();
    const id = req.params.id;
    const validar = await SubMenu.findOne({
        where: {
            subMenu: `${subMenu.toLowerCase()}`,
            idSubMenu: { [Op.ne]: id }
        }
    })
    if (validar) {
        throw new Error(`El nombre del submenu: ${subMenu} ya esta registrado en la BD`);
    }
}

const validarTituloExisteSubMenu = async (valor, { req }) => {
    const titulo = req.body.subMenu?.trim();
    const id = req.params.id;
    const validar = await SubMenu.findOne({
        where: {
            titulo: `${titulo.toUpperCase()}`,
            idSubMenu: { [Op.ne]: id }
        }
    })
    if (validar) {
        throw new Error(`El titulo del submenu: ${titulo} ya esta registrado en la BD`);
    }
}

const validarPerfilSubMenu = async (valor, { req }) => {
    const idPerfil = req.body.idPerfil;
    const idSubMenu = req.body.idSubMenu;
    const validar = await PerfilSubMenu.findOne({
        where: {
            idPerfil,
            idSubMenu
        }
    })
    if (validar) {
        throw new Error(`El perfil ya esta asociado a un submenu`);
    }
}

const validarExistePerfilSubMenu = async (valor, { req }) => {
    const idPerfil = req.body.idPerfil;
    const idSubMenu = req.body.idSubMenu;
    const id = req.params.id
    const validar = await PerfilSubMenu.findOne({
        where: {
            idPerfil,
            idSubMenu,
            idPerSubMenu: { [Op.ne]: id }
        }
    })
    if (validar) {
        throw new Error(`El perfil ya esta asociado a un submenu`);
    }
}

const validarNombreArea = async (nombre = '') => {
    const existeArea = await Area.findOne({
        where: {
            nombre: `${nombre.toUpperCase()}`,
        },
    });
    if (existeArea) {
        throw new Error(`El nombre ${nombre} ya está registrado en la BD`);
    }
};

const validarSiglaArea = async (sigla = '') => {
    const existeArea = await Area.findOne({
        where: {
            sigla: `${sigla.toUpperCase()}`,
        },
    });
    if (existeArea) {
        throw new Error(`La sigla ${sigla} ya está registrado en la BD`);
    }
};

const validarDescripcionCargo = async (descripcion = '') => {
    const existeCargo = await Cargo.findOne({
        where: {
            descripcion: `${descripcion.toUpperCase()}`,
        },
    });
    if (existeCargo) {
        throw new Error(`El Cargo ${descripcion} ya está registrado en la BD`);
    }
};

const validarDescripcionTipodocumento = async (descripcion = '') => {
    const existeTipodocumento = await Tipodocumento.findOne({
        where: {
            descripcion: `${descripcion.toUpperCase()}`,
        },
    });
    if (existeTipodocumento) {
        throw new Error(
            `El Tipo documento ${descripcion} ya está registrado en la BD`
        );
    }
};

const validarDniPersonal = async (dni = '') => {
    const existePersonal = await Personal.findOne({
        where: {
            dni: `${dni.toUpperCase()}`,
        },
    });
    if (existePersonal) {
        throw new Error(`El dni ${dni} ya está registrado en la BD`);
    }
};

const validarNombrePersonal = async (nombre = '') => {
    const existePersonal = await Personal.findOne({
        where: {
            nombre: `${nombre.toUpperCase()}`,
        },
    });
    if (existePersonal) {
        throw new Error(`El nombre ${nombre} ya está registrado en la BD`);
    }
};

const validarApellidoPersonal = async (apellido = '') => {
    const existePersonal = await Personal.findOne({
        where: {
            apellido: `${apellido.toUpperCase()}`,
        },
    });
    if (existePersonal) {
        throw new Error(`El apellido ${apellido} ya está registrado en la BD`);
    }
};

const validarEscalafonPersonal = async (escalafon = '') => {
    const existePersonal = await Personal.findOne({
        where: {
            escalafon: `${escalafon.toUpperCase()}`,
        },
    });
    if (existePersonal) {
        throw new Error(`El escalafon ${escalafon} ya está registrado en la BD`);
    }
};

const validarUsuarioAdministrador = async (usuario = '') => {
    const existeAdministrador = await Administrador.findOne({
        where: {
            usuario: `${usuario.toUpperCase()}`,
        },
    });
    if (existeAdministrador) {
        throw new Error(`El usuario ${usuario} ya está registrado en la BD`);
    }
};

const validarNombreSede = async (nombre = '') => {
    const existeSede = await Sede.findOne({
        where: {
            nombre: `${nombre.toUpperCase()}`,
        },
    });
    if (existeSede) {
        throw new Error(
            `La Sede ${nombre} ya está registrado en la BD`
        );
    }
};

const validarNombreOrgano = async (nombre = '') => {
    const existeSede = await Sede.findOne({
        where: {
            nombre: `${nombre.toUpperCase()}`,
        },
    });
    if (existeSede) {
        throw new Error(
            `El organo ${nombre} ya está registrado en la BD`
        );
    }
};

const validarNombreUnidadOrganica = async (nombre = '') => {
    const existeSede = await Sede.findOne({
        where: {
            nombre: `${nombre.toUpperCase()}`,
        },
    });
    if (existeSede) {
        throw new Error(
            `La Unidad Organica ${nombre} ya está registrado en la BD`
        );
    }
};

const validarNombreTipoLicencia = async (nombre = '') => {
    const existeTipoLicencia = await TipoLicencia.findOne({
        where: {
            nombre: `${nombre.toUpperCase()}`,
        },
    });
    if (existeTipoLicencia) {
        throw new Error(
            `El Tipo Licencia ${nombre} ya está registrado en la BD`
        );
    }
};

const validarNombreDetalleLicencia = async (nombre = '') => {
    const existeDetalleLicencia = await DetalleLicencia.findOne({
        where: {
            nombre: `${nombre.toUpperCase()}`,
        },
    });
    if (existeDetalleLicencia) {
        throw new Error(
            `El Detalle Licencia ${nombre} ya está registrado en la BD`
        );
    }
}

module.exports = {
    validarNombrePerfil,
    validarExisteNombrePerfil,
    validarUsuario,
    validarExistUsuario,
    validarNombreCompleto,
    validarExistNombreCompleto,
    validarNombreMenu,
    validarTituloMenu,
    validarNombreExisteMenu,
    validarTituloExisteMenu,
    validarNombreSubMenu,
    validarTituloSubMenu,
    validarNombreExisteSubMenu,
    validarTituloExisteSubMenu,
    validarPerfilSubMenu,
    validarExistePerfilSubMenu,
    validarNombreArea,
    validarSiglaArea,
    validarDescripcionCargo,
    validarDescripcionTipodocumento,
    validarDniPersonal,
    validarNombrePersonal,
    validarApellidoPersonal,
    validarEscalafonPersonal,
    validarUsuarioAdministrador,
    validarNombreArea,
    validarNombreSede,
    validarNombreOrgano,
    validarNombreUnidadOrganica,
    validarNombreTipoLicencia,
    validarNombreDetalleLicencia
}