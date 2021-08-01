const canvas = document.querySelector("canvas.loader");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event listeners
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

c.translate(canvas.width/2, canvas.height/2);

class YinYang {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = null;
        this.miniColor = null;
        this.radians = Math.PI * 2 / 2;
        this.counter = 0;

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();

            c.beginPath();
            c.arc(this.x, this.y, this.radius / 3, 0, Math.PI * 2, false);
            c.fillStyle = this.miniColor;
            c.fill()
        };

        this.update = function () {
            this.counter += 0.05
            for (let i = 1; i <= 2; i++) {
                this.x = x + Math.cos(this.radians * i + this.counter) * this.radius;
                this.y = y + Math.sin(this.radians * i + this.counter) * this.radius;
                this.color = i == 1 ? "black" : "white";
                this.miniColor = i == 1 ? "white" : "black";
                this.draw();
            }
        };
    }
}

let yinYang = new YinYang(0, 0, 60);

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255, 255, 255, 0.007)'
    c.fillRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
    
    yinYang.update()
}

animate();