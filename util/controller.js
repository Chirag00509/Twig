const signup = require('../models/signup');

async function insertData(username, email, password){
    await signup.create({username, email, password});
}
async function getPassword(username) {

 
    const password = await signup.findOne({ where: { username } });      
     return password;
}    

module.exports = { insertData, getPassword };