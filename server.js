const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/.env` });

mongoose.connect(process.env.CONNECTIONSTRING,(err,connected)=>{
    if(err){
        // console.log("Error: "+err);
        return;
    }else{
        console.log("db Connected Successfully");
    }
});