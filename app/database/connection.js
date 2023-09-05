const mysql = require('mysql');
const erroHandler = require('./whitelist/errosHandler')
const { host, user, password, database } = require('../config.json')
const con = mysql.createConnection({
    host: host, // O host do banco. Ex: localhost
    user: user, // Um usuário do banco. Ex: user 
    password: password, // A senha do usuário. Ex: user123
    database: database // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
});

const  connect = ()=>{
    con.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...')
            throw new Error(err)
            
        }
        console.log('Connection with DB GTA RP established!')
    })
}

const execute = (query,payload,callback=erroHandler)=>{

    try { 
        con.query(query, payload, callback)
    } catch (error) {
        console.log(error)
    }
    // .end((err) => {
    //     if(err) {
    //         console.log('Erro to finish connection...', err)
    //         return 
    //     }
    //     console.log('The connection was finish...')
    // })
}

   


module.exports = {execute, connect}