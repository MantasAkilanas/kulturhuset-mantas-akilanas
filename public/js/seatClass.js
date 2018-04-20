class Seat {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "blue";
        this.marked = false;
        this.selected = false;
        this.taken = false;
        this.takenSeat();
    }
    drawMe(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
    takenSeat() {
        if (this.taken == true) {
            color = "red";  
        }
    }
}