document.querySelector("#date").addEventListener("change", (event) => {
    fetchData();
})
document.addEventListener("DOMContentLoaded", () => {
    let date = new Date;
    let month;
    if (date.getMonth() < 10) {
        month = "0" + Number(date.getMonth() + 1)
    }
    else {
        month = date.getMonth();
    }
    let day;
    if (date.getDate() < 10) {
        day = "0" + date.getDate()
    }
    else {
        day = date.getDate();
    }
    document.querySelector("#date").value = `${date.getFullYear()}-${month}-${day}`;
    fetchData();
})
function fetchData() {
    fetch("http://localhost:3000/datesearch/" + document.querySelector("#date").value)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            let myDiv = document.querySelector("#myDiv");
            while (myDiv.firstChild) {
                myDiv.removeChild(myDiv.firstChild);
            }
            console.log(data);
            if (data.length > 0) {
                data.forEach((element, index) => {
                    let div = document.createElement("a");
                    div.href = "/adminedit/"+ element.id;
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
                let p = document.createElement("p");
                p.textContent = "der var ikke fundet noget for den her dato!";
                myDiv.appendChild(p);
            }
        })
}