const sql_connection = require("../config/sql.js").connect();
module.exports = (server) => {
    server.get("/test", (req, res) => {
        res.render("pages/test")
    })
}