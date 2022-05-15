import express from 'express';
import bodyParser from 'body-parser';
import AppRoutes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
//var express = require('express');
const dbUrl =
  'mongodb+srv://mesutnisebin:pass1234@loginsignup.cl7eo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbUrl).then((result) => console.log('bağlantı sağlandı'));

const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

AppRoutes(app);

app.get('/', (req, res) => {
  const result = {
    status: true,
    message: 'OK',
  };
  res.send(result);
});

app.listen(3300, () => console.log('server has been started...!'));
