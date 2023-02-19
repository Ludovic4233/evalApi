//constante qui contient l'export du module express
const express = require('express');
//constante qui contient la fonction express qui créé l'appli
const app = express();
//constante qui contient l'export du module body-parser
const bodyParser = require('body-parser');
//l'appli devra utiliser le body-parser
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())

//création de route par défault qui renvois une chaine de caractère
// GET "/"
// Ex: http://localhost:3000/
app.get('/', (request, response) => {
    response.send("Hello !")
})

//import des routes de l'application
const listRoutes = require('./src/routes/list_route');

//enregistrement des routes de l'appli
app.use(listRoutes);

//export de la constante app pour qu'elle soit utilisable dans d'autres partie du code
module.exports = app;