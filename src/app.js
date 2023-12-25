const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./database/models');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const paginate = require('express-paginate');

const indexRouter = require('./routes/index.routes');
const usersRouter = require('./routes/users.routes');
const productsRouter = require('./routes/products.routes');
const apisRouter = require('./routes/api.routes');

const userSessionCheck = require('./middlewares/userSessionCheck');
const cookieCheck = require('./middlewares/cookieCheck');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(methodOverride('_method'));
app.use(
    session({
        secret: 'artesphera',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieCheck);
app.use(userSessionCheck);

app.use(paginate.middleware(9, 50));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api', apisRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    db.Category.findAll()
        .then((categories) => {
            return res.render('404', {
                categories,
            });
        })
        .catch((error) => {
            console.error(error);
        });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
