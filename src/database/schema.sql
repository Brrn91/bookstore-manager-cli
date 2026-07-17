-- =========================================================
-- BookStore Manager CLI - Script de criação do banco de dados
-- =========================================================

DROP TABLE IF EXISTS loans CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS authors CASCADE;

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    nationality VARCHAR(100),
    birth_date DATE
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author_id INTEGER NOT NULL REFERENCES authors(id),
    genre VARCHAR(80),
    published_year INTEGER,
    total_copies INTEGER NOT NULL,
    available_copies INTEGER NOT NULL
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20)
);

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(id),
    client_id INTEGER NOT NULL REFERENCES clients(id),
    loan_date TIMESTAMP NOT NULL DEFAULT NOW(),
    due_date DATE NOT NULL,
    return_date TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'ATIVO'
);

CREATE INDEX idx_books_author_id ON books(author_id);
CREATE INDEX idx_loans_book_id ON loans(book_id);
CREATE INDEX idx_loans_client_id ON loans(client_id);
CREATE INDEX idx_loans_status ON loans(status);
