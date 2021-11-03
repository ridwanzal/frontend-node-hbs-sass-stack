const fs = require('fs');
const axios = require('axios');
const express = require('express');
const path = require("path");
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '/public/')));
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

var menuPaths = 
  [{ title: 'Home', path: '/'}, 
    {title: 'About', path: '/about'},
    {title: 'Gallery', path: '/gallery'},
    {title: 'Contact', path: '/contact'}, 
  ];

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Datawarehouse',
    pathToRender : 'homepage',
    menu: menuPaths
  });
});

app.get('/about', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'About page',
    pathToRender: 'about',
    menu: menuPaths
  });
});


app.listen(port, () => {console.log(`App running on http://localhost:${port}`)});
