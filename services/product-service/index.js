
const express = require('express'); 
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/productDB', { useNewUrlParser: true, useUnifiedTopology: true });

const Product = mongoose.model('Product', {
    name: String,
    price: Number
});

app.get('/products', async (req, res) => {
     try {
        const products = await Product.find(); 
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/products', async (req, res) => { 
    try {
        const product = new Product (req.body); 
        await product.save();
        res.status(201).send(product);
    } catch (err) {
    res.status(400).send(err);
    }
});

    app.listen(PORT, () => {

console.log("Product service is running on port ${PORT}");
});