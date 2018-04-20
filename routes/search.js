const sql_connection = require("../config/sql.js").connect();
module.exports = (server) => {
    server.get("/search/:id", (req, res) => {
        sql_connection.query(`SELECT events.id, events.name ,date_format(events.time, '%d-%m-%Y') as time,events.duration,room.name as location , events.price, category.name as category, events.timestamp 
        FROM events
        INNER JOIN room ON FK_room = room.id
        INNER JOIN category ON FK_category = category.id
        WHERE category.name LIKE "%"?"%" or
        events.name LIKE "%"?"%" or
        events.time LIKE "%"?"%" or
        room.name LIKE "%"?"%"
        ORDER BY time
        `, [req.params.id, req.params.id, req.params.id, req.params.id], (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let username = req.session != undefined ? req.session.username : undefined;
                    res.render("pages/search", { data: data, username: username });
                }
            })

    })
    server.get("/datesearch/:id", (req, res) => {
        sql_connection.query(`SELECT events.id, events.name ,date_format(events.time, '%d-%m-%Y') as time,events.duration,room.name as location , events.price, category.name as category, events.timestamp 
        FROM events
        INNER JOIN room ON FK_room = room.id
        INNER JOIN category ON FK_category = category.id
        WHERE category.name LIKE "%"?"%" or
        events.name LIKE "%"?"%" or
        events.time LIKE "%"?"%" or
        room.name LIKE "%"?"%"
        ORDER BY time
        `, [req.params.id, req.params.id, req.params.id, req.params.id], (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(data);
                }
            })

    })
}