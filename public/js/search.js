document.querySelector("#search").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(document.querySelector("#searchInput").value)
    window.location = "/search/"+ document.querySelector("#searchInput").value
})