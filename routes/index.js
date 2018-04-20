module.exports = (server) => {
    require("./frontpage")(server)
    require("./events")(server)
    require("./search")(server)
    require("./order")(server)
    require("./datepicker")(server)
    require("./user")(server)
    require("./admin")(server)




    require("./test")(server)
}