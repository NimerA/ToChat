var mongoose = require('mongoose');
var Schema = mongoose.Schema;
	//Model father

    //Users Schema Example
var User = new Schema({
    name:     String,
    user:    String,
    email:    String,
    password: String
});

/*model.User ={
    'schema': mongoose.model('user', User),
    'name': 'user'
};*/
User.save(function(err)){
    if (err) throw err;

    console.log('Man funciono!')
}
//var user = mongoose.model('User', User)

// Exports all Schemas
//module.exports = user;
    