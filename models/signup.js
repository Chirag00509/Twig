const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../util/database');
const saltRounds = 10;

const Signup = sequelize.define('data', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
},
    {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt =  bcrypt.genSaltSync(saltRounds);
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        }
    }
);

module.exports = Signup;