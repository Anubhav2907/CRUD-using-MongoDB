const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/items', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.use(methodOverride('_method'))
app.set('views', path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.get('/products', async (req,res)=>{
    const products = await Product.find({});
    res.render('products/index', {products})
})
app.get('/products/new',function(req,res){
    res.render('products/new')
})

app.get('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/details', {product})
})
app.post('/products', async function(req,res){
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})
app.get('/products/:id/edit', async (req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product});
})
app.put('/products/:id', async function(req,res){
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new:true});
    res.redirect(`/products/${product._id}`)
})
app.delete('/products/:id', async function(req,res){
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
app.listen(3000, function(){
    console.log('On port 3000');
})