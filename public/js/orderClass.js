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
        this.seatSelectorElement = document.querySelector("select");
        this.seatsNumber = this.seatSelectorElement.value;
        this.seatsMarked = 0;
        this.ordering = [];
        this.alerted = false;
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
        fetch("http://localhost:3000/bestilt/" + window.location.href.substr(window.location.href.lastIndexOf('/') + 1))
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                if (data != []) {
                    data.forEach((element) => {
                        this[`row${element.row - 1}`][element.seat - 1].color = "red";
                        this[`row${element.row - 1}`][element.seat - 1].taken = true;
                        this[`row${element.row - 1}`][element.seat - 1].drawMe(this.ctx)
                    })
                }
            })
        this.addEvents()
    }
    addEvents() {
        this.canvas.addEventListener("mousemove", (event) => {
            this.allRows.forEach((row) => {

                row.forEach((seat, index) => {
                    if (seat.selected != true && seat.taken != true) {
                        seat.color = "blue";
                    }
                    else if (seat.selected == true) {
                        seat.color = "green";
                    }
                    else if (seat.taken == true) {
                        seat.color = "red";
                    }
                    seat.marked = false;
                })
            })
            this.allRows.forEach((row) => {

                row.forEach((seat, index) => {
                    seat.drawMe(this.ctx)


                    if (this.positionLeft + seat.x <= event.clientX && this.positionLeft + seat.x + seat.width >= event.clientX &&
                        this.positionTop + seat.y <= event.clientY && this.positionTop + seat.y + seat.height >= event.clientY) {
                        if (Number(this.seatsNumber) + index <= row.length) {
                            for (let seatCounter = 0; seatCounter < this.seatsNumber; seatCounter++) {
                                row[index + seatCounter].color = "yellow";
                                row[index + seatCounter].drawMe(this.ctx);

                                row[index + seatCounter].marked = true;

                            }
                        }
                        else {
                            for (this.seatsMarked = 0; index + 1 + this.seatsMarked <= row.length; this.seatsMarked++) {
                                row[index + this.seatsMarked].color = "yellow";
                                row[index + this.seatsMarked].drawMe(this.ctx);

                                row[index + this.seatsMarked].marked = true;

                            }
                            for (let seatCounter = 1; this.seatsNumber - this.seatsMarked > 0; seatCounter++ && this.seatsMarked++) {
                                row[index - seatCounter].color = "yellow";
                                row[index - seatCounter].drawMe(this.ctx);

                                row[index - seatCounter].marked = true;

                            }

                        }
                    }
                })
            })
        })
        this.canvas.addEventListener("click", (event) => {
            this.wantToOder = [];
            this.allRows.forEach((row) => {
                row.forEach((seat) => {
                    if (seat.selected == true) {
                        seat.color = "blue";
                        seat.selected = false;
                        this.ordering = []


                    }
                })
            })
            this.allRows.forEach((row, rowIndex) => {
                row.forEach((seat, index) => {
                    if (seat.marked == true) {
                        this.wantToOder.push({ row: rowIndex + 1, seat: index + 1 })
                    }
                })
            })
            this.occupied = false;

            this.wantToOder.forEach((element, index) => {
                if (this[`row${element.row - 1}`][element.seat - 1].taken == true) {
                    this.occupied = true;
                }
            })
            console.log(this.occupied);
            if (this.occupied == false) {
                console.log("   ")
                this.wantToOder.forEach((element, index) => {
                    if (this.wantToOder[this.wantToOder.length - 1].seat == this.seatsNumber) {
                        if (this[`row${element.row - 1}`][Number(this.wantToOder[this.wantToOder.length - 1].seat) + 1].taken == true
                            && this[`row${element.row - 1}`][Number(this.wantToOder[this.wantToOder.length - 1].seat)].taken == false) {
                            console.log("if 1")
                        }

                        else {
                            this[`row${element.row - 1}`][element.seat - 1].color = "green";
                            this[`row${element.row - 1}`][element.seat - 1].selected = true;
                            this[`row${element.row - 1}`][element.seat - 1].drawMe(this.ctx);
                            this.ordering.push(JSON.stringify({ row: element.row, seat: element.seat }));
                        }
                    }
                    else if (this[`row${element.row - 1}`].length == this.wantToOder[this.wantToOder.length - 1].seat) {
                        if (this[`row${element.row - 1}`][Number(this.wantToOder[0].seat) - 3].taken == true
                            && this[`row${element.row - 1}`][Number(this.wantToOder[0].seat) - 2].taken == false) {
                            console.log("if 3")
                        } else {
                            this[`row${element.row - 1}`][element.seat - 1].color = "green";
                            this[`row${element.row - 1}`][element.seat - 1].selected = true;
                            this[`row${element.row - 1}`][element.seat - 1].drawMe(this.ctx);
                            this.ordering.push(JSON.stringify({ row: element.row, seat: element.seat }));
                        }
                    }
                    else if (this[`row${element.row - 1}`][Number(this.wantToOder[0].seat) - 3] == undefined
                        && this[`row${element.row - 1}`][Number(this.wantToOder[this.wantToOder.length - 1].seat)].taken == false) {
                        return;
                    }
                    else if (this[`row${element.row - 1}`][Number(this.wantToOder[this.wantToOder.length - 1].seat) + 1] == undefined
                        && this[`row${element.row - 1}`][Number(this.wantToOder[this.wantToOder.length - 1].seat)].taken == false) {
                        return;

                    }

                    else if (this[`row${element.row - 1}`][Number(this.wantToOder[this.wantToOder.length - 1].seat) + 1] == undefined) {
                    }
                    else if (this[`row${element.row - 1}`][Number(this.wantToOder[this.wantToOder.length - 1].seat) + 1].taken == true
                        && this[`row${element.row - 1}`][Number(this.wantToOder[this.wantToOder.length - 1].seat)].taken == false) {
                        return
                    }
                    if (this[`row${element.row - 1}`][Number(this.wantToOder[0].seat) - 3] == undefined) {
                    }
                    else if (this[`row${element.row - 1}`][Number(this.wantToOder[0].seat) - 3].taken == true
                        && this[`row${element.row - 1}`][Number(this.wantToOder[0].seat) - 2].taken == false) {
                        return;
                    }
                    if (this.seatsNumber == 1 &&
                        this[`row${element.row - 1}`][Number(this.wantToOder[this.wantToOder.length - 1].seat) + 1] == undefined &&
                        this[`row${element.row - 1}`][Number(this.wantToOder[0].seat) - 2].taken == true) {
                        return
                    }
                    else {
                        this[`row${element.row - 1}`][element.seat - 1].color = "green";
                        this[`row${element.row - 1}`][element.seat - 1].selected = true;
                        this[`row${element.row - 1}`][element.seat - 1].drawMe(this.ctx);
                        this.ordering.push(JSON.stringify({ row: element.row, seat: element.seat }));
                    }
                    // else if (this[`row${element.row - 1}`][this.wantToOder[0].seat]) {

                    // }
                    // this[`row${element.row - 1}`][element.seat - 1].color = "green";
                    // this[`row${element.row - 1}`][element.seat - 1].selected = true;
                    // this[`row${element.row - 1}`][element.seat - 1].drawMe(this.ctx);
                    // this.ordering.push(JSON.stringify({ row: element.row, seat: element.seat }));

                })
            }
        })

        this.seatSelectorElement.addEventListener("change", (event) => {
            this.seatsNumber = this.seatSelectorElement.value;
        })
    }
    bestil() {
        this.ordering.forEach((element) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let init = {
                method: 'POST',
                headers: headers,
                body: `${element}`,
                credentials: 'include',
                cache: 'no-cache',
                mode: 'cors'
            };
            fetch("http://localhost:3000/doorder/" + window.location.href.substr(window.location.href.lastIndexOf('/') + 1), init)
                .then((results) => {
                    return results.json();
                })
                .then((data) => {
                    console.log(data)
                    if (data != []) {
                        if (this.alerted == false) {

                            alert(data.message);
                            this.alerted = true;
                        }

                        document.location.reload()
                    }

                })
        })
    }


}