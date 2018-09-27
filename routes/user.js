const sql_connection = require("../config/sql.js").connect();
const validator = require("../services/validation")
module.exports = (server) => {
    server.get("/register", (req, res) => {
        let username = req.session != undefined ? req.session.username : undefined;
        res.render("pages/register", {
            username: username
        })
    })
    server.get("/logout", (req, res) => {
        req.session.destroy(function (err) {
            res.redirect("/")
        });
    })
    server.get("/login", (req, res) => {
        let username = req.session != undefined ? req.session.username : undefined;
        res.render("pages/login", {
            username: username
        })
    })
    server.post("/login", (req, res) => {
        sql_connection.query(`SELECT accounts.username,accounts.id, accounts.fk_accountlevel as access
        FROM accounts 
        WHERE username = ? AND password = ?
        `, [req.body.username, req.body.password], (err, results) => {
                if (err) {
                    console.log(err);
                }
                else if (results.length > 0) {
                    req.session.userID = results[0].id;
                    req.session.username = results[0].username;
                    req.session.access = results[0].access;
                    console.log(req.session.userID);
                    if (req.session.access == 2) {
                        res.redirect("/");
                    }
                    else if (req.session.access == 1) {
                        res.redirect("/admin");
                    }
                }
                else {
                    let username = req.session != undefined ? req.session.username : undefined;
                    res.render("pages/login", {
                        messageType: "alert-danger",
                        message: "forket login oplysninger",
                        username: username
                    });
                }
            })
    })
    server.post("/signup", (req, res) => {
        let errors = validator.validate(req.body);
        if (Object.keys(errors).length == 0) {
            console.log("succes")
            sql_connection.query(`SELECT username
            FROM accounts 
            WHERE username = ?
            `, [req.body.username], (err, usernameCheck) => {
                    if (err) {
                        console.log(err);
                    }
                    else if (usernameCheck.length == 0) {
                        sql_connection.query(`INSERT INTO accounts
                    SET
                        name = ?,
                        lastname = ?,
                        phone = ?,
                        username = ?,
                        password = ?,
                        email = ? `, [req.body.name, req.body.lastname, req.body.phone, req.body.username, req.body.password, req.body.email], (err, results) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    errors = {
                                        url: "http://localhost:3000/login"
                                    }
                                    res.send(errors);
                                }
                            })
                    }
                    else {
                        console.log("hej");
                        errors = { brugernavn: "brugernavn er i brug" }
                        res.send(errors)
                    }
                })
        }
        else {
            console.log(errors)
            res.send(errors)
        }
    })
    server.get("/profile", (req, res) => {
        let username = req.session != undefined ? req.session.username : undefined;
        if (username != undefined) {
            sql_connection.query(`SELECT events.id, events.name ,date_format(events.time, '%d-%m-%Y') as time,events.duration,room.name as location , events.price, category.name as category, events.timestamp 
            FROM ticket 
            INNER JOIN events ON fk_events = events.id
            INNER JOIN room ON events.FK_room = room.id
            INNER JOIN category ON events.FK_category = category.id
            where ticket.fk_account = ?
            GROUP BY events.id `, [req.session.userID], (err, data) => {
                    // res.send(data);
                    res.render("pages/profile", {
                        username: username,
                        data: data
                    });
                })
        }
        else {
            res.redirect("/");
        }
    })
    server.get("/minebestillinger/:id", (req, res) => {
        let username = req.session != undefined ? req.session.username : undefined;
        if (username != undefined) {

            res.render("pages/bestilt", {
                username: username
            });

        }
        else {
            res.redirect("/");
        }
    })
    server.get("/minebestillingerinfo/:id", (req, res) => {
        console.log(req.session.userID)
        sql_connection.query(`SELECT seat,row
            FROM ticket 
            INNER JOIN events ON fk_events = events.id
            where ticket.fk_account = ? AND
            events.id = ? `, [req.session.userID, req.params.id], (err, data) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send(data);
                }
            })
    })

}