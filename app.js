/*jshint globalstrict:true*/
'use strict';

var express = require('express'),
    app = express(),
    fibonacci;

fibonacci = function(n, callback){
  if (n < 2) return callback(n);

  setImmediate(function() {
    fibonacci(n-1, function(sum1) {
      fibonacci(n-2, function(sum2) {
        callback(sum1 + sum2);
      });
    });
  });
};

app.use(express.logger('short'));
app.use(express.urlencoded());
app.use(app.router);

app.get('/', function(req, res) {
  if (!req.param('num')) return res.send('Param <b>num</b> required!');

  fibonacci(req.param('num'), function(result) {
    res.send(req.param('num') + ': ' + result);
  });
});

app.listen(process.env.PORT || 80);
