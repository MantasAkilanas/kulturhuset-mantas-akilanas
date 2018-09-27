document.querySelector("#tildmeld").addEventListener("click", (event) => {
    event.preventDefault();
    let div = document.createElement("div");
    div.id = "popUp";
    let x = document.createElement("a");
    x.textContent = "x";
    x.addEventListener("click", (event) => {
        div.style.display = "none";
    })
    div.appendChild(x)
    let h2 = document.createElement("h2");
    h2.textContent = "Tildmeld dig vores nyhedsbrev!"
    div.appendChild(h2)
    let emailInput = document.createElement("input");
    emailInput.placeholder = "email";
    div.appendChild(emailInput)
    let button = document.createElement("button");
    button.textContent = "tildmed"
    div.appendChild(button);
    button.addEventListener("click", (event) => {
        event.preventDefault();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let init = {
            method: 'POST',
            headers: headers,
            body: `{"email":"${emailInput.value}"}`,
            cache: 'no-cache',
            mode: 'cors'
        };
        fetch("http://localhost:3000/newsletter/", init)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }
                let x = document.createElement("a");
                x.textContent = "x";
                x.addEventListener("click", (event) => {
                    div.style.display = "none";
                })
                let h2 = document.createElement("h2")
                h2.textContent = data.message;
                div.appendChild(x)
                div.appendChild(h2)
            })
    })
    let x2 = document.createElement("a");
    x2.textContent = "Nej tak!";
    x2.addEventListener("click", (event) => {
        div.style.display = "none";
    })
    div.appendChild(x2)
    document.body.appendChild(div);
    document.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            div.style.display = "none";
        }
    })
    // if (document.querySelector("#checkbox").checked == true){
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     let init = {
    //         method: 'POST',
    //         headers: headers,
    //         body: `{"email":"${document.querySelector("#email").value}"}`,
    //         cache: 'no-cache',
    //         mode: 'cors'
    //     };
    //     fetch("http://localhost:3000/newsletter/", init)
    //             .then((results) => {
    //                 return results.json();
    //             })
    //             .then((data) => {
    //                 console.log(data)

    //             })
    // }
})