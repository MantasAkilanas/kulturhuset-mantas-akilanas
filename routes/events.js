const sql_connection = require("../config/sql.js").connect();
module.exports = (server) => {
    server.get("/arragementer", (req, res) => {
        let username = req.session != undefined ? req.session.username : undefined;
        res.render("pages/events", { username: username });
    })
    server.get("/eventsinfo", (req, res) => {
        sql_connection.query(`SELECT events.id, events.name ,date_format(events.time, '%d-%m-%Y') as time,events.duration,room.name as location , events.price, category.name as category, events.timestamp 
        FROM events
        INNER JOIN room ON FK_room = room.id
        INNER JOIN category ON FK_category = category.id
        ORDER BY time ASC
        `, (err, data) => {
                res.send(data)
            })

    })
}