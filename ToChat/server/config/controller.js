var mongoose = require('mongoose');
    model = require('./model'),
    Schema = mongoose.Schema;

var controller = function(app) {
    var db = mongoose.connect('mongodb://localhost/userExample');

    require('./users')(app, model.Users.schema);

};

module.exports = controller;
































