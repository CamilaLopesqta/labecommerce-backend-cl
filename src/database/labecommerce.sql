-- Active: 1704932620541@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME())
);

INSERT INTO users (id, name, email, password)
VALUES
    ('u001', 'Camila Lopes', 'camila@email.com', '123456'),
    ('u002', 'Elza Ceolim Lopes', 'elza@email.com', '456789'),
    ('u003', 'Jacob Antonio Beitum Lopes', 'toninho@email.com', '147258'),
    ('u004', 'Danilo Lopes', 'danilo@email.com', '258369'),
    ('u005', 'Ana Paula Lopes', 'anapaula@email.com', '987654');

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES
    ('p001', 'Televisão', 2500.00, 'Smart TV WiFi Alexa 32"', 'https://picsum.photos/seed/Mouse%20gamer/400'),
    ('p002', 'Home Theater', 279.45, 'para TV até 55" Branco', 'https://picsum.photos/seed/Mouse%20gamer/400'),
    ('p003', 'Ventilador', 349.99, 'Ventilador de coluna 30cm', 'https://picsum.photos/seed/Mouse%20gamer/400'),
    ('p004', 'Ar Condicionado', 4816.00, 'Split Invelter 12000 BTU', 'https://picsum.photos/seed/Mouse%20gamer/400'),
    ('p005', 'Ar Condicionado', 3199.00, 'Split Inverter 9000 BTU', 'https://picsum.photos/seed/Mouse%20gamer/400');
