class Canvas {
    constructor(canvas, seats, rows) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.canvas.width = 1100;
        this.canvas.height = 500;
        this.positionRight = this.canvas.getBoundingClientRect().right;
        this.positionLeft = this.canvas.getBoundingClientRect().left;
        this.positionTop = this.canvas.getBoundingClientRect().top;
        this.allRows = []
        this.seatsMarked = 0;
        this.ordering = [];
        this.wantToOder = [];
        this.occupied = false;
        for (let row = 0; row < rows; row++) {
            this[`row${row}`] = [];
            for (let seat = 0; seat < seats; seat++) {
                let currentSeat = new Seat(canvas.width / seats * seat, canvas.height / rows * row, 50, 50);
                this[`row${row}`].push(currentSeat);
                currentSeat.drawMe(this.ctx);
            }
            this.allRows.push(this[`row${row}`])
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let init = {
            method: 'GET',
            headers: headers,
            credentials: 'include',
            cache: 'no-cache',
            mode: 'cors'
        };
        let url = "http://mantarias.com/minebestillingerinfo/" + window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
    
        fetch(url, init)
            .then((results) => {
                let result = results.json()
                console.log(result)
                return result;
            })
            .then(data => {
                if (data != []) {
                    console.log('hej', data)
                    data.forEach((element) => {
                        this[`row${element.row - 1}`][element.seat - 1].color = "white";
                        this[`row${element.row - 1}`][element.seat - 1].taken = true;
                        this[`row${element.row - 1}`][element.seat - 1].drawMe(this.ctx)
                    })
                }
            })
        
            fetch("http://mantarias.com/bestilt/" + window.location.href.substr(window.location.href.lastIndexOf('/') + 1))
                .then((results) => {
                    return results.json();
                })
                .then((data) => {
                    if (data != []) {
                        data.forEach((element) => {
                            if (this[`row${element.row - 1}`][element.seat - 1].color != "white") {
                                this[`row${element.row - 1}`][element.seat - 1].color = "red";
                                this[`row${element.row - 1}`][element.seat - 1].taken = true;
                                this[`row${element.row - 1}`][element.seat - 1].drawMe(this.ctx)
                            }
                        })
                    }
                })
        
    }
}