const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./database/database-config');
const MasterEnum = require('./config/index');
const errorHandler = require('./error-handler/error');
const routes = require('./routes/index');
var cors = require('cors')
var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//connect database
connectDB();

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.get('/', (req, res) => {
  return res.status(200).send({ 'message': `Node 🙌 server is running in ${MasterEnum.ENVIRONMENT} Mode` });
});

app.use(errorHandler);

const server = require('http').createServer(app);

server.listen(MasterEnum.PORT, () => {
  console.log(`Node 🙌 server is running on port ${MasterEnum.PORT} & ${MasterEnum.ENVIRONMENT} Mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
});


module.exports = app;
