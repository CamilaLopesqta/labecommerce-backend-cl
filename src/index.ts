import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from './database';
import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TUser } from './types';

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003!");
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong Camila!")
})

//getAllUsers
app.get("/users", (req: Request, res: Response) => {
    res.send(users)
})

//getAllProducts //Refatorar o GET /products
app.get("/products", (req: Request, res: Response) => {
    const name = req.query.name as string
    if(name){
        const result: TProduct[] = products.filter((product) => {
            return product.name.toLowerCase().includes(name.toLowerCase())
        })
        res.send(result)
}
    res.send(products)
})

//createUser
app.post("/users", (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser: TUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    }
    users.push(newUser)
    res.send("Cadastro realizado com suesso!")
})

//createProducts
app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const newProduct: TProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    }
    products.push(newProduct)
    res.send("Produto cadastrado com sucesso!")
})

//console.log("Aplicativo funcionando com sucesso!!!");
//console.log(users);
//console.log(products);
//console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"))
//console.log(getAllUsers());
//console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"));
//console.log(getAllProducts());
//console.log(searchProductsByName("gamer"));
