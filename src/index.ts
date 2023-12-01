import { log } from 'console';
import {users, products, createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName} from './database';

//console.log("Aplicativo funcionando com sucesso!!!");
//console.log(users);
//console.log(products);

//console.log(createUser("u003", "Astrodev", "astrodev@email.com", 
//"astrodev99"))

//console.log(getAllUsers());

//console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo"));

//console.log(getAllProducts());

console.log(searchProductsByName("gamer"));
