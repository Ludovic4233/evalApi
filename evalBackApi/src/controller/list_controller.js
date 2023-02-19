//constante qui contient l'export du module fs
const fs = require('fs');
//on met dans une constante le chemin menant au fichier data.json
const dataFile = "./src/model/data.json";


exports.createData = (request, response) => {
    //on lit le fichier data.json 
    fs.readFile(dataFile, (err, data) => {
        //si il y a un erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on récupère les données dans la constante existingData sous forme d'objet
            const existingData = JSON.parse(data);
            //si il n'y a pas de tableau list dans existingData
            if(!existingData.list){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas de list dans les données"
                })
                //sinon le tableau list existe
            }else{
                //si list ne contient pas de données
                if(existingData.list.length === 0){
                    //on ajoute dans list un objet avec un id = 1 et un name = body de la requète
                    existingData.list.push({
                        "id":1,
                        "name":request.body.name.toLowerCase()
                    })
                }else{
                    //on récupère dans la constante lastData le dernier objet du tableau list
                    const lastData = existingData.list.findLast(
                        (obj) => obj.id
                    )
                    //on ajoute dans list un objet avec un id = id du dernier objet de list + 1 et un name = body de la requète
                    existingData.list.push({
                        "id":lastData.id+1,
                        "name":request.body.name.toLowerCase()
                    })
                }
                // on réécrit les données misent à jour sous forme de chaine de caractère
                fs.writeFile(dataFile, JSON.stringify(existingData), (writeErr) => {
                    //si il ya une erreur lors de l'écriture des données
                    if(writeErr){
                        //on envoit une réponse avec un status 500 et un message d'erreur
                        response.status(500).json({
                            message: "Une erreur est survenue lors de l'écriture des données"
                        })
                    }else{
                        //on envoit une réponse avec un status 200 et un message confirmant la mise à jour de données
                        response.status(200).json({
                            message: "Les données ont été ajoutées avec succès"
                        })
                    }
                })
            }
        }
    })
}

exports.getAllData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile(dataFile, (err, data) =>{
        //si il y a une erreur lors de lecture du fichier
        if(err){
            //on envoit une réponse avec une status 500 et un message d'erreur
            response.status(500).json({
                message: "Une est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on récupère les données dans la constante existingData sous forme d'objet
            const existingData = JSON.parse(data);
            //si il n'y a pas de tableau list dans existingData
            if(!existingData.list){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas de list dans les données"
                })
                //sinon le tableau list existe
            }else{
                //on envoit une réponse avec un status 200 et toutes les données du tableau list
                response.status(200).json(existingData.list);
            }
        }
    })
}

exports.getDataById = (request, response) => {
    //on lit le fichier data.json
    fs.readFile(dataFile, (err, data) =>{
        //si il y a une erreur lors de lecture du fichier
        if(err){
            //on envoit une réponse avec une status 500 et un message d'erreur
            response.status(500).json({
                message: "Une est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
           //on récupère les données dans la constante existingData sous forme d'objet
           const existingData = JSON.parse(data);
           //si il n'y a pas de tableau list dans existingData
           if(!existingData.list){
               //on envoit une réponse avec un status 404 et un message d'erreur
               response.status(404).json({
                   message: "Pas de list dans les données"
               })
               //sinon le tableau list existe
           }else{
                //on cherche dans le tableau list l'objet dont l'id = l'id de la requète puis on le met dans la constante dataById
                const dataById = existingData.list.find(
                    (obj) => obj.id === parseInt(request.params.id)
                )
                //on envoit une réponse avec un status 200 et l'objet dont l'id = id de la requète
                response.status(200).json(dataById);
           } 
        }
    })
}

exports.getDataByName = (request, response) => {
    //on lit le fichier data.json
    fs.readFile(dataFile, (err, data) =>{
        //si il y a une erreur lors de lecture du fichier
        if(err){
            //on envoit une réponse avec une status 500 et un message d'erreur
            response.status(500).json({
                message: "Une est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
           //on récupère les données dans la constante existingData sous forme d'objet
           const existingData = JSON.parse(data);
           //si il n'y a pas de tableau list dans existingData
           if(!existingData.list){
               //on envoit une réponse avec un status 404 et un message d'erreur
               response.status(404).json({
                   message: "Pas de list dans les données"
               })
               //sinon le tableau list existe
           }else{
                //on cherche dans le tableau list l'objet dont le name = le name de la requète puis on le met dans la constante dataByName
                const dataByName = existingData.list.find(
                    (obj) => obj.name === request.params.name.toLowerCase()
                )
                //on envoit une réponse avec un status 200 et l'objet dont le name = le name de la requète
                response.status(200).json(dataByName);
           } 
        }
    })
}

exports.updateData = (request, response) => {
    //on lit le fichier data.json 
    fs.readFile(dataFile, (err, data) => {
        //si il y a un erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on récupère les données dans la constante existingData sous forme d'objet
            const existingData = JSON.parse(data);
            //si il n'y a pas de tableau list dans existingData
            if(!existingData.list){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas de list dans les données"
                })
                //sinon le tableau list existe
            }else{
                //on récupère dans le tableau list l'objet dont l'id = l'id de la requète et on le met dans la constante dataById
                const dataById = existingData.list.find(
                    (obj) => obj.id === parseInt(request.params.id)
                )
                //on assigne au name de cet objet le name de la requète du body
                dataById.name = request.body.name.toLowerCase()
                //on écrit le données misent à jour dans le fichier data.json
                fs.writeFile(dataFile, JSON.stringify(existingData), (writeErr) => {
                    //si il y a une erreur lors de l'écriture du fichier
                    if(writeErr){
                        //on envoit une réponse avec un status 500 et un message d'erreur
                        response.status(500).json({
                            message: "Une erreur est survenue lors de l'écriture des données"
                        })
                    }else{
                        //on envoit une réponse avec un status 200 et un message confirmant la mise à jour de données
                        response.status(200).json({
                            message: "Les données ont été misent à jour avec succès"
                        }) 
                    }
                })
            }
        }    
    })    
}

exports.deleteDataById = (request, response) => {
    //on lit le fichier data.json 
    fs.readFile(dataFile, (err, data) => {
        //si il y a un erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on récupère les données dans la constante existingData sous forme d'objet
            const existingData = JSON.parse(data);
            //si il n'y a pas de tableau list dans existingData
            if(!existingData.list){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas de list dans les données"
                })
                //sinon le tableau list existe
            }else{
                //on assigne au tableau list tous les objets dont l'id est différent de l'id de la requète
                existingData.list = existingData.list.filter(
                    (obj) => obj.id != parseInt(request.params.id)
                )
                //on écrit le données misent à jour dans le fichier data.json
                fs.writeFile(dataFile, JSON.stringify(existingData), (writeErr) => {
                    //si il y a une erreur lors de l'écriture du fichier
                    if(writeErr){
                        //on envoit une réponse avec un status 500 et un message d'erreur
                        response.status(500).json({
                            message: "Une erreur est survenue lors de l'écriture des données"
                        })
                    }else{
                        //on envoit une réponse avec un status 200 et un message confirmant la mise à jour de données
                        response.status(200).json({
                            message: "Les données ont été supprimer avec succès"
                        }) 
                    }
                })
            }
        }
    })    
}