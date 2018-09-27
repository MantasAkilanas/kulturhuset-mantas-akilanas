let mongo = require("../services/mongo")
module.exports = (server) => {
    server.post("/newsletter", (req, res) => {
        mongo.register(req.body.email, res)

    })
    server.get("/removeNewsletter/:id", (req, res) => {
        mongo.remove(req.params.id, res)
    })
    server.get("/confirmNewsletter/:id", (req, res) => {
        mongo.confirm(req.params.id, res)
    })
}