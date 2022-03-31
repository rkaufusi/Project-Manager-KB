CREATE DATABASE kanBanPM;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    col VARCHAR(255),
);

