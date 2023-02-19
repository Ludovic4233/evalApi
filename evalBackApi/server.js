const app = require("./app");

const port = 3000;

app.listen(port, () => {
    console.log("l'application tourne sur le port: "+port);
});