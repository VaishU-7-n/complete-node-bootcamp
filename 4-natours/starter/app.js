const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appErrors');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//MIDDLEWARE

if(process.env.NODE_ENV === 'developement')
{
  app.use(morgan('dev'));
}

app.use(express.json()); //middleware stands bw req and res
app.use(express.static(`${__dirname}/public`));



app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTE HEADERS

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*',(req,res,next)=>{
//   const err = new Error(`cant find ${req.originalUrl}`);
// err.status='fail';
// err.statusCode = 404;
  next(new AppError(`cant find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);

module.exports = app;