const express = require('express')
const router = express.Router()
const path = require('path');

console.log('subdir')
router.get('^/$|index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','subdir','sub.html'));
})

module.exports = router