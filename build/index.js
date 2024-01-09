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
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado.");
        }
    }
});
//getAllProducts //Refatorar o GET /products
app.get("/products", (req, res) => {
    try {
        const name = req.query.name;
        const result = (name) => {
            return database_1.products.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
        };
        if (name !== undefined) {
            if (name.length < 1) {
                res.statusCode = 400;
                throw new Error("'name' - deve possuir pelo menos um caracter");
            }
            res.status(200).send(result(name));
        }
        res.status(200).send(database_1.products);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado.");
        }
    }
});
//createUser
app.post("/users", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if (id === undefined ||
            name === undefined ||
            email === undefined ||
            password === undefined) {
            res.statusCode = 400;
            throw new Error("O body deve corresponder a todos esses atributos: 'id', 'name', 'email' e 'password'");
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.statusCode = 400;
                throw new Error("'id' deve ser uma string");
            }
            const verifyId = database_1.users.find((user) => user.id === id);
            if (verifyId) {
                res.status(400);
                throw new Error("Já existe um usuário cadastrado com essa 'id'");
            }
        }
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("'name' deve ser uma string");
        }
        if (typeof email !== "string") {
            res.status(400);
            throw new Error("'email' deve ser uma string");
        }
        if (typeof password !== "string") {
            res.status(400);
            throw new Error("'password' deve ser uma string");
        }
        const verifyEmail = database_1.users.find((user) => user.email === email);
        if (verifyEmail !== undefined) {
            res.status(400);
            throw new Error("'email' já cadastrado");
        }
        const newUser = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        };
        database_1.users.push(newUser);
        res.status(201).send("Cadastro realizado com sucesso!");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado.");
        }
    }
});
//createProducts
app.post("/products", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const imageUrl = req.body.imageUrl;
        if (id === undefined ||
            name === undefined ||
            price === undefined ||
            description === undefined ||
            imageUrl === undefined) {
            res.statusCode = 400;
            throw new Error("O body deve corresponder a todos esses atributos: 'id', 'name', 'price', 'description' e 'imageUrl'");
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.statusCode = 400;
                throw new Error("'id' deve ser uma string");
            }
            const verifyId = database_1.products.find((product) => product.id === id);
            if (verifyId) {
                res.status(400);
                throw new Error("Já existe um produto cadastrado com essa 'id'");
            }
        }
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("'name' deve ser uma string");
        }
        if (typeof price !== "number") {
            res.status(400);
            throw new Error("'price' deve ser um number");
        }
        if (typeof description !== "string") {
            res.status(400);
            throw new Error("'description' deve ser uma string");
        }
        if (typeof imageUrl !== "string") {
            res.status(400);
            throw new Error("'imageUrl' deve ser uma string");
        }
        const newProduct = {
            id,
            name,
            price,
            description,
            imageUrl
        };
        database_1.products.push(newProduct);
        res.send("Produto cadastrado com sucesso!");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado.");
        }
    }
});
//deleteUserById
app.delete("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const index = database_1.users.findIndex((user) => {
            return user.id === id;
        });
        if (index < 0) {
            res.statusCode = 404;
            throw new Error("Usuário não encontrado");
        }
        if (index >= 0) {
            database_1.users.splice(index, 1);
        }
        res.status(200).send("User apagado com sucesso!");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado.");
        }
    }
});
//deleteProductById
app.delete("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const index = database_1.products.findIndex((product) => {
            return product.id === id;
        });
        if (index < 0) {
            res.statusCode = 404;
            throw new Error("Produto não encontrado");
        }
        if (index >= 0) {
            database_1.products.splice(index, 1);
        }
        res.send("Produto apagado com sucesso!");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado.");
        }
    }
});
//editProductById
app.put("/products/:id", (req, res) => {
    try {
        const idToEdit = req.params.id;
        const { id, name, price, description, imageUrl } = req.body;
        const result = database_1.products.find(prod => prod.id === idToEdit);
        if (result === undefined) {
            res.statusCode = 404;
            throw new Error("'produto' não encontrado");
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.statusCode = 400;
                throw new Error("'id' deve ser uma string");
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.statusCode = 400;
                throw new Error("'name' deve ser uma string");
            }
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                res.statusCode = 400;
                throw new Error("'price' deve ser um number");
            }
        }
        if (description !== undefined) {
            if (typeof description !== "string") {
                res.statusCode = 400;
                throw new Error("'description' deve ser uma string");
            }
        }
        if (imageUrl !== undefined) {
            if (typeof imageUrl !== "string") {
                res.statusCode = 400;
                throw new Error("'imageUrl' deve ser uma string");
            }
        }
        const newProduct = database_1.products.find((product) => {
            return product.id === idToEdit;
        });
        if (newProduct) {
            newProduct.id = id || newProduct.id;
            newProduct.name = name || newProduct.name;
            newProduct.price = price || newProduct.price;
            newProduct.description = description || newProduct.description;
            newProduct.imageUrl = imageUrl || newProduct.imageUrl;
        }
        return res.status(200).send("Produto atualizado com sucesso!");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado.");
        }
    }
});
