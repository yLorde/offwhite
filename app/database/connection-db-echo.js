const mysql = require('mysql');
const erroHandler = require('./whitelist/errosHandler')
const { hostDbEcho, userDbEcho, passwordDbEcho, databaseDbEcho } = require('../config.json');
const { ContextMenuInteraction } = require('discord.js');
const configuration={
    host: hostDbEcho, // O host do banco. Ex: localhost
    user: userDbEcho, // Um usuário do banco. Ex: user 
    password: passwordDbEcho, // A senha do usuário. Ex: user123
    database: databaseDbEcho // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
};

let connection;

    function handleDisconnect() {
        connection = mysql.createConnection(configuration);

        connection.connect(function(err) {
            if (err) {
            console.log("error when connecting to db:", err);
            setTimeout(handleDisconnect, 2000);
            }else{
                //console.log("Connection with DB ECHO established!");
            }
        });
        connection.on("error", function(err) {
            console.log("db error", err);
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleDisconnect();
            } else {
            //throw err;
            console.log(err)
            }
        });
    }


const  connect = ()=>{
    handleDisconnect();
    // con.connect((err) => {
    //     if (err) {
    //         console.log('Erro connecting to database ECHO...')
    //         throw new Error(err)
            
    //     }
    //     console.log('Connection with DB-ECHO established!')
    // })
}

const  execute = async(query,payload,callback=erroHandler)=>{
    
    try { 
        handleDisconnect();
        await connection.query(query, payload, callback)
    } catch (error) {
        console.log(error)
        connection.end()
    }finally{
        connection.end()
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