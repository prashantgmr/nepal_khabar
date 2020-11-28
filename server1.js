const express = require('express');
const path = require('path')
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const news = require('./routes/newsRoutes');
const user = require('./routes/userRoutes');
const authUser = require('./routes/authUser');
const connectDB = require('./config/db');
dotenv.config({ path: './config/config.env' });
const {requireAuth ,checkUser} = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');


connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.get('/admin',requireAuth);
app.use('/user', authUser);
app.use('/api/v1/news', news);
app.use('/api/v1/user',user);

const uploadsdirectory = path.join(__dirname, '/user/public/uploads');
app.use('/user/public/uploads', express.static(uploadsdirectory));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('user/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'user', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));