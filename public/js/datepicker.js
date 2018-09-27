let currentDate = new Date;
let month = currentDate.getMonth();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let year = 2018;
let currentPage = 1;
let td = document.querySelectorAll("td");
let categories = document.querySelectorAll(".cat");
let lastselected = null;
let currentCategory = "alle";
categories.forEach((element) => {
    if (element.textContent == currentCategory) {
        element.style.color = "red";
    }
    element.addEventListener("click", (event) => {
        currentCategory = element.textContent;
        fetchInfo(lastselected);
        categories.forEach((thing) => {
            thing.style.color = "blue";
        })
        element.style.color = "red";
    })
})
document.querySelector("#next").addEventListener("click", (event) => {
    if (month == 11) {
        year++;
        month = 0;
    }
    else {

        month++;
    }
    datepicker();
    clearTd();

})
document.querySelector("#previous").addEventListener("click", (event) => {
    if (month == 0) {
        year--;
        month = 11;
    }
    else {
        month--;
    }
    datepicker();
    clearTd();

})

function datepicker() {
    let day = 1;
    let date = new Date(year, month, day);
    document.querySelector("h3").textContent = `${year}-${month + 1}`
    let week = 0
    let td = document.querySelectorAll("td");
    td.forEach((element) => {
        element.textContent = "";
    })
    while (date.getMonth() == month) {
        let tempday = 0;
        let tempmonth = 0;
        let currentTarget = document.querySelector(`[data-day="${date.getDay()}"][data-week="${week}"]`)
        if (date.getDate() < 10) {
            tempday = "0" + date.getDate()
        }
        else {
            tempday = date.getDate();
        }
        if (date.getMonth() + 1 < 10) {
            tempmonth = "0" + (date.getMonth() + 1);
        }
        else {
            tempmonth = Number(date.getMonth()) + 1;
        }

        currentTarget.textContent = tempday;
        currentTarget.dataset.month = tempmonth;
        currentTarget.dataset.year = date.getFullYear();
        if (currentTarget.textContent == currentDay && currentTarget.dataset.month == Number(currentMonth) + 1) {
            currentTarget.style.color = "red";

            lastselected = currentTarget
        }
        currentTarget.addEventListener("click", (event) => {

            clearTd();
            lastselected = currentTarget;
            fetchInfo(event.target)
        })
        day++;
        date = new Date(year, month, day);
        if (date.getDay() == 0 && date.getDate != 0) {
            week++;
        }

    }
    td.forEach((element) => {
        element.addEventListener("mouseover", (event) => {
            if (event.target.style.color != "blue" && event.target.style.color != "red") {
                event.target.style.color = "yellow";
            }
        })
        element.addEventListener("mouseleave", (event) => {
            if (event.target.style.color != "blue" && event.target.style.color != "red") {
                event.target.style.color = "black";
            }
        })
    })


}
function fetchInfo(target) {
    let url = null;
    if (target != undefined) {
        if (target.style.color != "red") {
            target.style.color = "blue";
        }
        url = "http://mantarias.com/datesearch/" + `${target.dataset.year}-${target.dataset.month}-${target.textContent}`
    }
    else {
        url = "http://mantarias.com/datesearch/" + `${currentDate.getFullYear()}-${Number(currentDate.getMonth()) + 1}-${currentDate.getDate()}`
    }
    fetch(url)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            currentPage = 1;
            let itemid = 1;
            let myDiv = document.querySelector("#myDiv");
            while (myDiv.firstChild) {
                myDiv.removeChild(myDiv.firstChild);
            }
            if (data.length > 0) {
                if (currentCategory == "alle") {
                    data.forEach((element, index) => {
                        let div = document.createElement("div");
                        let containerDiv = document.createElement("div");
                        containerDiv.id = "containerDiv";
                        let imageDiv = document.createElement("div");
                        let img = document.createElement("img");
                        img.src = `/img/${element.category}.png`;
                        imageDiv.appendChild(img);
                        containerDiv.appendChild(imageDiv)
                        div.className = "col-xs-12";
                        containerDiv.dataset.page = itemid;
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
                        if (((index + 1) % 7) == 0) {
                            itemid++;
                        }
                        document.querySelector("#landscape").style.display = "none";
                    });
                }
                else {
                    data.forEach((element, index) => {
                        if (element.category == currentCategory) {
                            let div = document.createElement("div");
                            let containerDiv = document.createElement("div");
                            containerDiv.id = "containerDiv";
                            let imageDiv = document.createElement("div");
                            let img = document.createElement("img");
                            img.src = `/img/${element.category}.png`;
                            imageDiv.appendChild(img);
                            containerDiv.appendChild(imageDiv)
                            div.className = "col-xs-12";
                            containerDiv.dataset.page = itemid;
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
                            if (((index + 1) % 7) == 0) {
                                itemid++;
                            }
                            document.querySelector("#landscape").style.display = "none";
                        }
                    });
                }
            }
            else {
                let p = document.createElement("p");
                p.textContent = "der var ikke fundet noget for den her dato!";
                myDiv.appendChild(p);
                document.querySelector("#landscape").style.dispaly = "inherit";

            }
            addButtons(itemid);
        })
}

