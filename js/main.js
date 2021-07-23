const periodicTable = document.getElementById("periodic-Table");
const tabs = document.querySelectorAll("[data-targets]");
const tabContent = document.querySelectorAll("[data-tab-content]");
//Acessing the dom ↑ ↑ ↑

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
        const elem = document.createElement("a");
        let id = (i += 1);
        elem.href = 'details.html'
        elem.className = "element" + " n" + id + " " + element.category;
        elem.setAttribute('data-symbol', element.symbol)
        elem.setAttribute('data-block', element.block);
        elem.setAttribute('data-rings', element.shells.length);
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

        if(id == 57) {
            elem.setAttribute('data-block', 'd-block')
        } 
        if(id == 89) {
            elem.setAttribute('data-block', 'd-block')
        }

        if(id == 24) {elem.setAttribute('configuration', '[Ar] 4s1 3d5');}
        if(id == 29) {elem.setAttribute('configuration', '[Ar] 4s1 3d10');}
        if(id == 41) {elem.setAttribute('configuration', '[Kr] 5s1 4d4');}
        if(id == 42) {elem.setAttribute('configuration', '[Kr] 5s1 4d5');}
        if(id == 44) {elem.setAttribute('configuration', '[Kr] 5s1 4d7');}
        if(id == 45) {elem.setAttribute('configuration', '[Kr] 5s1 4d8');}
        if(id == 46) {elem.setAttribute('configuration', '[Kr] 4d10'); elem.setAttribute('data-rings', 5)}
        if(id == 47) {elem.setAttribute('configuration', '[Kr] 5s1 4d10');}
        if(id == 57) {elem.setAttribute('configuration', '[Xe] 6s2 5d1');}
        if(id == 58) {elem.setAttribute('configuration', '[Xe] 6s2 4f1 5d1');}
        if(id == 64) {elem.setAttribute('configuration', '[Xe] 6s2 4f7 5d1');}
        if(id == 78) {elem.setAttribute('configuration', '[Xe] 6s1 4f14 5d9');}
        if(id == 79) {elem.setAttribute('configuration', '[Xe] 6s1 4f14 5d10');}
        if(id == 89) {elem.setAttribute('configuration', '[Rn] 7s2 6d1');}
        if(id == 90) {elem.setAttribute('configuration', '[Rn] 7s2 6d2');}
        if(id == 91) {elem.setAttribute('configuration', '[Rn] 7s2 5f2 6d1');}
        if(id == 92) {elem.setAttribute('configuration', '[Rn] 7s2 5f3 6d1');}
        if(id == 93) {elem.setAttribute('configuration', '[Rn] 7s2 5f4 6d1');}
        if(id == 96) {elem.setAttribute('configuration', '[Rn] 7s2 5f7 6d1');}
        if(id == 103) {elem.setAttribute('configuration', '[Rn] 7s2 5f14 7p1');}

        //Event listeners
        elem.addEventListener("click", () => {
            if (id == element.atomicNumber) {
                function findAttribute() {
                    if(elem.hasAttribute('configuration')) {
                        return elem.getAttribute('configuration')
                    } else {
                        return findPoint(document.querySelector('.n' + element.atomicNumber))
                    }
                }
                let pairs = {
                    atomicNumber: element.atomicNumber, 
                    name: element.name, 
                    block: element.block,
                    atomicMass: element.atomicMass, 
                    symbol: element.symbol, 
                    group: element.group,
                    electronConfig: findAttribute(),
                    discovered: element.discovered, 
                    appearance: element.appearance,
                    boilingPoint: element.boilingPoint,
                    meltingPoint: element.meltingPoint,
                    discoveredBy: element.discoveredBy,
                    density: element.density,
                    category: element.category,
                    state: element.state,
                    shells: element.shells,
                    uses: element.uses,
                    description: element.description
                };
                
                for (let key in pairs) {
                    sessionStorage.setItem(key, pairs[key]);
                }
                localStorage.clear()
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

        const breakPoints = [
            document.querySelector(".n2"),
            document.querySelector(".n10"),
            document.querySelector(".n18"),
            document.querySelector(".n36"),
            document.querySelector(".n54"),
            document.querySelector(".n86")
        ]

        function findPoint(item) {
            const config = breakPoints.map(el => parseInt(el.classList[1].split('n')[1]))
            let element = parseInt(item.classList[1].split('n')[1]);
            let breakPointArray = [0];
            let obj = {};
            let blockArray = [];
            let rowArray =[];
            let inBetween = [];
            // let finalAns;
            for (const conf in config) {
                if (element > config[conf]) {
                    breakPointArray.push(config[conf]);
                } 
            }

            function reduceArray(array, object) {
                array.reduce((a, b) => {
                    a[b] ? (a[b] += 1) : (a[b] = 1);
                    return a;
                }, object);
            }

            let finalAns; 
            if(breakPointArray.length > 1) {
                finalAns = breakPointArray[breakPointArray.length - 1];
            } else {
                finalAns = 0
            }
            function configuration() {
                for (let i = finalAns + 1; i <= element; i++) {
                    let elems = document.querySelector('.n' + i);
                    let block = elems.dataset.block.split('-block')[0];
                    blockArray.push(block);
                    inBetween.push(elems);
                }
                reduceArray(blockArray, obj)
            }
            configuration()

            inBetween.forEach(el => {
                if(el.dataset.block == 'd-block') {
                    el.dataset.rings -= 1
                }
                if(el.dataset.block == 'f-block') {
                    el.dataset.rings -= 2
                } 

                rowArray.push(new Array(el.dataset.rings, el.dataset.block.split('-block')[0], 1));
            })

            let objArrayCount = rowArray.reduce((acc, [number, letter]) => ({
                ...acc,
                [number]: {
                  ...acc[number],
                  [letter]: acc[number] && acc[number][letter] ? acc[number][letter] + 1 : 1
                }
            }), {});
            
            let reducedArray = Object.entries(objArrayCount).reduce((acc, [number, letterFrequencyObj]) => [...acc, ...Object.entries(letterFrequencyObj).map(([letter, frequency]) => [number, letter,frequency])],[]);
            let str = "";
            reducedArray.forEach(element => {
                let innerArray = element.join('');
                str +=  innerArray + ' ';
            });

            if(finalAns < 1) {
                return 1 + 's' + element;
            }
            prevNoblegas = new String(document.querySelector('.n' + finalAns).dataset.symbol).valueOf()
            return '[' + prevNoblegas + ']' + ' ' + str;
        }
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
