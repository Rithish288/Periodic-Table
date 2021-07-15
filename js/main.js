"use strict";
const periodicTable = document.getElementById("periodic-Table");

//Acessing the dom ↑ ↑ ↑


const tabs = document.querySelectorAll("[data-targets]");
const tabContent = document.querySelectorAll("[data-tab-content]");
periodicTable.removeAttribute("data-tab-content");
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        let target = document.querySelector(tab.dataset.targets);
        tabContent.forEach((tabCont) => {
            tabCont.setAttribute("data-tab-content", "");
        });
        tabs.forEach((tab) => {
            tab.classList.remove("open");
        });
        tab.classList.add("open");
        target.removeAttribute("data-tab-content");
    });
});



let jsonData = fetch("PeriodicTable.json"); //Fetching data
jsonData
.then((response) => {
    return response.json();
})

.then((elements) => {
    elements.forEach((element, i) => {
        //Creating a div for each object
        const elem = document.createElement("div");
        let id = (i += 1);
        elem.className = "element" + " n" + id + " " + element.category;
        elem.innerHTML =
        '<p class="number">' +
        element.atomicNumber +
        "</p>" +
        "<h1>" +
        element.symbol +
        "</h1>" +
        "<p>" +
        element.name +
        "</p>";
        periodicTable.appendChild(elem);
        
        //Event listeners
        elem.addEventListener("click", () => {
            window.open('details.html', '_self')
            if (id == element.atomicNumber) {
                let pairs = {
                    atomicNumber: element.atomicNumber, 
                    name: element.name, 
                    atomicMass: element.atomicMass, 
                    symbol: element.symbol, 
                    discovered: element.discovered, 
                    appearance: element.appearance,
                    boilingPoint: element.boilingPoint,
                    meltingPoint: element.meltingPoint,
                    discoveredBy: element.discoveredBy,
                    density: element.density,
                    category: element.category,
                    state: element.state,
                    shells: element.shells,
                    description: element.description
                };
                
                for (let key in pairs) {
                    sessionStorage.setItem(key, pairs[key]);
                    console.log(pairs[key])
                }
            }
        });
        elem.addEventListener('mouseenter', () => {
            let canvas2 = document.getElementById('hover-structure')
            if(id == element.atomicNumber) {
                drawStructure(canvas2,
                    element.shells,
                    element.symbol,
                    3.8, '15px')
                    canvas2.style.visibility = 'visible';
                }
            })
            elem.addEventListener('mouseleave', () => {
                let canvas2 = document.getElementById('hover-structure')
                canvas2.style.visibility = 'hidden'
            })
        });
    });
    
    
    
    function drawStructure(canvas, array, text, electronSize, textSize) {
        let c = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 300;

    class Atom {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.ringRadius = radius;
            this.radi = canvas.height / 2.2 / array.length;
            
            this.drawRings = function () {
                for (let shells = 0; shells <= array.length; shells++) {
                    c.beginPath();
                    c.arc(this.x,this.y,this.ringRadius * shells,0,Math.PI * 2,false);
                    c.strokeStyle = this.color;
                    c.stroke();
                }
                c.beginPath();
                c.arc(canvas.width / 2, canvas.height / 2, electronSize * 4, 0, Math.PI * 2, false);
                c.fillStyle = 'black'
                c.fill();
                c.font = `${textSize} Verdana`;
                c.textAlign = "center";
                c.textBaseline = "middle";
                c.fillStyle = "white";
                c.fillText(text, canvas.width/2, canvas.height/2);
            };
        }
    }

    class Electron {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.radi = canvas.height / 2.2 / array.length;

            this.draw = function () {
                array.forEach((arr, i) => {
                    i += 1;
                    let radians = (Math.PI * 2) / arr;
                    for (let electrons = 0; electrons < arr; electrons++) {
                        let x = this.x + Math.sin(radians * electrons) * i * this.radi;
                        let y = this.y + Math.cos(radians * electrons) * i * this.radi;

                        c.beginPath();
                        c.arc(x, y, this.radius, 0, Math.PI * 2, false);
                        c.fillStyle = this.color;
                        c.fill();
                        c.closePath();
                    }
                });
            };
        }
    }

    let electrons = new Electron( canvas.width/2, canvas.height/2, electronSize, "rgb(125, 125, 125)");

    let ringx = canvas.width/2;
    let ringy = canvas.height/2;
    let ringRadi = canvas.height / 2.2 / array.length;
    let atom = new Atom(ringx, ringy, ringRadi, "rgb(125, 125, 125)");

    electrons.draw();
    atom.drawRings();
    
}

function drawAtom(canvas, electronCount, text) {
    let c = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 300;
    // Utility Functions
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    class Atom {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.radians = Math.random() * 360
            this.velocity = 0.03
            this.dfc = {
                x: randomIntFromRange(15, canvas.width / 2 - 20),
                y: randomIntFromRange(15, canvas.height / 2 - 20),
            };

            this.update = function () {
                if (this.radius <= 5) {
                    this.radians += this.velocity
                    this.x = x + Math.cos(this.radians) * this.dfc.x;
                    this.y = y + Math.sin(this.radians) * this.dfc.y;
                }
                this.draw();
            };

            this.draw = function () {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.color;
                c.fill();
                c.font = "15px Verdana";
                c.textAlign = "center";
                c.textBaseline = "middle";
                c.fillStyle = "white";
                c.fillText(text, canvas.width / 2, canvas.height / 2);
            };
        }
    }

    let atoms;
    function init() {
        atoms = [];
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var radius = 2;
        atoms.push(new Atom(x, y, 15, "black"));
        for (var i = 0; i < electronCount; i++) {
            atoms.push(new Atom(x, y, radius, "rgb(140, 140, 140)"));
        }
    }
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);
        atoms.forEach((atom) => {
            atom.update();
        });
    }
    init();
    animate();
}
