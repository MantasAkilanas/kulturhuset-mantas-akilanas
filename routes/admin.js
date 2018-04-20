const sql_connection = require("../config/sql.js").connect();
module.exports = (server) => {
    server.get("/admin", (req, res) => {
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
                if (username != undefined) {
                    res.render("pages/admin",
                        {
                            data: data,
                            username: username
                        });
                }
                else {
                    res.redirect("/");
                }
            })

    })
    server.get("/adminedit/:id", (req, res) => {
        sql_connection.query(`SELECT events.id, events.name ,date_format(events.time, '%Y-%m-%d') as time,events.duration, room.name, events.price, category.name as category, events.timestamp, events.fk_category 
        FROM events
        INNER JOIN category ON FK_category = category.id
        INNER JOIN room ON FK_room = room.id
        WHERE events.id = ?
        `, [req.params.id], (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    sql_connection.query(`SELECT name, id FROM category`, (err, cat) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            sql_connection.query(`SELECT name, id FROM room`, (err, room) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    let username = req.session != undefined ? req.session.username : undefined;
                                    if (username != undefined) {
                                        res.render("pages/adminedit",
                                            {
                                                data: data,
                                                username: username,
                                                cat: cat,
                                                room: room
                                            });
                                    }
                                    else {
                                        res.redirect("/");
                                    }
                                }
                            })
                        }
                    })
                }
            })

    })

    server.put("/editevent/:id", (req, res) => {
        sql_connection.query(`UPDATE events
                    SET
                     events.name = ?,
                     events.time = ?,
                     events.duration = ?,
                     events.fk_room = ?, 
                     events.price = ?,
                     events.fk_category = ? 
                     WHERE events.id = ?
                     `, [req.body.name, req.body.time, req.body.duration, req.body.location, req.body.price, req.body.category, req.params.id], (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                }
            })

    })
    server.post("/createevent", (req, res) => {
        sql_connection.query(`insert into events(name, time, duration, fk_room,  price, fk_category)
                    values (?,?,?,?,?,?)
                     `, [req.body.name, req.body.time, req.body.duration, req.body.location, req.body.price, req.body.category, req.params.id], (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                }
            })

    })
    server.get("/admincreate", (req, res) => {
        sql_connection.query(`SELECT name, id FROM category`, (err, cat) => {
            if (err) {
                console.log(err);
            }
            else {
                sql_connection.query(`SELECT name, id FROM room`, (err, room) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        let username = req.session != undefined ? req.session.username : undefined;
                        if (username != undefined) {
                            res.render("pages/admincreate",
                                {
                                    username: username,
                                    cat: cat,
                                    room: room
                                });
                        }
                        else {
                            res.redirect("/");
                        }
                    }
                })
            }
        })
    })
}