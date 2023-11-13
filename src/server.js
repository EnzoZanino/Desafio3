// TODO: Para emmpezar primero que nada, inicializamos npm CON (npm init -y) y luego (npm i express)
// ?anteriormente era const express = require('express') pero ↓
// !ahora se realiza de esa manera ya que tiene type: module en pachake.json, tambien agregamos "dev": "nodemon src/app.js"

import express from "express";

// import ProductManager from "./ProductManager.js";
import { ProductManager } from "../ProductManager.js";

// app.use(express.urlencoded({extended: true}));

const app = express();
const PORT = 8080;

const manager = new ProductManager("./products.json");

app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
    const products = await manager.getProducts();
	res.send(products);
})

app.get('/products', async (req, res) => {
    const products = await manager.getProducts();
    const {limit} = req.query;
    if (limit) {
    const someProducts = products.slice(0, Number(limit));
    res.send(someProducts);
    } else res.send(products);
})

app.get('/products/:pid', async (req, res) => {
    const products = await manager.getProducts();
    const {pid} = req.params;
    const product = products.find(prod => prod.id === Number(pid));
    res.send(product ? product : "Product not found")
})

app.listen(PORT, () => console.log("Server listening on port 8080"));
