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