const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "FamilyGuy1",
    host: "localhost",
    port: 5432,
    database: "kanBanPM",
})

module.exports = pool