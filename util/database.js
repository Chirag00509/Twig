const Sequelize = require('sequelize');

const sequelize = new Sequelize('signup','root','',{
    dialect : 'mysql',
    host : 'localhost'
});

sequelize.authenticate().then((err) => {
    if(err){
        console.log('Unable to connect to the database:', err)
    }
    console.log('Connection has been established successfully.')
});

module.exports = sequelize;