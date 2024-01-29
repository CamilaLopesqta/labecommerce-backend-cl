-- Active: 1705000809327@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME())
);

INSERT INTO users (id, name, email, password, created_at)
VALUES
    ('u001', 'Camila Lopes', 'camila@email.com', '123456', CURRENT_TIMESTAMP),
    ('u002', 'Elza Ceolim Lopes', 'elza@email.com', '456789', CURRENT_TIMESTAMP),
    ('u003', 'Jacob Antonio Beitum Lopes', 'toninho@email.com', '147258', CURRENT_TIMESTAMP),
    ('u004', 'Danilo Lopes', 'danilo@email.com', '258369', CURRENT_TIMESTAMP),
    ('u005', 'Ana Paula Lopes', 'anapaula@email.com', '987654', CURRENT_TIMESTAMP);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES  
    ('p001', 'Televisão', 1100.00, 'Smart TV WiFi Alexa 32"', 'https://m.media-amazon.com/images/I/51OOI90yyoL._AC_SL1000_.jpg'),
    ('p002', 'Televisão', 2500.00, 'Smart TV 55"', 'https://m.media-amazon.com/images/I/91oLovaOrlL._AC_SX355_.jpg'),
    ('p003', 'Ventilador', 279.99, 'Ventilador de coluna 30cm', 'https://m.media-amazon.com/images/I/61oDMqa6kSL._AC_SY450_.jpg'),
    ('p004', 'Ar Condicionado', 2899.00, 'Split Inverter 12000 BTU', 'https://m.media-amazon.com/images/I/51AopkBGNuL._AC_SX342_.jpg'),
    ('p005', 'Ar Condicionado', 2599.00, 'Split Inverter 9000 BTU', 'https://m.media-amazon.com/images/I/51EfRJce-lL._AC_SX342_.jpg');

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
    WHERE name = 'Ar Condicionado';

INSERT INTO users (id, name, email, password, created_at)
VALUES ('u006', 'Arthur Alves', 'arthur@gmail.com', '123456789', CURRENT_TIMESTAMP);

INSERT INTO products (id, name, price, description, image_url)
VALUES ('p006', 'Ventilador', 259.00, 'Ventilador de mesa 50cm', 'https://m.media-amazon.com/images/I/8194vs7pwxL._AC_SX425_.jpg');

DELETE FROM users
    WHERE id = 'u006';

DELETE FROM products
    WHERE id = 'p006';

UPDATE products
    SET
        name = 'Notebook',
        price = 1805.00,
        description = 'Aspire 5 - Intel Core i3 256GB - Tela 15.6” - Windows 11', 
        image_url = 'https://m.media-amazon.com/images/I/51yXlssh8SL._AC_SX425_.jpg'
WHERE
    id = 'p001';

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME()),
    FOREIGN KEY (buyer) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    );

DROP TABLE purchases;

INSERT INTO purchases(id, buyer, total_price)
VALUES
    ('ped001', 'u001', 1500),
    ('ped002', 'u003', 200),
    ('ped003', 'u005', 599),
    ('ped004', 'u002', 150),
    ('ped005', 'u004', 1200);

SELECT * FROM purchases;

INSERT INTO purchases(id, buyer, total_price)
VALUES ('ped006', 'u001', 1500);

UPDATE purchases
    SET 
        total_price = 200
WHERE 
    id = 'ped001';

SELECT * FROM purchases;

SELECT
    purchases.id AS purchasesId,
    users.id AS userId,
    users.name,
    users.email,
    purchases.total_price AS totalPrice,
    purchases.created_at
FROM purchases
INNER JOIN users
ON purchases.buyer = users.id;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

DROP TABLE purchases_products

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
    ('ped001', 'p003', 5),
    ('ped002', 'p004', 4),
    ('ped003', 'p001', 3);

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id
INNER JOIN users
ON purchases.buyer = users.id;
