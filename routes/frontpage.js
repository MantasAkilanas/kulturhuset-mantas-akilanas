const sql_connection = require("../config/sql.js").connect();
module.exports = (server) => {
    server.get("/", (req, res) => {
        sql_connection.query(`SELECT events.id, events.name ,date_format(events.time, '%d-%m-%Y') as time, events.duration, room.name as location, events.price, category.name as category, events.timestamp 
        FROM events
        INNER JOIN category ON FK_category = category.id
        INNER JOIN room ON FK_room = room.id
        WHERE DATE_ADD(timestamp, INTERVAL 8 day) > NOW()
        ORDER BY timestamp DESC  LIMIT 5
        `, (err, data) => {
                if (err) {
                    console.log(err);
                }
                let username = req.session != undefined ? req.session.username : undefined;
                res.render("pages/index",
                    {
                        data: data,
                        username: username
                    });
            })

    })
}