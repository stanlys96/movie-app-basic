const { ProductionHouse, Movie } = require('../models/index');

class Controller {
  static showHomePage(req, res) {
    res.render('homepage');
  }

  static showProductionHousePage(req, res) {
    ProductionHouse
      .findAll({
        order: [
          ['name_prodHouse', 'ASC']
        ]
      })
      .then(productionHouses => {
        res.render('productionHouse', { productionHouses });
      })
      .catch(err => {
        res.send(err);
      })
  }

  static showMoviesPage(req, res) {
    Movie
      .findAll({
        order: [
          ['released_year', 'DESC']
        ],
        include: [ProductionHouse]
      })
      .then(movies => {
        res.render('movies', { movies });
      })
      .catch(err => {
        res.send(err);
      })
  }

  static addMoviesPage(req, res) {
    res.render('addMovies');
  }

  static addMoviesPagePost(req, res) {
    let { name, released_year, genre } = req.body;
    let newMovie = {
      name,
      released_year: +released_year,
      genre
    }
    Movie
      .create(newMovie)
      .then(() => {
        res.redirect('/movies');
      })
      .catch(err => {
        res.send(err);
      })
  }

  static editGetPage(req, res) {
    let id = +req.params.id;
    ProductionHouse
      .findAll({
        order: [
          ['name_prodHouse', 'ASC']
        ]
      })
      .then(productionHouses => {
        Movie
          .findOne({
            where: {
              id
            }
          })
          .then(movie => {
            res.render('editMovie', { movie, productionHouses });
          })
          .catch(err => {
            res.send(err);
          })
      })
      .catch(err => {
        res.send(err);
      })
  }

  static editPostPage(req, res) {
    let id = +req.params.id;
    let { name, released_year, genre, ProductionHouseId } = req.body;
    Movie
      .update({
        name: name,
        released_year: released_year,
        genre,
        ProductionHouseId: ProductionHouseId
      }, {
        where: {
          id: id
        }
      })
      .then(() => {
        res.redirect('/movies');
      })
      .catch(err => {
        res.send(err);
      })
  }

  static deleteMovie(req, res) {
    let id = +req.params.id;
    Movie
      .destroy({
        where: {
          id
        }
      })
      .then(() => {
        res.redirect('/movies');
      })
      .catch(err => {
        res.send(err);
      })
  }
}

module.exports = Controller;