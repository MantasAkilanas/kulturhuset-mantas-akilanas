document.addEventListener("DOMContentLoaded", (event) => {
    fetch("http://localhost:3000/eventsinfo")
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            let myDiv = document.querySelector("#myDiv");
            let array = [];
            data.forEach((element) => {
                let div = document.createElement("div");
                let containerDiv = document.createElement("div");
                containerDiv.id = "containerDiv";
                let imageDiv = document.createElement("div");
                let img = document.createElement("img");
                img.src = `/img/${element.category}.png`;
                imageDiv.appendChild(img);
                containerDiv.appendChild(imageDiv)
                div.className = "col-xs-12";
                let h2 = document.createElement("h2");
                h2.textContent = element.name;
                let p = document.createElement("p");
                p.textContent = `${element.category} ${element.name} starter den ${element.time} i ${element.location} varighed ${element.duration}min og vil koste ${element.price}Kr.`
                let a = document.createElement("a")
                a.href = "/order/" + element.id;
                a.textContent = "bestil"
                div.appendChild(h2);
                div.appendChild(p);
                div.appendChild(a);
                containerDiv.appendChild(div);
                myDiv.appendChild(containerDiv);
            });
            let cat = document.querySelectorAll(".cat");
            cat.forEach((cate) => {
                cate.addEventListener("click", (event) => {
                    while (myDiv.firstChild) {
                        myDiv.removeChild(myDiv.firstChild);
                    }
                    if (cate.textContent == "alle") {
                        data.forEach((element) => {
                            let div = document.createElement("div");
                            let containerDiv = document.createElement("div");
                            containerDiv.id = "containerDiv";
                            let imageDiv = document.createElement("div");
                            let img = document.createElement("img");
                            img.src = `/img/${element.category}.png`;
                            imageDiv.appendChild(img);
                            containerDiv.appendChild(imageDiv)
                            div.className = "col-xs-12";
                            let h2 = document.createElement("h2");
                            h2.textContent = element.name;
                            let p = document.createElement("p");
                            p.textContent = `${element.category} ${element.name} starter den ${element.time} i ${element.location} varighed ${element.duration}min og vil koste ${element.price}Kr.`
                            let a = document.createElement("a")
                            a.href = "/order/" + element.id;
                            a.textContent = "bestil"
                            div.appendChild(h2);
                            div.appendChild(p);
                            div.appendChild(a);
                            containerDiv.appendChild(div);
                            myDiv.appendChild(containerDiv);
                        });
                    }
                    else {
                        data.forEach((element) => {
                            if (cate.textContent == element.category) {
                                let div = document.createElement("div");
                                let containerDiv = document.createElement("div");
                                containerDiv.id = "containerDiv";
                                let imageDiv = document.createElement("div");
                                let img = document.createElement("img");
                                img.src = `/img/${element.category}.png`;
                                imageDiv.appendChild(img);
                                containerDiv.appendChild(imageDiv)
                                div.className = "col-xs-12";
                                let h2 = document.createElement("h2");
                                h2.textContent = element.name;
                                let p = document.createElement("p");
                                p.textContent = `${element.category} ${element.name} starter den ${element.time} i ${element.location} varighed ${element.duration}min og vil koste ${element.price}Kr.`
                                let a = document.createElement("a")
                                a.href = "/order/" + element.id;
                                a.textContent = "bestil"
                                div.appendChild(h2);
                                div.appendChild(p);
                                div.appendChild(a);
                                containerDiv.appendChild(div);
                                myDiv.appendChild(containerDiv);
                            }
                        });
                    }
                })
            })
        })
});