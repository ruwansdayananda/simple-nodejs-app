const express = require('express');
const mongoose =  require('mongoose');

// DB config
const mongodb = require('./config/keys').mongoURI;

// mongdb connect
mongoose.connect(mongodb)
.then(()=>console.log("mongdb Connected"))
.catch((err)=>console.log("Err connecting mongodb:",err))


const app = express();
app.get('/',(req,res)=>res.send('Hello world Steffy ann john'));

const port = process.env.PORT || 4000;

app.listen(port,()=>console.log("App listening at port:",port))
