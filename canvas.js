const canvas = document.querySelector("canvas#background");
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2
}

//  Event Listeners
window.addEventListener("mousemove", function(e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});
window.addEventListener("resize", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init()
});

class Circle {
	constructor(x, y, dfc, color) {
		this.timer = 0;
		this.x = 0;
		this.y = 0;
		this.xDelay = mouse.x;
		this.yDelay = mouse.y;
		this.dfc = dfc;

		this.update = function () {
			this.timer += 0.05;

			this.xDelay += (mouse.x - this.xDelay) * 0.06;
			this.yDelay += (mouse.y - this.yDelay) * 0.06;

			this.x = this.xDelay + Math.cos(this.timer) * this.dfc + x;
			this.y = this.yDelay + Math.sin(this.timer) * this.dfc + y;

			// Prevent circles from going off screen
			this.x = Math.max(Math.min(this.x, canvas.width), 0);
			this.y = Math.max(Math.min(this.y, canvas.height), 0);

			this.draw();
		};

		this.draw = function () {
			c.beginPath();
			c.fillStyle = color;
			c.arc(this.x, this.y, 15, 0, 2 * Math.PI, true);
			c.fill();
			c.closePath();
		};
	}
}

let circles
function init() {
	circles = [];
	const red = "hsl(0, 100%, 60%)";
	const blue = "hsl(250, 100%, 60%)";
	const green = "hsl(130, 100%, 60%)"
	circles.push(new Circle(0, -100, 50, red));
	circles.push(new Circle(100, -50, 50, green));
	circles.push(new Circle(100, 50, 50, blue));
	circles.push(new Circle(0, 100, 50, red));
	circles.push(new Circle(-100, 50, 50, green));
	circles.push(new Circle(-100, -50, 50, blue))
}

function animate() {
    requestAnimationFrame(animate);

	c.fillStyle = 'rgba(0,0,0,0.2)';
	c.fillRect(0,0,canvas.width,canvas.height);

	circles.forEach(circle => {
		circle.update()
	})
  
}
init()
animate();
