CREATE TABLE profile(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(50),
    password VARCHAR(100)
);

CREATE TABLE posts_all(
    id SERIAL PRIMARY KEY,
    post VARCHAR(255),
    date TIMESTAMP,
    user_id INT REFERENCES profile(id)
);