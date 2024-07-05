const express = require('express')
const app = express()
const path = require('path');
const { nextTick } = require('process');
const {errorHandles} = require(path.join(__dirname,'middleware','errorhandler.js'))
const cors = require('cors')
const {logEvents} = require(path.join(__dirname,'middleware','logs.js'))
const port = process.env.PORT || 3500;
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/database_name'
).then(()=>{
console.log('db connected successfully ')
}).catch(error=>{
 console.log('db connect time error', error)
})
const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions ={
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin) !== -1 || !origin){
                callback(null, true)
            }
        else
        {
            callback(new Error("CORS not allowed"));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path}`);
    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`)
    next()
})
app.use('/',express.static(path.join(__dirname,"public")))
app.use('/subdir',express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'))
app.use('/employee',require('./api/employee'))

// const first = (req,res,next)=>{
//     console.log('first');
//     next();
// }
// const second = (req,res,next)=>{
//     console.log('second');
//     next();
// }
// const third = (req,res)=>{
//     console.log('third');
//     res.send('terminated');
// }
// app.get('/fst',[first,second,third])
 
app.all('/*',(req,res)=>{
    res.status(404);
    if(req.accepts('html'))
        {
        res.sendFile(path.join(__dirname,"404.html"));}
        
    else if(req.accepts('json'))
        res.json({"error":"404 Not found"})
    else{
        res.type('text').send('404 not found')
    }
})
app.use(errorHandles)
app.listen(port,()=>{console.log(`server start in port ${port}`)})