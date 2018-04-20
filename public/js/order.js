let canvas = null;
fetch("http://localhost:3000/bestil/" + window.location.href.substr(window.location.href.lastIndexOf('/') + 1))
    .then((results) => {
        return results.json();
    })
    .then((data) => {

        canvas = new Canvas(document.querySelector("canvas"), data[0].seats, data[0].rows);
    })
document.querySelector("#buy").addEventListener("click", (event) => {
    event.preventDefault();
    canvas.bestil();
})