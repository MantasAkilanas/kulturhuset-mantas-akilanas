const sql_connection = require("../config/sql.js").connect();
module.exports = (server) => {
    server.get("/admin", (req, res) => {
        let username = req.session != undefined ? req.session.username : undefined;
        // if (username != undefined) {
        res.render("pages/admin",
            {
                username: username
            });
        // }
        // else {
        //     res.redirect("/");
        // }


    })
    server.get("/admininfo", (req, res) => {
        sql_connection.query(`SELECT events.id, events.fk_room, events.name ,date_format(events.time, '%Y-%m-%d') as time,events.duration, room.name as room, events.price, category.name as category, events.timestamp, events.fk_category 
        FROM events
        INNER JOIN category ON FK_category = category.id
        INNER JOIN room ON FK_room = room.id
        `, (err, data) => {
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
                                    res.json({
                                        data: data,
                                        cat: cat,
                                        room: room
                                    });
                                }

                            })
                        }
                    })
                }
            })
    })



    server.put("/editevent/:id", (req, res) => {
        console.log(req.body)
        sql_connection.query(`UPDATE events
                    SET
                     events.name = ?,
                     events.time = ?,
                     events.duration = ?,
                     events.fk_room = ?, 
                     events.price = ?,
                     events.fk_category = ? 
                     WHERE events.id = ?
                     `, [req.body.name, req.body.time, req.body.duration, req.body.room, req.body.price, req.body.category, req.params.id], (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                }
            })

    })
    server.post("/createevent", (req, res) => {
        console.log(req.body)
        sql_connection.query(`INSERT INTO events
                     (events.name ,
                     events.time ,
                     events.duration ,
                     events.fk_room , 
                     events.price ,
                     events.fk_category )
                     VALUES (?,?,?,?,?,?) 
                     `, [req.body.name, req.body.time, req.body.duration, req.body.room, req.body.price, req.body.category, req.params.id], (err, results) => {
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
    server.post("/addcat", (req, res) => {
        sql_connection.query(`INSERT INTO category (name) VALUES (?)`, [req.body.category], (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
            }
        })

    })
    server.post("/addroom", (req, res) => {
        sql_connection.query(`INSERT INTO room (name,rows,seats) VALUES (?,?,?)`, [req.body.room, req.body.rows, req.body.seat], (err, results) => {
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
    server.delete("/admindel/:id", (req, res) => {
        sql_connection.query(`DELETE FROM ticket WHERE
           fk_events = ?`, [req.params.id], (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    sql_connection.query("DELETE FROM events WHERE id = ?", [req.params.id], (err, results) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }
            })

    })
}