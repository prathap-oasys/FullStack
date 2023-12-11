const express=require('express');
const bodyParser=require('body-parser');
const db=require('mongoose');

const cors=require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());

db.connect('mongodb://localhost:27017/Students',({family:4}));


db.connection.on('error',console.error.bind(console,'error While Connecting Db'));

db.connection.once('open',()=>{
    console.log("DB connected");
})

const Student=db.model('stu',new db.Schema({
 
    name:String,
    mail:String,
    age:Number,
    gender:String

}));

app.post('/post',async(req,res)=>{

  console.log(req.body);

    const student=await new Student(req.body).save();
    res.send(student);

});

app.get('/getAll',async(req,res)=>{

    const stu=await Student.find();
    res.send(stu);

});
app.get('/getByName/:id',async(req,res)=>{

    const {id}=req.params;

    const stu=await Student.findOne({_id:id});
    res.send(stu);

});

app.put('/update/:id',async(req,res)=>{
    const {id}=req.params;

    const{name,age,mail,gender}=req.body;
  

   // const stu=await Student.updateOne({name:name},{$set:{age:req.body.age,mail:req.body.mail,gender:req.body.gender}});
   const stu=await Student.updateOne({_id:id},{$set:{name:name,age:age,mail:mail,gender:gender}});

    res.send(stu);

})

app.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params;

    const stu=await Student.deleteOne({_id:id});

    res.send(stu);



})



app.listen(3000);