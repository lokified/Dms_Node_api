import pg from "pg";
const { Pool } = pg;

import dotenv from "dotenv"
dotenv.config();


const pool = new Pool({
    // user: process.env.DB_USER,
    // host: process.env.DB_HOST,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT
    connectionString: "postgres://zdbuzrspyyofop:1ff4fc31c19d06471716d70aa0d1e1d23cccca468873c69007459dc525737a46@ec2-54-85-56-210.compute-1.amazonaws.com:5432/d92i4rpe4tgg9j",
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;