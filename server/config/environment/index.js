'use strict';
const path = require('path');
const root = path.normalize(__dirname + '/../../..');
const _ = require('lodash');

// Export the config object
// ==============================================
module.exports = (args) => {
  if (!!args.verbose) console.log('CONFIG ARGS', args);
  return {
    env: 'development',
    // Root path of server
    root: root,
    // Server ip
    ip:   _.isString(args.ip) ? args.ip :
          process.env.OPENSHIFT_NODEJS_IP ||
          process.env.SERVER_IP ||
          process.env.IP ||
          process.env.ECHO_IP ||
          'localhost',
    // Server port
    port: _.isNumber(args.port) ? args.port :
          process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.SERVER_PORT ||
          process.env.PORT ||
          process.env.ECHO_PORT ||
          9007,
    // Path del server
    serverPath: path.normalize(__dirname + '/../..'),
    // Path del client
    clientPath: _.isString(args.client) ? args.client : '',
  }
};
