const express = require('express');
require('./config/connect.js');


const heroRoute = require('./routes/hero.js');

const app = express();

app.use(express.json());


app.use('/hero', heroRoute);

app.listen(  3000 , ()=>{

    console.log('serveur work !');
    
})