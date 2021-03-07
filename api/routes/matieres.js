let Matiere = require("../model/matiere");


// Récupérer un assignment par son login (GET)
function getMatieres(req, res) {
  
    Matiere.find({}, (err, matiere) => {
      if (err) {
        res.send(err);
      }
      res.json(matiere);
    });
  }
  
  module.exports = {
    getMatieres,
  };