const canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400

canvas.style.border = '2px solid black';

class generateElectron {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;

        this.drawElectrons = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
        };
        this.drawRings = function () {
            c.beginPath();
            c.arc(canvas.width/2, canvas.height/2, 30, 0, Math.PI * 2, false);
            c.strokeStyle = this.color;
            c.stroke()
        }
    }
}

let electrons = [];
let count = 18

function init() {
    let radians = Math.PI * 2 / count
    for (let i = 0; i < count; i++) {
        radians += Math.PI * 4.5 / count
        let x = canvas.width/2 + Math.cos(radians) * 30
        let y = canvas.height/2 + Math.sin(radians) * 30
        let leftovers = electrons.slice(1, 8);
        leftovers.forEach(() => {
            x = canvas.width/2 + Math.cos(radians) * 60;
            y = canvas.height/2 + Math.sin(radians) * 60;
        })
        let leftovers2 = electrons.slice(9, count);
        leftovers2.forEach(() => {
            x = canvas.width/2 + Math.cos(radians) * 90;
            y = canvas.height/2 + Math.sin(radians) * 90;
        })
        electrons.push(new generateElectron(x, y, 5, 'black'))
    }
    electrons.forEach(electron => {
        electron.drawElectrons()
        electron.drawRings()
    })
}


init()