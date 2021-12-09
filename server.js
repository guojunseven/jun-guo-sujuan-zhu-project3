const express = require('express');
const job = require('./routes/job.js');
const user = require('./routes/user.js');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const env = require('dotenv');

env.config();
// mongondb set up
// const mongoEndpoint = 'mongodb://127.0.0.1:27017/jobBoard';
const mongoEndpoint = 'mongodb+srv://junguo:201048502@cs5610web.yghhj.mongodb.net/jobBoardTest?retryWrites=true&w=majority';
mongoose.connect(mongoEndpoint, {useNewUrlParser: true}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/job', job);
app.use('/api/user', user);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8000, () => {
  console.log('Starting server');
});