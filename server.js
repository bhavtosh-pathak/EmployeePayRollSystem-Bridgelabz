const express=require('express');
const fs=require('fs');
const readfile = require('./modules/fileHandler');
const app=express();
app.use(express.static('public'));
app.set("view engine","ejs");
app.get('/',(req,res)=>{
    fs.readFile('./modules/employees.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }
        const employees=JSON.parse(data);
        res.render('index',{employees});
    })
})
const port=3000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})


