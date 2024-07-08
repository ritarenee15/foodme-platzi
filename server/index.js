// Uncomment after adding New Relic agent to project
const newrelic = require('newrelic');

const express = require('express');
const logger = require('pino')();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const fs = require('fs');
const open = require('open');

const RestaurantRecord = require('./model').Restaurant;
const MemoryStorage = require('./storage').Memory;

const API_URL = '/api/restaurant';
const API_URL_ID = API_URL + '/:id';
const API_URL_ORDER = '/api/order';

var removeMenuItems = function(restaurant) {
  var clone = {};

  Object.getOwnPropertyNames(restaurant).forEach(function(key) {
    if (key !== 'menuItems') {
      clone[key] = restaurant[key];
    }
  });

  return clone;
};

exports.start = function(PORT, STATIC_DIR, DATA_FILE, TEST_DIR) {
  var app = express();
  var storage = new MemoryStorage();

  // log requests
  app.use(morgan('combined'));

  // serve static files for demo client
  app.use(express.static(STATIC_DIR));

  // create application/json parser
  var jsonParser = bodyParser.json();

  // API
  app.get(API_URL, function(req, res, next) {
    res.send(200, storage.getAll().map(removeMenuItems));
  });

  app.post(API_URL, function(req, res, next) {
    var restaurant = new RestaurantRecord(req.body);
    var errors = [];

    if (restaurant.validate(errors)) {
      storage.add(restaurant);
      return res.send(201, restaurant);
    }

    return res.send(400, {error: errors});
  });

  app.post(API_URL_ORDER, jsonParser, function(req, res, next) {
    logger.info(req.body, 'checkout');

    /*************************************
    /*         Custom attributes         *
    /*************************************
    var order = req.body;
    var itemCount = 0;
    var orderTotal = 0;
    order.items.forEach(function(item) { 
      itemCount += item.qty;
      orderTotal += item.price * item.qty;
    });
    
    newrelic.addCustomAttributes({
      'customer': order.deliverTo.name,
      'restaurant': order.restaurant.name,
      'itemCount': itemCount,
      'orderTotal': orderTotal
    });
    /*************************************/

    return res.send(201, { orderId: Date.now()});
  });

  app.get(API_URL_ID, function(req, res, next) {
    var restaurant = storage.getById(req.params.id);
    if (restaurant) {
      return res.send(200, restaurant);
    }
    return res.send(400, {error: 'No restaurant with id "' + req.params.id + '"!'});
  });

  app.put(API_URL_ID, function(req, res, next) {
    var restaurant = storage.getById(req.params.id);
    var errors = [];

    if (restaurant) {
      restaurant.update(req.body);
      return res.send(200, restaurant);
    }

    restaurant = new RestaurantRecord(req.body);
    if (restaurant.validate(errors)) {
      storage.add(restaurant);
      return res.send(201, restaurant);
    }

    return res.send(400, {error: errors});
  });

  app.delete(API_URL_ID, function(req, res, next) {
    if (storage.deleteById(req.params.id)) {
      return res.send(204, null);
    }
    return res.send(400, {error: 'No restaurant with id "' + req.params.id + '"!'});
  });

  // read the data from json and start the server
  fs.readFile(DATA_FILE, function(err, data) {
    JSON.parse(data).forEach(function(restaurant) {
      storage.add(new RestaurantRecord(restaurant));
    });

    app.listen(PORT, function() {
      open('http://localhost:' + PORT + '/');
      // console.log('Go to http://localhost:' + PORT + '/');
    });
  });

  // Windows and Node.js before 0.8.9 would crash
  // https://github.com/joyent/node/issues/1553
  try {
    process.on('SIGINT', function() {
      // save the storage back to the json file
      fs.writeFile(DATA_FILE, JSON.stringify(storage.getAll()), function() {
        process.exit(0);
      });
    });
  } catch (e) {}

};
