CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR NOT NULL, 
    lastName VARCHAR NOT NULL,
    idNumber VARCHAR NOT NULL,
    phoneNumber VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE
    );

CREATE TABLE security_questions (
    id SERIAL PRIMARY KEY,
    question_1 VARCHAR,
    question_2 VARCHAR,
    question_3 VARCHAR
);

CREATE TABLE security_answers (
    id SERIAL PRIMARY KEY,
    answer_1 VARCHAR,
    answer_2 VARCHAR,
    answer_3 VARCHAR,
    user_id INTEGER
);