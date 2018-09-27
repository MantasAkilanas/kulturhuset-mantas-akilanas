document.addEventListener("DOMContentLoaded", () => {
    validation = new Validation();
})

class Validation {
    constructor() {
        this.succes = true;
        this.form = document.querySelector("#form");
        this.inputs = document.querySelectorAll("#form input");
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.succes = true;

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.obj = JSON.stringify({
                name: this.inputs[0].value,
                lastname: this.inputs[1].value,
                phone: this.inputs[2].value,
                username: this.inputs[4].value,
                password: this.inputs[5].value,
                email: this.inputs[3].value
            });
            let init = {
                method: 'POST',
                headers: headers,
                body: this.obj,
                cache: 'no-cache',
                mode: 'cors'
            };
            fetch("http://localhost:3000/signup", init)
                .then((respose) => {
                    return respose.json();
                })
                .then((data) => {
                    this.inputs.forEach((element) => {
                        this[`${element}found`] = false;
                        for (let key in data) {
                            if (key == element.placeholder) {
                                this[`${element}found`] = true;
                                if (element.parentElement.lastChild != this[`p${element.placeholder}`]) {


                                    this[`p${element.placeholder}`] = document.createElement("p");
                                    this[`p${element.placeholder}`].textContent = data[key];
                                    this[`p${element.placeholder}`].className = "alertP"
                                    element.parentElement.appendChild(this[`p${element.placeholder}`]);
                                }
                            }
                            if(key == "url"){
                                window.location.assign("http://localhost:3000/login")
                            }
                        }
                        if (this[`${element}found`] != true && element.parentElement.lastChild == this[`p${element.placeholder}`]) {
                            element.parentElement.removeChild(this[`p${element.placeholder}`])
                        }

                    })
                })


        })
    }

}