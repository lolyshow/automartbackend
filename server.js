const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/.env` });
const app = express();
app.use(express.json());
const AppRoute = require('./src/Routes/AppRoutes');
mongoose.connect(process.env.CONNECTIONSTRING,(err,connected)=>{
    if(err){
        // console.log("Error: "+err);
        return;
    }else{
        console.log("db Connected Successfully");
    }
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use("/image", express.static("src/public/storage/"));
app.post("/upload-image", (req, res) => {
        console.log(req.body.filename);
        return res.status(201)
        .json({ url: "http://localhost:5000/image/" + "image_1652422936586avatar2.jpg" });
});
app.use("/api/app",AppRoute);
const listener = app.listen(process.env.PORT || 3000,() => {
    console.log('App is listening on port' +listener.address().port);
})
