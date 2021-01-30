const express = require('express');
const Controller = require('./controllers/Controller')

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', Controller.showHomePage);

app.get('/productionhouses', Controller.showProductionHousePage);

app.get('/movies', Controller.showMoviesPage);

app.get('/addMovies', Controller.addMoviesPage);

app.post('/addMovies', Controller.addMoviesPagePost);

app.get('/movies/:id/edit', Controller.editGetPage);

app.post('/movies/:id/edit', Controller.editPostPage);

app.get('/movies/:id/delete', Controller.deleteMovie);

app.listen(port, () => {
  console.log(`Listening on port: ${port}...`);
})