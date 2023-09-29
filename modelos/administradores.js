import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/APIDB";

const client = new MongoClient(uri);


async function run () {
    try { 
        const database = client.db("APIDB");
        const users = database.collection("users");
        const estimate = await users.estimatedDocumentCount();
        console.log(estimate);

    }

    finally { 
        await client.close();
    }
}

run().catch(console.dir);


const express = require('express');
const router = express.Router();




function isAdmin(req, res, next) {

  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
}


router.post('/productos', isAdmin, (req, res) => {

});


router.get('/productos', isAdmin, (req, res) => {
  
});


router.get('/productos/:id', isAdmin, (req, res) => {
  const productId = req.params.id;
  
});


router.put('/productos/:id', isAdmin, (req, res) => {
  const productId = req.params.id;

});


router.delete('/productos/:id', isAdmin, (req, res) => {
  const productId = req.params.id;
  
});

module.exports = router;

console.log('Registro con exito');