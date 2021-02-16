const Sequelize = require('sequelize');
const pg = require('pg')

const sequelize = new Sequelize('postgres', 'postgres', 'Cpf52355271860', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})

sequelize.authenticate().then(() => {
    console.log('conectado ao postgres')
}).catch((err) => {
    console.log('ocorreu um erro ao se conectar com o banco' +err);
})


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}