const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/new',(req,res)=>{
    res.send("Hi Iam Akashhuuu");
})
router.get('^/$|index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..',"index.html"));
})
router.get('/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..',"new-page.html"));
})
router.get('/old-page(.html)?',(req,res)=>{
    res.status(302).redirect('new-page.html');
})

module.exports = router