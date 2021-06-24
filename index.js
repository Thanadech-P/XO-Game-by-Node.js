const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Replay = require('./models/mongoDB')
const methodOverride = require('method-override')
const sizegame = [3, 5, 7];

mongoose.connect('mongodb://localhost:27017/XO-Game', { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true 
})

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/home', (req, res) => {
    res.render('home', {sizegame})
})

app.post('/home', async (req, res) => {
    const {name, position, size} = req.body;
    const replay = new Replay ({result: name, position: position, size: size});
    await replay.save();
})

app.get('/play', (req, res) => {
    const size = req.query.size;
    if(!size) {
        res.redirect('/')
    } else if (size == 3 || size == 5 || size == 7) {
        res.render('play', {size})
    }
    else {
        res.redirect('/')
    }
    
})

app.get('/history', async (req, res) => {
    const replay = await Replay.find({});
    res.render('history', {replay})
})

app.get('/history/:id', async (req, res) => {
    const replay = await Replay.findById(req.params.id)
    res.render('show', {replay}) 
})

app.delete('/history/:id', async (req, res) => {
    const {id} = req.params;
    await Replay.findByIdAndDelete(id);
    res.redirect('/history');
})

app.listen(3000, () => {
    console.log('Start port 3000... ')
})