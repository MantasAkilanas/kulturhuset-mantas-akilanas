form = document.querySelector("form")
form.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault();
    let data = new FormData(form);
    let init = {
        method: 'post',
        body: data,
        cache: 'no-cache'
    };
    console.log(data)
    let request = new Request(`http://localhost:3000/upload`, init);

    fetch(request)

})