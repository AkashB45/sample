const fs = require('fs')
const fspromise = require('fs').promises
const {format} = require('date-fns')
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const logEvents = async(message)=>{
    const date = `${format(new Date(),'dd/MM/yyyy\tHH:mm:ss')}`;
    const logmsg = `${date}\t ${uuidv4()}\t${message}\n`;
    if(!fs.existsSync(path.join(__dirname,'..','logfiles')))
        {
           await fspromise.mkdir(path.join(__dirname,'..','logfiles'))
        }
        await fspromise.appendFile(path.join(__dirname,'..','logfiles','logs.txt'),logmsg);
}
console.log("Akash");
module.exports = {logEvents}