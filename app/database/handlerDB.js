const {execute} = require('./connection-db-echo')


const  handlerDB = {
    insert: (data, table)=>{

        return new Promise((resolve,reject)=>{
            execute(
                `INSERT INTO  ${table} SET ?`, data, (err, res)=>{
                    if (err) reject(err)
                    resolve(res)
            })
        })
    },
    delete : (data, table)=>{
        return new Promise((resolve,reject)=>{
            execute(
                `DELETE FROM ${table} WHERE ?`, data, (err, res)=>{
                    if (err) reject(err)
                    resolve(res)
            })
        })
    },
    update : (data, where,table)=>{
        return new Promise((resolve,reject)=>{
            execute(
                `UPDATE ${table} SET ? WHERE ?`, [data,where], (err, res)=>{
                    if (err) reject(err)
                    resolve(res)
            })
        })
    },
    select : (where)=>{
        return new Promise((resolve,reject)=>{
            execute(
                `SELECT FROM ${table} WHERE ?`, data, (err, res)=>{
                    if (err) reject(err)
                    resolve(res)
            })
        })
    },
    checkPerm:(staffId,perm="mute")=>{
        return new Promise((resolve,reject)=>{
            const capProc = perm.slice(0,1) + perm.slice(1)
            execute(`call checkPerm${capProc}(?)`,[staffId],(err,res)=>{
                if(err) reject(err)
                const resTreated=res[0][0].res==0 ? false : true
                //console.log({checkperm: resTreated})
                resolve(resTreated)
    
            })
        })
    },
    checkBe:(discord_id,perm="mute")=>{
        return new Promise((resolve,reject)=>{
            const capProc = perm.slice(0,1) + perm.slice(1)
            execute(`call checkBe${capProc}(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                const resTreated = (res[0][0].canBe == 1) ? true : false
                //console.log({checkBe: resTreated})
                resolve(resTreated)
    
            })
        })
    },
    countCommand:(discord_id,command='mute')=>{
        return new Promise((resolve,reject)=>{
            
            execute(`call countCommand(?,?)`,[discord_id, command],(err,res)=>{
                if(err) reject(err)
                resolve({total: res[0][0].total})
    
            })
        })
    },
    isPunish:(discord_id,typePunish)=>{
        return new Promise((resolve,reject)=>{
            
            execute(`call checkPunish(?,?)`,[discord_id,typePunish],(err,res)=>{
                if(err) reject(err)
                resolve (  res[0][0].checkPunish==1 ? true : false)
            })
        })
    },
    insertPunish: (discord_id, typeBan, reason, victim,time)=>{
        return new Promise((resolve,reject)=>{
            execute(`call insertPunish(?,?,?,?,?)`,[discord_id,typeBan,reason,victim,time],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    insertForgiven: (victim,discord_mod_id,punish,reason)=>{
        return new Promise((resolve,reject)=>{
            execute(`call insertForgive(?,?,?,?)`,[victim,discord_mod_id,punish,reason],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    insertHour: (discord_id,channel_id_old, channel_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call insertHour(?,?,?)`,[discord_id,channel_id_old,channel_id],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    insertStaff: (discord_id,discord_mod_id, role )=>{
        return new Promise((resolve,reject)=>{
            execute(`call insertStaff(?,?,?)`,[discord_id,discord_mod_id, role],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    removeStaff: (discord_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call removeStaff(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    startMov: (discord_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call startMov(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    endMov: (discord_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call endMov(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    removeMov: (discord_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call removeMov(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    countMov: (discord_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call countMov(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    rankedMov: (discord_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call getRankedMov()`,(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    cancelMov: (discord_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call cancelMov(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    messageLog: (discord_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call insertLogMessage(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    rankedPoint: ()=>{
        return new Promise((resolve,reject)=>{
            execute(`call getRankedPoints()`,(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    rankedPointById: (discord_id)=>{
        return new Promise((resolve,reject)=>{
            execute(`call getRankedPointById(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                //console.log(res)
                resolve(res)
            })
        })
    },
    callProcedure: (name )=>{
        return new Promise((resolve,reject)=>{
            execute(`call ${name}()`,(err,res)=>{
                if(err) reject(err)
                resolve(res[0])
            })
        })
    },
    insertGuest: (staffId, guest )=>{
        return new Promise((resolve,reject)=>{
            execute(`call insertGuest(?,?)`,[staffId,guest],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    insertVIP: (discord_id,role_id,days, channelId )=>{
        return new Promise((resolve,reject)=>{
            execute(`call insertVIP(?,?,?,?)`,[discord_id,role_id, days, channelId],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    checkVIP: ()=>{
        return new Promise((resolve,reject)=>{
            execute(`call checkVIP()`,(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    getVIP: (discord_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call getVIP(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    removeVIP: (discord_id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call removeVIP(?)`,[discord_id],(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    },
    callProcedureId: (name,id )=>{
        return new Promise((resolve,reject)=>{
            execute(`call ${name}(?)`,[id],(err,res)=>{
                if(err) reject(err)
                resolve(res[0][0])
            })
        })
    },


}




module.exports = handlerDB
    