import { users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName } from './database';
import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TUser } from './types';

//console.log("Aplicativo funcionando com sucesso!!!");
//console.log(users);
//console.log(products);
//console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"))
//console.log(getAllUsers());
//console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"));
//console.log(getAllProducts());
//console.log(searchProductsByName("gamer"));

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

//getUserById
app.get("/users/:id", (req: Request, res: Response) => {
    const idToFind = req.params.id

    const result = users.find((user) => {
        return user.id === idToFind
    })
    res.send(result)
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

//deleteUserById
app.delete("/users/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const index: number = users.findIndex((user) => {
        return user.id === id
    })
    if(index >= 0){
        users.splice(index, 1)
    }
    res.send("User apagado com sucesso!")
})

//deleteProductById
app.delete("/products/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const index: number = products.findIndex((product) => {
        return product.id === id
    })
    if(index >= 0){
        products.splice(index, 1)
    }
    res.send("Produto apagado com sucesso!")
})

//editProductById
app.put("/products/:id", (req: Request, res: Response) => {
    const idToEdit = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const product = products.find((product) => {
        return product.id === idToEdit
    })
    if(product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
    }
    res.status(200).send("Produto atualizado com sucesso!")
})