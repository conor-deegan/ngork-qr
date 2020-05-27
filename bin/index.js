#!/usr/bin/env node
const lib = require('../lib/tunnelQR.js');
const arguments = process.argv.splice(2);
lib.tunnelQR(arguments[0], arguments[1]);