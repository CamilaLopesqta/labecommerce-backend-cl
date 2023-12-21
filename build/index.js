"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//console.log("Aplicativo funcionando com sucesso!!!");
//console.log(users);
//console.log(products);
//console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"))
//console.log(getAllUsers());
//console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"));
//console.log(getAllProducts());
//console.log(searchProductsByName("gamer"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003!");
});
app.get("/ping", (req, res) => {
    res.send("Pong Camila!");
});
//getAllUsers
app.get("/users", (req, res) => {
    res.send(database_1.users);
});
//getUserById
app.get("/users/:id", (req, res) => {
    const idToFind = req.params.id;
    const result = database_1.users.find((user) => {
        return user.id === idToFind;
    });
    res.send(result);
});
//getAllProducts //Refatorar o GET /products
app.get("/products", (req, res) => {
    const name = req.query.name;
    if (name) {
        const result = database_1.products.filter((product) => {
            return product.name.toLowerCase().includes(name.toLowerCase());
        });
        res.send(result);
    }
    res.send(database_1.products);
});
//createUser
app.post("/users", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    database_1.users.push(newUser);
    res.send("Cadastro realizado com suesso!");
});
//createProducts
app.post("/products", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    };
    database_1.products.push(newProduct);
    res.send("Produto cadastrado com sucesso!");
});
//deleteUserById
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const index = database_1.users.findIndex((user) => {
        return user.id === id;
    });
    if (index >= 0) {
        database_1.users.splice(index, 1);
    }
    res.send("User apagado com sucesso!");
});
//deleteProductById
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const index = database_1.products.findIndex((product) => {
        return product.id === id;
    });
    if (index >= 0) {
        database_1.products.splice(index, 1);
    }
    res.send("Produto apagado com sucesso!");
});
//editProductById
app.put("/products/:id", (req, res) => {
    const idToEdit = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImageUrl = req.body.imageUrl;
    const product = database_1.products.find((product) => {
        return product.id === idToEdit;
    });
    if (product) {
        product.id = newId || product.id;
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.description = newDescription || product.description;
        product.imageUrl = newImageUrl || product.imageUrl;
    }
    res.status(200).send("Produto atualizado com sucesso!");
});
