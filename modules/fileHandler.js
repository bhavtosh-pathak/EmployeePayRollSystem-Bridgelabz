
const fs=require('fs');
function readfile(){
     fs.readFile('modules/employees.json',"utf-8",(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
})
}
module.exports=readfile;