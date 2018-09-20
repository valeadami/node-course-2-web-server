const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8000; 
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  //console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

//app.use((req, res, next) => {
  //res.render('maintenance.hbs');
  //manca next per cui nn viene eseguito nulla dopo questa pagina!!!
//});



hbs.registerHelper('getCurrentYear', () => {
  //return 'test';
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
    res.send({
      errorMessage: 'Unable to handle request'
    });
});

    
    
//bisogna metter in ascolto il server sulla porta indicata per intercettare richieste
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});