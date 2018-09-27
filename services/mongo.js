var MongoClient = require('mongodb').MongoClient;
var nodeMailer = require("./nodeMailer");
class Mongo {
    async register(email, res) {
        try {
            MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true }, (err, db) => {
                db.db("kulturhuset").collection("newsletter").findOne({ email: email }, (err, usernameCheck) => {
                    if (err) {
                        throw err;
                    }
                    else if (usernameCheck == null) {
                        db.db("kulturhuset").collection("newsletter").insertOne({ email: email }, (err, results) => {
                            if (err) {
                                throw err;
                            }
                            else {
                                res.json({ message: "Tak for din tilmelding!" })
                                nodeMailer.sendEmail(email);
                                console.log(1)
                                this[`${email}time`] = 0;
                                console.log(2)

                                this[`${email}interval`] = setInterval(() => {
                                    console.log(3 + " " + this[`${email}time`])
                                    this[`${email}time`]++;
                                    if (this[`${email}time`] > 60) {
                                        console.log(4)
                                        try {
                                            MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true }, (err, db) => {
                                                db.db("kulturhuset").collection("newsletter").findOne({ email: email }, (err, usernameCheck) => {
                                                    if (err) {
                                                        throw err;
                                                    }
                                                    else {
                                                        db.db("kulturhuset").collection("newsletter").remove({ email: email }, (err, results) => {
                                                            if (err) {
                                                                throw err;
                                                            }
                                                        })
                                                    }
                                                })
                                            })
                                        }
                                        catch (e) {
                                            console.log("something went wrong with removing a newsletter email " + e)
                                        }
                                        console.log(5)
                                        clearInterval(this[`${email}interval`]);
                                        console.log(6)
                                    }
                                }, 1000)
                            }
                        })
                    }
                    else {
                        res.json({ message: "email allerede registreret!" })
                    }
                })
            })
        }
        catch (e) {
            console.log("something went wrong with adding a new newsletter email " + e)
        }
    }
    async remove(email, res) {
        try {
            MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true }, (err, db) => {
                db.db("kulturhuset").collection("newsletter").findOne({ email: email }, (err, usernameCheck) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        db.db("kulturhuset").collection("newsletter").remove({ email: email }, (err, results) => {
                            if (err) {
                                throw err;
                            }
                            else {
                                res.redirect("http://localhost:3000/")
                            }
                        })
                    }
                })
            })
        }
        catch (e) {
            console.log("something went wrong with removing a newsletter email " + e)
        }
    }
    async confirm(email, res) {
        clearInterval(this[`${email}interval`]);
        res.redirect("http://localhost:3000/")
    }
}
module.exports = new Mongo();