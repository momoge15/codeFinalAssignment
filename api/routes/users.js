let User = require("../model/user");

/*
// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}
*/
// AVEC PAGINATION
function getUsers(req, res) {
  var aggregateQuery = User.aggregate();
  User.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, users) => {
      if (err) {
        res.send(err);
      }

      res.send(users);
    }
  );
}



// Récupérer un assignment par son login (GET)
function getUser(req, res) {
  let userLogin = req.params.login;

  User.find({ login:userLogin }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
}

module.exports = {
  getUsers,
  getUser,
};
