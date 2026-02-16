const express=require('express');
const readfile = require('./modules/fileHandler');
const app=express();
app.get('/',(req,res)=>{
    console.log(readfile());
    
})
const port=3000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})


