import express, { Request, Response } from "express";
import cors from "cors";
import { TProduct, TPurchases, TUser } from './types';
import { db } from './database/knex';

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

//teste
app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado!")
        }
    }

})

//getAllUsers
app.get("/users", async (req: Request, res: Response) => {
    try {
        const name = req.query.name

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser do tipo string")
            }
            if (name.length < 1) {
                res.status(400)
                throw new Error("'name' deve possuir pelo menos 1 caractere")
            }
            const resultUser = await db("users")
                .select().where("name", "LIKE", `%${name}%`)
            return res.status(200).send(resultUser)
        }
        const users = await db("users")
        res.status(200).send(users)
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//getAllProducts //Refatorar o GET /products
app.get("/products", async (req: Request, res: Response) => {
    try {
        const name = req.query.name

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser do tipo string")
            }
            if (name.length < 1) {
                res.statusCode = 400;
                throw new Error("'name' - deve possuir pelo menos um caracter");
            }
            const resultProduct = await db("products")
                .select().where("name", "LIKE", `%${name}%`)
            return res.status(200).send(resultProduct);
        }

        const products = await db("products")
        res.status(200).send(products)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
});

//createUser
app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password, created_at } = req.body

        if (id === undefined ||
            name === undefined ||
            email === undefined ||
            password === undefined) {
            res.statusCode = 400
            throw new Error("O body deve corresponder a todos esses requisitos: 'id', 'name', 'email' e 'password'")
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.statusCode = 400
                throw new Error("'id' deve ser uma string")
            }
            if (id[0] !== "u") {
                res.status(400)
                throw new Error("'id' deve iniciar com a letra 'u'")
            }
            if (id.length < 4) {
                res.status(400)
                throw new Error("'id' deve possuir pelo menos 4 caracteres")
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma string")
            }
            if (name.length < 2) {
                res.status(400)
                throw new Error("'name' deve possuir pelo menos 2 caracteres")
            }
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'email' deve ser uma string")
            }
            if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
                res.status(400)
                throw new Error("O 'e-mail' deve corresponder ao exemplo: 'exemplo@email.com'")
            }
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("'password' deve ser uma string")
            }
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
                throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
            }
        }

        const [alreadyExistsId]: TUser[] | undefined[] = await db("users")
            .where({ id })
        if (alreadyExistsId) {
            res.status(400)
            throw new Error("'id' já cadastrada")
        }

        const [alreadyExistsEmail]: TUser[] | undefined[] = await db("users")
            .where({ email })
        if (alreadyExistsEmail) {
            res.status(400)
            throw new Error("'e-mail' já cadastrado")
        }

        const newUser = {
            id: id,
            name: name,
            email: email,
            password: password
        }
        await db("users").insert(newUser)
        res.status(200).send({ message: "Cadastro realizado com sucesso!" })
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
});

//createProducts
app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body

        if (id === undefined ||
            name === undefined ||
            price === undefined ||
            description === undefined ||
            image_url === undefined) {
            res.statusCode = 400
            throw new Error("O body deve corresponder a todos esses atributos: 'id', 'name', 'price', 'description' e 'image_url'")
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.statusCode = 400
                throw new Error("'id' deve ser uma string")
            }
            if (id[0] !== "p") {
                res.status(400)
                throw new Error("'id' deve iniciar com a letra 'p'")
            }
            if (id.length < 4) {
                res.status(400)
                throw new Error("'id' deve possuir pelo menos 4 caracteres")
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma string")
            }
            if (name.length < 2) {
                res.status(400)
                throw new Error("'name' deve possuir pelo menos 2 caracteres")
            }
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("'price' deve ser um number")
            }
        }
        if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400)
                throw new Error("'description' deve ser uma string")
            }
            if (description.length < 3) {
                res.status(400)
                throw new Error("'description' deve possuir pelo menos 3 caracteres")
            }
        }
        if (image_url !== undefined) {
            if (typeof image_url !== "string") {
                res.status(400)
                throw new Error("'image_url' deve ser uma string")
            }
        }

        const [alreadyExistsId]: TProduct[] | undefined[] = await db("products")
            .where({ id })
        if (alreadyExistsId) {
            res.status(400)
            throw new Error("'id' já cadastrada")
        }

        const newProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: image_url
        }
        await db("products").insert(newProduct)
        res.status(200).send({ message: "Produto cadastrado com sucesso!" })
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
});

