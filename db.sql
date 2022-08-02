INSERT INTO users (name, email) VALUES($1, $2) RETURNING *;

SELECT * FROM users WHERE id = $1;

DELETE FROM users WHERE id = $1;

UPDATE users SET name = $1, email = $2 WHERE id = $3;

SELECT * FROM users ORDER by id ASC;