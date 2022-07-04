const express= require('express');
const path= require('path');
const app= express();
var mongoose= require('mongoose');
var bodyparser= require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port= 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  })

const contact = mongoose.model('contact', contactSchema);

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("This item is saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    });
    //res.status(200).render('contact.pug');
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});