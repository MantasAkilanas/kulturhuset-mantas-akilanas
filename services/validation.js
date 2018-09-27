class Validation {
    constructor() {
        this.emailRegEx = new RegExp(/[a-z0-9|!#$%&'*+\-\/=?^_`{|}~]+(.?[a-z0-9|!#$%&'*+\-\/=?^_`{|}~]+)*@([a-zA-Z0-9\-]{2,10})(\.[a-z]{2,3})/);
    }
    validate(reqValues) {
        this.req = reqValues;
        this.obj = {}
        for (let key in this.req) {
            if (key == "email") {
                if (!this.emailRegEx.test(this.req[key])) {
                    this.obj.email = "email møder ikke op til krav"

                }
            }
            else if (key == "name") {
                if (!this.validateLength(this.req[key], 2)) {
                    this.obj.navn = "navn er for kort";
                }
            }
            else if (key == "lastname") {
                if (!this.validateLength(this.req[key], 4)) {
                    this.obj.efternavn = "efternavn er for kort";
                }
            }
            else if (key == "phone") {
                if (this.req[key].length != 8) {
                    this.obj.mobil = "telefon numre skal være 8 tal lang";
                }
            }
            else if (key == "password") {
                if (!this.validateLength(this.req[key], 4)) {
                    this.obj.password = "password er for kort";
                }
            }
            else if (key == "username") {
                if (!this.validateLength(this.req[key], 4)) {
                    this.obj.brugernavn = "brugernavn er for kort";
                }
            }

        }
        return this.obj;
    }
    validateLength(text, length = 4) {
        if (text.length < length) {
            return false;
        }
        else {
            return true;
        }
    }
}
module.exports = new Validation();