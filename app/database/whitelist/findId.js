const {execute} = require('../connection')
const sendMessage = require('../../rawCommands/sendMessage')
const { channelGeneralLog, channelWhitelist, tableWL} = require('../../config.json')

const table = "whitelist"


const getId = function (id) { 
    return new Promise ((resolve, reject)=>{
        execute(
          `SELECT * FROM ${tableWL}  WHERE (id= ?)`, [id],(err, res)=>{
              if (err) reject(err)
              resolve(res)
             }
          )
    })
 }

    



module.exports = getId