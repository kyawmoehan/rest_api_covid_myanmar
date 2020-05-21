const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const myanmarRoutes = require('./api/routes/myanmar');
const regionsRoutes = require('./api/routes/regions');
const userRoutes = require('./api/routes/user');

const app = new express();
const PORT = process.env.PORT || 3000;

// connect mongodb
//mongo "mongodb+srv://myanmarcovid-fipgj.mongodb.net/test" --username myanmarcovid_api
mongoose.connect('mongodb+srv://myanmarcovid_api:myanmarcovid_12345@myanmarcovid-fipgj.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// logging req
app.use(morgan('dev'));     

// handle json
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// handle cors
app.use(cors())

// myanmar routes
app.use('/api/myanmar', myanmarRoutes);

// regions routes
app.use('/api/myanmar/regions', regionsRoutes);

// user routes
app.use('/user', userRoutes);

// error handling for not valid routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

// port
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Server running on port ${PORT}`);
});