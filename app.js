//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
var encrypt = require('mongoose-encryption');
const app = express();
const port =3000;
const uri = "mongodb://localhost:27017/Secertsdata";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const secert="this is omy secert"

userSchema.plugin(encrypt, {secret:secert, encryptedFields: ['password'] });

const User =  mongoose.model('Userdata',userSchema);

app.get("/",function (req,res){
res.render('home')
})
app.get("/",function (req,res){
    res.render('home')
    })

    app.get("/login",function (req,res){
        res.render('login')
        })

        app.get("/register",function (req,res){
            res.render('register')
            })

         app.post("/register",function (req,res){
            const username = req.body.username;
            const password = req.body.password;
             const user = new User({
                username:username,
                password:password
             });
 try{
    user.save();
    res.render('secrets');
 }catch(err){
    console.log(err);
 }

        })  ;

        app.get("/logout",function(req,res){
            res.render('home');
        });
        app.get("/submit",function (req,res){
 res.render("submit");
        });

        app.post("/login",async function(req,res){
            const username = req.body.username;
            const password = req.body.password;
 try{
    const founduser = await User.findOne({username:username});
    if(founduser){
        if(founduser.password === password){
            res.render('secrets');
    }
 }}catch(err){
    console.log(err);
   res.redirect("/login")
 }



        })

app.listen(port,()=>{
console.log(`Succesfully port on ${port}`);
})