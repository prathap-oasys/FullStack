

const express=require('express');
const mysql=require('mysql2');
const bodyParser = require('body-parser');
const cors=require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());

const port=3000;

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'student',
    port:'3306'
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("DataBase Connected SuccessFully");
    }
});


app.post('/post',(req,res)=>{

    const {name,mail,age,gender}=req.body;

    db.query('insert into student (name,mail,age,gender) values (?,?,?,?)',[name,mail,age,gender],(error,result,field)=>{
        if(error){
            console.log("Data Post Error");
            res.status(500).send("Error Posting Data");
        }else{
            console.log("Post Data Success");
            res.status(200).send(req.body);
        }
    })

})








app.listen(port,()=>{console.log("App listening ",port)});





