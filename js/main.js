'use strict';
function toFarenheit(num) {
    return (num * (9 / 5) + 32).toPrecision(6)
}
function toKelvin(num) {
    return (num + 273.15).toPrecision(6)
}


    const periodicTable = document.getElementById('periodic-Table');
    const remove = document.querySelector('button');
    const bgCanvas = document.querySelector('canvas#background')

    const name = document.querySelector('.name');
    const pProperties = document.querySelector('.p-properties');
    const cProperties = document.querySelector('.c-properties');
    const particles = document.querySelector('.particles');
    const structure = document.querySelector('.structure-3d');
    const structure2 = document.querySelector('.structure-2d');
    const discovery = document.querySelector('.discovery');
    const summary = document.querySelector('.summary');
    const source = document.querySelector('.source');

    //Acessing the dom ↑ ↑ ↑
    
    let mark = document.createElement('span')
    mark.innerHTML = '&#33;';
    mark.className = 'icon';

    const tabs = document.querySelectorAll('[data-targets]');
    const tabContent = document.querySelectorAll('[data-tab-content]');
    periodicTable.removeAttribute('data-tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            let target = document.querySelector(tab.dataset.targets);
            tabContent.forEach(tabCont => {
                tabCont.setAttribute("data-tab-content", '')
            })
            tabs.forEach(tab => {
                tab.classList.remove('open')
            })
            tab.classList.add('open')
            target.removeAttribute('data-tab-content');
        })
    })

    remove.addEventListener('click', () => {
        bgCanvas.classList.toggle('none')
    })
    
    let jsonData =  fetch('PeriodicTable.json')//Fetching data
    jsonData.then(response => {
        return response.json()
    })
    
    .then(elements => {
        elements.forEach((element, i) => { //Creating a div for each object
            const elem = document.createElement('div');
            let id = i += 1;
            elem.className = 'element' + ' n' + id + ' ' + element.category;
            elem.innerHTML = '<p class="number">' + element.atomicNumber + '</p>' + '<h1>' + element.symbol + '</h1>' + '<p>' + element.name + '</p>';
            periodicTable.appendChild(elem);

            //Event listeners
            elem.addEventListener('click', () => {
                document.querySelector('#tab2').appendChild(mark)
                setTimeout(() => {
                document.querySelector('#tab2').removeChild(mark)
                }, 5000)
                name.classList = 'card ' + 'name ' + element.category
                pProperties.classList = 'card ' + 'p-properties ' + element.category;
                cProperties.classList = 'card ' + 'c-properties ' + element.category;
                particles.classList = 'card ' + 'particles ' + element.category;
                structure.classList = 'card ' + 'structure-3d ' + element.category;
                structure2.classList = 'card ' + 'structure-2d ' + element.category;
                discovery.classList = 'card ' + 'discovery ' + element.category;
                summary.classList = 'card ' + 'summary ' + element.category;
                source.classList = 'card ' + 'source ' + element.category;

                if(id == element.atomicNumber) {

                    structure.innerHTML = `<tag>3-D Structure</tag> <br/> <br/>
                    <canvas id="structure1"></canvas> `

                    structure2.innerHTML = `<tag>2-D Structure</tag> <br/> <br/>
                    <canvas id="structure2"></canvas> `
                    
                    name.innerHTML = ` <h3>${element.atomicNumber}</h3> <br><br/>
                                    <h1>${element.symbol}</h1><br><br/>
                                    <h2>${element.name}</h2> `
                    pProperties.innerHTML = `<tag>Physical properties</tag> <br/><br/>
                                            <strong>Appearance : </strong> ${element.appearance} <br/><br/>
                                            <strong>State (STP) : </strong> ${element.state}`;
                    
                    cProperties.innerHTML = `<tag>Chemical properties</tag> <br/><br/>
                                            <strong>Boiling-point : </strong> ${element.boilingPoint} 
                                            <select>
                                                <option value="°C" selected>°C</option>
                                                <option value="°F">°F</option>
                                                <option value="K">K</option>
                                            </select>
                                            <br/><br/>
                                            <strong>Melting-point : </strong> ${element.meltingPoint} 
                                            <select>
                                                <option value="°C" selected>°C</option>
                                                <option value="°F">°F</option>
                                                <option value="K">K</option>
                                            </select>
                                            <br/><br/>
                                            <strong>Density : </strong> ${element.density} <br/><br/>
                                            <strong>Atomic mass : </strong> ${element.atomicMass} g/mol`;
                            
                    particles.innerHTML = `<tag>Particle data</tag> <br/><br/>
                                        <strong>Electrons : </strong> ${element.atomicNumber} <br/><br/>
                                        <strong>Protons : </strong> ${element.atomicNumber} <br/><br/>
                                        <strong>Neutrons : </strong> ${Math.round(element.atomicMass) - element.atomicNumber}`

                    discovery.innerHTML = ` <tag>Discovery</tag> <br/><br/>
                                            <strong>Discovered by : </strong>${element.discoveredBy} <br/><br/>
                                            <strong>Discovered on : </strong>${element.discovered}`

                    summary.innerHTML = element.description ;

                    source.innerHTML = `<a href="https://en.wikipedia.org/wiki/${element.name}" target="_blank">Wikipedia</a>`

                    drawAtom(document.querySelector('#structure1'), element.atomicNumber, element.symbol);
                    drawStructure(document.querySelector('#structure2'), element.shells, element.symbol);

                    const units = document.querySelectorAll('select');
                    units.forEach(unit => {
                        let point = unit.previousSibling.textContent;
                        unit.addEventListener('change', (e) => {
                            if (e.target.value == '°F') {
                                unit.previousSibling.textContent = toFarenheit(parseFloat(point))
                            } else if (e.target.value == '°C') {
                                unit.previousSibling.textContent = point
                            } else if (e.target.value == 'K') {
                                unit.previousSibling.textContent = toKelvin(parseFloat(point))
                            } 
                        })
                    })
                }
            })
            });
        })



    function drawStructure(canvas, array, text) {
        let c = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 300;
        class Atom {
            constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.ringRadius = radius;
                this.radi = (canvas.height/2.2) / array.length;
                
                this.drawRings = function () {
                    for (let shells = 0; shells <= array.length; shells++) {
                        c.beginPath();
                        c.arc(this.x, this.y, this.ringRadius * shells, 0, Math.PI * 2, false);
                        c.strokeStyle = this.color;
                        c.stroke();

                        c.font = '15px Verdana';
                        c.textAlign = 'center';
                        c.textBaseline = 'middle';
                        c.fillStyle = 'black';
                        c.fillText(text, canvas.width / 2, canvas.height / 2);
                    }
                }
            }
        }

        class Electron {
            constructor(x,y, radius, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.radi = (canvas.height/2.2) / array.length;

                this.draw = function () {
                    array.forEach((arr, i) => {
                        i += 1
                        let radians = Math.PI * 2 / arr;
                        for (let electrons = 0; electrons < arr; electrons++) {
                            let x = this.x + Math.sin(radians * electrons) * i * this.radi;
                            let y = this.y + Math.cos(radians * electrons) * i * this.radi;
                            
                            c.beginPath();
                            c.arc(x, y, this.radius, 0, Math.PI * 2, false);
                            c.fillStyle = this.color;
                            c.fill();
                            c.closePath();
                        }
                    })
                }
            }
        }

        let electrons = new Electron(canvas.width/2, canvas.height/2, 4, 'black');

        function rings() {
            let x = canvas.width/2;
            let y = canvas.height/2;
            let radi = (canvas.height/2.2) / array.length;
    
            let atom = new Atom(x, y, radi, 'black');
            atom.drawRings()
        }

        rings()
        
        electrons.draw()

    }


    function drawAtom(canvas, electronCount, text) {
        let c = canvas.getContext('2d');
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
                this.radians = Math.random() * 360;
                this.dfc = {
                    x: randomIntFromRange(15, canvas.width / 2 - 2),
                    y: randomIntFromRange(15, canvas.height / 2 - 2)
                };

                this.update = function () {
                    if (this.radius <= 5) {
                        this.radians += 0.03;
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
                    c.font = '15px Verdana';
                    c.textAlign = 'center';
                    c.textBaseline = 'middle';
                    c.fillStyle = 'white';
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
            atoms.push(new Atom(x, y, 15, 'black'))
            for (var i = 0; i < electronCount; i++) {
                atoms.push(new Atom(x, y, radius, "black"))
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, innerWidth, innerHeight);
            atoms.forEach(atom => {
                atom.update()
            })
        }
        init();
        animate();
    }