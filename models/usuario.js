const db = require('../config/db')

const Usuario = db.sequelize.define('usuarios', {
    idUsuarios: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nomeUsuario: {
        type: db.Sequelize.STRING,
        allowNull: false
    }, 

    emailUsuario: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    senhaUsuario: {
        type: db.Sequelize.STRING,
        allowNull: false
    },

    createdAt: {
        field: 'created_at',
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.NOW
    },

    updatedAt: {
        field: 'updated_at',
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.NOW
    },

})

//Usuario.sync({force: true});

module.exports = Usuario;