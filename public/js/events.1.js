document.addEventListener("DOMContentLoaded", (event) => {
    fetch("http://localhost:3000/eventsinfo")
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            let myDiv = document.querySelector("#myDiv");
            let array = [];
            data.forEach((element) => {
                if (array.indexOf(element.category) == -1) {
                    array.push(element.category);
                }
                let div = document.createElement("div");
                div.className = "col-xs-12";
                let h2 = document.createElement("h2");
                h2.textContent = element.name;
                let p = document.createElement("p");
                p.textContent = `${element.category} ${element.name} starter den ${element.time} i ${element.location} varighed ${element.duration}min og vil koste ${element.price}Kr.`
                div.appendChild(h2);
                div.appendChild(p);
                myDiv.appendChild(div);
            });
            let categorySelector = document.querySelector("#categorySelector")
            let select = document.createElement("select");
            let option = document.createElement("option");
            option.textContent = "alle";
            option.value = "alle";
            select.appendChild(option);
            array.forEach((element) => {
                option = document.createElement("option");
                option.textContent = element;
                option.value = element;
                select.appendChild(option);
            })
            select.addEventListener("change", (event) => {
                while (myDiv.firstChild) {
                    myDiv.removeChild(myDiv.firstChild);
                }
                if (select.value == "alle") {
                    data.forEach((element) => {
                        let div = document.createElement("div");
                        div.className = "col-xs-12";
                        let h2 = document.createElement("h2");
                        h2.textContent = element.name;
                        let p = document.createElement("p");
                        p.textContent = `${element.category} ${element.name} starter den ${element.time} i ${element.location} varighed ${element.duration}min og vil koste ${element.price}Kr.`
                        div.appendChild(h2);
                        div.appendChild(p);
                        myDiv.appendChild(div);

                    });

                }
                else {
                    data.forEach((element) => {
                        if (select.value == element.category) {
                            let div = document.createElement("div");
                            div.className = "col-xs-12";
                            let h2 = document.createElement("h2");
                            h2.textContent = element.name;
                            let p = document.createElement("p");
                            p.textContent = `${element.category} ${element.name} starter den ${element.time} i ${element.location} varighed ${element.duration}min og vil koste ${element.price}Kr.`
                            div.appendChild(h2);
                            div.appendChild(p);
                            myDiv.appendChild(div);
                        }
                    });
                }
            })
            categorySelector.appendChild(select);
        })

});