'use strict';
const errors = require('./components/errors');
const _ = require('lodash');

module.exports = (app, args) => {
  app.use('/manager', require('./api/manager'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|components|app|assets)/*').get(errors[404]);
  // Other redirect to index
  const startPage = _.isString(args.page) ? args.page : 'index.html';
  if (!!args.verbose) console.log('OPEN PAGE: %s', startPage);
  app.route('/*').get((req, res) => res.sendfile(app.get('appPath') + `/${startPage}`));
};
