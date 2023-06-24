const express = require('express');   //using express as a server
const port =  8000;
const path = require('path');
const fs = require('fs');
const indexRoute = require('./routes/index.js');
const app = express(); 


// setting up view engine as ejs
app.set("view engine" ,"ejs")

// //setting path of views folder
app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded({extended: true})); 


//  //accesing static files from assets folder
app.use(express.static("assets"))

// //accesing uploaded files from uploads folder 
app.use('/uploads',express.static(__dirname+ '/uploads')) 

//ok ..ok

//setting index file for all the routes
app.use('/v1',indexRoute) 


app.listen(5000,function(err){
    if(err){
        console.log("Error in running express server",err);
        return;
    }
console.log("server running fine")

})