//createPurchase
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const buyer = req.body.buyer
        const total_price = req.body.total_price

        if (id === undefined ||
            buyer === undefined ||
            total_price === undefined) {
            res.status(400)
            throw new Error("O body deve corresponder a todos esses atributos 'id', 'buyer' e 'total_price'")
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string")
            }
            if (!id.startsWith("ped")) {
                res.status(400)
                throw new Error("'id' deve iniciar com 'ped'")
            }
            if (id.length < 6) {
                res.status(400)
                throw new Error("'id' deve possuir pelo menos 6 caracteres")
            }
        }
        if (buyer !== undefined) {
            if (typeof buyer !== "string") {
                res.status(400)
                throw new Error("'buyer' deve ser string")
            }
        }
        if (total_price !== undefined) {
            if (typeof total_price !== "number") {
                res.status(400)
                throw new Error("'total price' deve ser number")
            }
        }

        const [searchPurchase]: TPurchases[] | undefined[] = await db("purchases")
            .where({ id })
        if (searchPurchase) {
            res.status(400)
            throw new Error("'id' já cadastrada")
        }

        const [searchUser]: TUser[] | undefined[] = await db("users")
            .where({ id: buyer })
        if (searchUser) {
            res.status(400)
            throw new Error("'id' já cadastrada")
        }

        await db("purchases").insert({ id, buyer, total_price })
        await db("purchases_products").insert({
            id,
            buyer,
            total_price
        })
        res.status(200).send("Pedido realizado com sucesso")
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//getPurchaseById
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToSearch: string = req.params.id

        const [purchase] = await db("purchases")
            .select(
                'purchases.id AS purchaseId',
                'purchases.total_price AS totalPrice',
                'purchases.created_at AS createdAt',
                'purchases.buyer',
                'users.email',
                'users.name'
            )
            .innerJoin("users", "buyer", "=", "users.id")
            .where("purchases.id", "=", idToSearch)

        const listPurchasesProducts = await db("purchases_products")
            .select(
                "products.id",
                "products.name",
                "products.price",
                "products.description",
                "products.image_url",
                "quantity"
            )
            .join("products", "product_id", "=", "products.id")
            .where({ purchase_id: idToSearch })

        purchase.productsList = listPurchasesProducts
        res.status(200).send(purchase)
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//deleteUserById
app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete: string = req.params.id
        const [user] = await db.raw(`SELECT * FROM users;`);

        if (!user) {
            res.status(404)
            throw new Error("Usuário não encontrado")
        }

        await db.raw(`
            DELETE FROM users
            WHERE id = "${idToDelete}";
        `)
        res.status(200).send("User apagado com sucesso!")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
});

//deleteProductById
app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [product] = await db.raw(`SELECT * FROM products;`)

        if (!product) {
            res.status(404)
            throw new Error("'produto' não encontrado")
        }

        await db.raw(`
            DELETE FROM products
            WHERE id = "${id}";
        `)
        res.send("Produto apagado com sucesso!")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
});

//editUserById
app.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const idUserEdit: string = req.params.id
        const [searchUser] = await db.raw(`
            SELECT * FROM users
            WHERE id = "${idUserEdit}";
        `)

        if (!searchUser) {
            res.status(404)
            throw new Error("Usuário não encontrado")
        }

        const { id, name, email, password } = req.body
        const query: Array<string> = []

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
            query.push(`id = "${id}"`)
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }
            query.push(`name = "${name}"`)
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'email' deve ser string")
            }
            query.push(`email = "${email}"`)
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("'password' deve ser string")
            }
            query.push(`password = "${password}"`)
        }
        const newQuery: string = query.join(", ");
        await db.raw(`UPDATE users SET "${newQuery}" WHERE id = "${idUserEdit}";`)
        res.status(201).send("Cadastro atualizado com sucesso!")
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//editProductById
app.put("/products/:id", async (req: Request, res: Response) => {
    try {

        const idProductEdit = req.query.id

        const [products] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${idProductEdit}";
        `)

        if (!products) {
            res.status(404)
            throw new Error("Produto não encontrado")
        }

        const { id, name, price, description, image_url } = req.body
        const queryProduct: Array<string> = []

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
            queryProduct.push(`id = "${id}"`)
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("'name' deve ser string")
            }
            queryProduct.push(`name = "${name}"`)
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("'price' deve ser um number")
            }
            queryProduct.push(`email = "${price}"`)
        }
        if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400)
                throw new Error("'description' deve ser string")
            }
            queryProduct.push(`password = "${description}"`)
        }
        if (image_url !== undefined) {
            if (typeof image_url !== "string") {
                res.status(400)
                throw new Error("'image_url' deve ser string")
            }
            queryProduct.push(`password = "${image_url}"`)
        }
        const newQueryProduct: string = queryProduct.join(", ");
        await db.raw(`UPDATE products SET "${newQueryProduct}" WHERE id = "${id}";`)
        res.status(201).send("Cadastro atualizado com sucesso!")
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//getAllPurchases
app.get("/purchases", async (req: Request, res: Response) => {
    try {
        const resultPurchases = await db("purchases")
        res.status(200).send(resultPurchases)
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//deletePurchaseById
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete: string = req.params.id
        const [purchase] = await db.raw(`SELECT * FROM purchases;`);

        if (!purchase) {
            res.status(404)
            throw new Error("Pedido não encontrado")
        }

        await db.raw(`
            DELETE FROM purchases
            WHERE id = "${idToDelete}";
        `)
        res.status(200).send("Pedido apagado com sucesso!")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
});