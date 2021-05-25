const {Pool} = require('pg');

const client = new Pool({
    user: "postgres",
    password: "password",
    host: "127.0.0.1",
    port: 5432,
    database: "epitrello"
})

client.connect().then(() => console.log("connected"));

module.exports = {
    client : client
};