document.addEventListener("DOMContentLoaded", (event) => {
    datepicker();
    fetchInfo();
})
function clearTd() {
    td.forEach((element) => {
        if (element.style.color != "red") {
            element.style.color = "black";
        }
        if (element.dataset.month != currentMonth) {
            element.style.color = "black";
        }
    })
}
function addButtons(itemid) {
    if (itemid > 1) {
        let controlDiv = document.createElement("div");
        controlDiv.id = "controlDiv";
        let previousPage = document.createElement("a");
        previousPage.textContent = "forrige side";
        previousPage.href = "#"
        controlDiv.appendChild(previousPage);
        let p = document.createElement("p");
        p.textContent = currentPage;
        controlDiv.appendChild(p);
        let nextPage = document.createElement("a");
        nextPage.textContent = "næste side";
        nextPage.href = "#";
        controlDiv.appendChild(nextPage);
        myDiv.appendChild(controlDiv);
        let currentElements = document.querySelectorAll(`[data-page="${currentPage}"]`);
        console.log(currentPage);
        previousPage.addEventListener("click", () => {

            nextPage.style.visibility = "visible";
            if (currentPage >= 1) {
                currentElements = document.querySelectorAll(`[data-page="${currentPage}"]`);
                currentElements.forEach((element) => {
                    element.style.display = "none";
                })
                console.log(currentPage)
                if (currentPage > 1) {
                    currentPage--;
                }
                currentElements = document.querySelectorAll(`[data-page="${currentPage}"]`);
                console.log(currentPage)
                currentElements.forEach((element) => {
                    element.style.display = "flex";
                })
                if (currentPage == 1) {
                    previousPage.style.visibility = "hidden";
                }
                p.textContent = currentPage;
            }

        })
        previousPage.style.visibility = "hidden";
        nextPage.addEventListener("click", () => {
            previousPage.style.visibility = "visible";
            let nextElements = document.querySelectorAll(`[data-page="${currentPage + 1}"]`);
            if (nextElements.length > 0) {
                currentElements.forEach((element) => {
                    currentElements = document.querySelectorAll(`[data-page="${currentPage}"]`);
                    element.style.display = "none";
                })
                currentPage++;
                currentElements = document.querySelectorAll(`[data-page="${currentPage}"]`);
                currentElements.forEach((element) => {
                    element.style.display = "flex";
                })
                if (document.querySelectorAll(`[data-page="${currentPage + 1}"]`).length == 0) {
                    nextPage.style.visibility = "hidden";
                }
                p.textContent = currentPage;
            }
        })
    }
}