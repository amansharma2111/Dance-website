var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/amankart', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
});


var kittySchema = new mongoose.Schema({
    name: String
  });


kittySchema.methods.speak = function () {
    var greeting =  "My name is " + this.name
}

var Kitten = mongoose.model('amanKitty', kittySchema);

var amanKitty = new Kitten({ name: 'amanKitty' });
amanKitty.save(function (err, amanKitty) {
    if (err) return console.error(err);
  });

  Kitten.find( {name: 'amanKitty'},function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })