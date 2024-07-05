const {logEvents} = require('./logs')
const errorHandles = (err,req,res,next)=>{
    logEvents(`${err.name}:${err.message}`);
    console.log(`${err.name}:${err.message}`);
    res.status(500).send(err.message);
}

module.exports = {errorHandles}