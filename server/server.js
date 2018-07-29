const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, '../public/');
const PORT = process.env.port || 3000;

app.use(express.static(publicPath));

app.listen(PORT,()=>{
    console.log('connected to app succesfully')
});