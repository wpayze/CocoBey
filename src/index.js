const cors = require('cors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

/*const indexRoutes = require('./routes/index');*/
const toursRoutes = require('./routes/tours');

mongoose.connect('mongodb://localhost:27017/cocobey');

// Configuraciones
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
/*app.use(indexRoutes);*/
app.use('/api',toursRoutes);

//static files
app.use(express.static(path.join(__dirname, 'dist')));

//start server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});