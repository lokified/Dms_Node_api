CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR, 
    lastName VARCHAR,
    idNumber VARCHAR,
    phoneNumber VARCHAR UNIQUE,
    email VARCHAR,
    pin VARCHAR NOT NULL,
    otp VARCHAR, 
    verified BOOLEAN
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

CREATE TABLE wallet (
    id SERIAL PRIMARY KEY,
    amount VARCHAR,
    user_id INTEGER
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    phoneNumber VARCHAR,
    amount VARCHAR,
    transactionType VARCHAR,
    transacted_at TIME DEFAULT CURRENT_TIME,
    transacted_on DATE DEFAULT CURRENT_DATE,
    user_id INTEGER
);