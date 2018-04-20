document.querySelector("#editForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let init = {
        method: 'PUT',
        headers: headers,
        body: `{"name":"${document.querySelector("#name").value}","time":"${document.querySelector("#time").value}","duration":"${document.querySelector("#duration").value}","location":"${document.querySelector("#location").value}","price":"${document.querySelector("#price").value}","category":"${document.querySelector("#category").value}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };
    fetch("http://localhost:3000/editevent/" + window.location.href.substr(window.location.href.lastIndexOf('/') + 1), init)
})