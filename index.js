const express = require('express');
const app = express();
app.listen(3000,()=>{console.log('Servidor corrriendo en puerto' + 3000);})

require('dotenv').config(); 
const{dbConnection} = require('mongodb://localhost:27017/APIDB'); 

corriendo = app.listen(process.env.PORT,()=>
{console.log('Servidor Corriendo en puerto' + process.env.PORT);});

const cors = require('cors'); 
app.use(cors());