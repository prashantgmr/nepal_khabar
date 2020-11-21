const express = require('express');
const path = require('path')
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const news = require('./routes/newsRoutes');
const connectDB = require('./config/db');
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/news', news);
const uploadsdirectory = path.join(__dirname, '/user/public/uploads');
app.use('/user/public/uploads', express.static(uploadsdirectory));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('user/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'user', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));