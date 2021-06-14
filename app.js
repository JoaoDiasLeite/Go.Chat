const express = require('express');
const app = express();
const session = require('express-session')
const routes = require('./routes');
const ErrorsHandler = require('./utils/error/errors-handler');



const port = process.env.PORT || 8080;
let session_key = process.env.SESSION_KEY;


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: false
}));

app.use('/', routes);


app.use(function(req, res) {
    const err = "404 Route Not Found";

    res.status(404).end(err);
});

app.use(ErrorsHandler);

app.listen(port, function() {
    console.log(`Running on port ${port}`);
});

module.exports = app;