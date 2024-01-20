// https://www.youtube.com/watch?v=zW_tZR0Ir3Q

// install express using npm install express
const express = require('express')
const blogRoutes = require('./routes/blogRoutes')

// third party middleware used to log requests  (logger)
const morgan = require('morgan')

const mongoose = require('mongoose')

const app = express();

app.use(morgan('dev'));

// express uses "public" folder to store static files. otherwise they wont be accessible
app.use(express.static('public'));

// this is impo to use form data.
app.use(express.urlencoded({extended: true}));

//connect to mongo db
const dbURI = 'mongodb+srv://avi_patil22:Pass1234@cluster0.avgzh2w.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((error) => console.log('error occured', error));


// install view engine ejs using npm install ejs
// register view engine 
app.set('view engine', 'ejs');

//by default view engine keep all views in 'views' folder

app.get('/',(req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html', { root: __dirname});
    res.render('about', {title: 'About Us'});
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname});
});

