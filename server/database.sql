CREATE DATABASE kanBanPM;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255)
);
CREATE TABLE doing(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255)
);
CREATE TABLE done(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255)
);
