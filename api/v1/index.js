import express from 'express';
import config from 'config';
import logger from 'morgan';
import path from 'path';
import compression from 'compression';

import router from './server';

const debug = require('debug')('http');

const app = express();
const port = config.get('port');
const prefix = '/api/v1';

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve the api endpoints built in server.js
app.use(prefix, router);

/* ========== serving the UI pages ============= */
app.use(compression());

const dirName = '../../UI/template';
const resoursePath = path.join(__dirname, '../../UI');
debug(`Resource Path: ${resoursePath}`);
app.use(express.static(resoursePath));
app.use('/css', express.static(path.join(__dirname, '../../UI/css')));
app.use('/js', express.static(path.join(__dirname, '../../UI/js')));
app.use('/images', express.static(path.join(__dirname, '../../UI/images')));

app.get(`${prefix}`, (req, res) => {
  res.sendFile(path.join(__dirname, dirName, '/index.html'));
});

app.get(`${prefix}/index`, (req, res) => {
  res.sendFile(path.join(__dirname, dirName, '/index.html'));
});

app.get(`${prefix}/signup`, (req, res) => {
  res.sendFile(path.join(__dirname, dirName, '/signup.html'));
});

app.get(`${prefix}/signin`, (req, res) => {
  res.sendFile(path.join(__dirname, dirName, '/signin.html'));
});

app.get(`${prefix}/admin`, (req, res) => {
  res.sendFile(path.join(__dirname, dirName, '/admin.html'));
});

app.get(`${prefix}/marketplace`, (req, res) => {
  res.sendFile(path.join(__dirname, dirName, '/marketplace.html'));
});

app.get(`${prefix}/my-posted-ads`, (req, res) => {
  res.sendFile(path.join(__dirname, dirName, '/my-posted-ads.html'));
});

app.get(`${prefix}/post-new-ad`, (req, res) => {
  res.sendFile(path.join(__dirname, dirName, '/post-new-ad.html'));
});

app.get(`${prefix}/purchase-history`, (req, res) => {
  res.sendFile(path.join(__dirname, dirName, '/purchase-history.html'));
});

app.get(`${prefix}/sales-history`, (req, res) => {
  res.sendFile(path.join(__dirname, dirName, '/sales-history.html'));
});

// default page is set to the index page
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, dirName, '/index.html'));
});

const listen = app.listen(port, () => {
	debug(`AutoMart Server is running on port ${port} and in ${config.get('mode')} mode...`);
});

// for testing
module.exports = app;
module.exports.port = listen.address().port;
