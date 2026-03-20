const express=require('express');
const fs=require('fs');
const readfile = require('./modules/fileHandler');
const app=express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
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
app.get('/add',(req,res)=>{
    res.render("add");
})
app.post('/employee/add',(req,res)=>{
    const form=req.body;  
    fs.readFile('./modules/employees.json',"utf-8",(err,data)=>{
        if(err) console.log(err);
        let employees=JSON.parse(data);
        employees.push(form);
        fs.writeFile("./modules/employees.json",JSON.stringify(employees,null,2),(err)=>{
            if(err) return err;
            res.redirect('/');
        })
    })
})
app.post('/employee/delete/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('./modules/employees.json', 'utf-8', (err, data) => {
        if (err) return console.log(err);` `
        let employees = JSON.parse(data);

        
        employees = employees.filter(emp => emp.id != id);

        fs.writeFile('./modules/employees.json', JSON.stringify(employees, null, 2), (err) => {
            if (err) return console.log(err);
            res.redirect('/');
        });
    });
});
app.post('/student/edit/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./modules/employees.json', 'utf-8', (err, data) => {
        if (err){
            console.log(err);
            return res.send("File read error");
        }
        const employees = JSON.parse(data);
        const student = employees.find(emp => emp.id == id);
        res.render('edit', { student });
    });
});

app.post('/student/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, salary } = req.body;

    fs.readFile('./modules/employees.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return res.send("File read error");
        }

        let employees = JSON.parse(data);

        // Update employee by id
        employees = employees.map(emp => {
            if (emp.id == id) {
                return {
                    ...emp,
                    name: name,
                    age: age,
                    branch: branch
                };
            }
            return emp;
        });

        fs.writeFile('./modules/employees.json', JSON.stringify(employees, null, 2), (err) => {
            if (err) {
                console.log(err);
                return res.send("File write error");
            }

            res.redirect('/');
        });
    });
});


const port=3000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})


