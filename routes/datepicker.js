const sql_connection = require("../config/sql.js").connect();
module.exports = (server) => {
    server.get("/datepicker", (req, res) => {
        res.render("pages/datepicker")
    })
}