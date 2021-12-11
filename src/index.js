import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home.js';
import Search from './joblist/search';
import Favorite from './joblist/favorite';
import Job from './job/job';
import JobCreate from './job/jobCreate';
import JobEdit from './job/jobEdit';
import Register from './auth/register';
import Login from './auth/login';
import reducer from './reducer/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './css/index.css';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/job/:jobId" element={<Job />} />
        <Route path="/create" element={<JobCreate />} />
        <Route path="/edit/:jobId" element={<JobEdit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </Provider>
,
  document.getElementById('root')
);