const sql_connection = require("../config/sql.js").connect();
module.exports = (server) => {
    server.get("/order/:id", (req, res) => {
        let username = req.session != undefined ? req.session.username : undefined;
        if (username != undefined) {
            res.render("pages/order", { username: username })
        }
        else {
            res.redirect("/login");
        }
    })
    server.get("/bestil/:id", (req, res) => {
        let username = req.session != undefined ? req.session.username : undefined;
        sql_connection.query(`SELECT room.rows, room.seats 
        FROM events
        INNER JOIN room ON FK_room = room.id
        WHERE events.id = ?
        
        `, [req.params.id], (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(data);
                }
            })
        // res.render("pages/order", { username: username })
    })
    server.get("/bestilt/:id", (req, res) => {
        sql_connection.query(`SELECT  ticket.row, ticket.seat
        FROM ticket
        INNER JOIN events ON ticket.fk_events = events.id
        WHERE events.id = ?
        
        `, [req.params.id], (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(data);
                }
            })
        // res.render("pages/order", { username: username })
    })
    server.post("/doorder/:id", (req, res) => {
        console.log(req.body)
        sql_connection.query(`INSERT INTO  ticket(fk_events, fk_account, seat, row)
        values (?,?,?,?)
        `, [req.params.id, req.session.userID, req.body.seat, req.body.row], (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ message: "dinne sæder er bistilt" })
                }
            })
    })
}