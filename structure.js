const canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;
canvas.style.border = '2px solid black';
let electrons = 10;




function drawRings(radius, rings) {
    let x = canvas.width/2;
    let y = canvas.height/2
    for (let i = 0; i <= rings; i++) {
        c.beginPath();
        c.arc(x, y,i * radius, 0 , 2 * Math.PI, false);
        c.strokeStyle = 'black';
        c.stroke();
    }
    drawParticles(electrons, radius)
}


    drawRings(17, 8);


function drawParticles(count, width) {
    for (let i = 0; i < count; i++) {
        let radians = Math.PI * 2 / count
        let x = Math.cos(radians * i) * width + canvas.width/2;
        let y = Math.sin(radians * i) * width + canvas.height/2
        c.beginPath();
        c.arc(x, y, 3, 0, 2 * Math.PI, false);
        c.fillStyle = 'black';
        c.fill()
    }
}




// function drawAtom(radius) {
//     for (let i = 0; i <= 8; i++) {
//         c.beginPath();
//         c.arc(canvas.width/2, canvas.height/2, radius * i, 0, 2 * Math.PI, false);
//         c.strokeStyle = 'black';
//         c.stroke()
//     }
// }


// drawAtom(18)
