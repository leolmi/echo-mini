'use strict';;
console.log(`
 ___    _        
| __|__| |_  ___ 
| _|/ _| ' \\/ _ \\
|___\\__|_||_\\___/

`);
console.log('starting...');
const express = require('express');
const args = require('yargs').argv;
if (args.verbose) console.log('ARGS', args);
const config = require('./config/environment')(args);
config.verbose = !!args.verbose;
if (args.verbose) console.log('CONFIG', config);
const _ = require('lodash');
const opn = require('opn');

// Setup server
const app = express();
const server = require('http').createServer(app);
require('./config/server')(app, config);
require('./routes')(app, args);
// Start server
server.listen(config.port, config.ip, () => console.log('started, listening on %d\n-----------------------------------------------', config.port));
// open browser
if (_.has(args, 'open')) {
  let url = _.isString(args.open) ? args.open : `${config.ip}:${config.port}`;
  if (!/^https?:\/\//g.test(url)) url = `http://${url}`;
  if (_.isString(args.page)) url = `${url}/${args.page}`
  if (args.verbose) console.log('URL', url);
  opn(url);
} 
// Expose app
exports = module.exports = app;
