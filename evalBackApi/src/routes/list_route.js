const express = require('express');
const router = express.Router();
const listController = require('../controller/list_controller');

//c'est la route permettant d'ajouter des données dans le tableau list
// POST: "/list"
// Ex: http://localhost:3000/list
router.post("/list", listController.createData);

//c'est la route permettant d'afficher toutes les données
// GET: "/list"
//Ex: http://localhost:3000/list
router.get("/list", listController.getAllData);

//c'est la route permettant d'afficher toutes les données du tableau list en cherchant par id
// GET: "/list/:id"
//Ex: http://localhost:3000/list/1
router.get("/list/:id", listController.getDataById);

//c'est la route permettant d'afficher toutes les données du tableau list en cherchant par name
// GET: "/list/search/:name"
//Ex: http://localhost:3000/list/search/1
router.get("/list/search/:name", listController.getDataByName);

//c'est la route permettant de modifier une donnée du tableau list en la cherchant par son id
// PUT: "/list/:id"
//Ex: http://localhost:3000/list/2
router.put("/list/:id", listController.updateData);

//c'est la route permettant de supprimer une donnée du tableau list en la cherchant par son id
// DELETE: "/list/:id"
//Ex: http://localhost:3000/list/3
router.delete("/list/:id", listController.deleteDataById);

//export de la constante router por qu'elle soit utilisable dans d'autres parties du code
module.exports = router;