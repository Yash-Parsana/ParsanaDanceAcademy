const express=require('express');
const path=require('path');
const fs=require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser')
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    gender: String,
    age:String
    

});
  
const contact = mongoose.model('contact', contactschema);

app.use('/static',express.static('static'));
// app.use(express.urlencoded());


app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
});
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});
app.post('/contact', (req, res) => {
    var mydata = new contact(req.body);   
    if (req.body.gender == "on") {
        mydata.gender = "male";
    }
    else mydata.gender = "female";
    
    mydata.save().then(() => {
        res.send("your form has been submited");
    }).catch(() => {
        res.status(400).send("Your form was not saved.")
    });
});
app.get('/about',(req,res)=>{
    res.status(200).render('about.pug');
});
app.get('/services',(req,res)=>{
    res.status(200).render('services.pug');
});
app.get('/classinfo',(req,res)=>{
    res.status(200).render('classinfo.pug');
});
app.listen(port,()=>{
    console.log("started.......");
});
