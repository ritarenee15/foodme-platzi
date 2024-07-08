// Cargar las variables de entorno
require('dotenv').config();

var PORT = process.env.PORT || 3000;
var STATIC_DIR = __dirname + '/../app';
var TEST_DIR = __dirname + '/../test';
var DATA_FILE = __dirname + '/data/restaurants.json';

require('./index').start(PORT, STATIC_DIR, DATA_FILE, TEST_DIR);
