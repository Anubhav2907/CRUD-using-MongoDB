const mongoose = require('mongoose');
const Product = require('./models/product');
mongoose.connect('mongodb://localhost:27017/items', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// const p = new Product({
//     name : 'banana',
//     price: 20,
//     category: 'fruits'
// })
// p.save()
//     .then(data=>{
//         console.log(data);
//     })
//     .catch(err=>{
//         console.log(err)
//     })
const addItems = [
    {
        name:'Cabbage',
        price:10,
        category:'vegetables'
    },
    {
        name:'bread',
        price:35,
        category:'dairy'
    },
    {
        name:'egg',
        price:8,
        category:'vegetables'
    },
    {
        name:'apple',
        price:80,
        category:'fruits'
    },
    {
        name:'milk',
        price:55,
        category:'dairy'
    }
]
Product.insertMany(addItems)
    .then(data=>{
        console.log(data);
    })
    .catch(err=>{
        console.log(err)
    })