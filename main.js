window.addEventListener('load', () => {

    const periodicTable = document.getElementById('periodic-Table');
    const description = document.querySelector('#content');
    const close = document.querySelector('#close')
    const popup = document.querySelector('.description');
    //Acessing the dom ↑ ↑ ↑

    fetch('PeriodicTable.json')//Fetching data
        .then((response) => {
            return response.json()
        })

        .then((elements) => {
            elements.forEach((element, i) => { //Creating a div for each object
                const elem = document.createElement('div');
                let id = i += 1
                elem.className = 'element' + ' n' + id + ' ' + element.category;
                elem.innerHTML = '<p class="number">' + element.atomicNumber + '</p>' + '<h1>' + element.symbol + '</h1>' + '<p>' + element.name + '</p>';
                periodicTable.appendChild(elem);

                //Event listeners
                elem.addEventListener('click', () => {
                    if (id == element.atomicNumber) {
                        description.innerHTML =
                            `<canvas id="structure"></canvas>
                        <strong>Atomic-mass : </strong> ${element.atomicMass} <br/> <br/>
                        
                        <strong>Appearance : </strong> ${element.appearance} <br/> <br/>

                        <div class="melting-unit">
                            <strong>Melting point : </strong> ${element.meltingPoint}
                            <select>
                                <ul>
                                <li><option value="°C">°C</option></li>
                                <li><option value="°F">°F</option></li>
                                <li><option value="K">K</option></li>
                                </ul>
                            </select>
                             <br/> <br/>
                        </div>

                        <div class="boiling-unit">
                            <strong>Boiling point : </strong> ${element.boilingPoint}
                            <select>
                                <ul>
                                <li><option value="°C">°C</option></li>
                                <li><option value="°F">°F</option></li>
                                <li><option value="K">K</option></li>
                                </ul>
                            </select> <br/> <br/>
                        </div>
                        <strong>Category : </strong> ${element.category} <br/> <br/>
                        
                        <strong>State (at STP) : </strong> ${element.state} <br/> <br/>
                        
                        <strong>Density (at STP) : </strong> ${element.density} <br/> <br/>
                        
                        <strong>Year discovered : </strong> ${element.discovered} <br/> <br/>
                        
                        <strong>Discovered by : </strong> ${element.discoveredBy} <br/> <br/>
                        
                        <strong>Description: </strong> <br/> ${element.description}`
                        popup.style.display = 'block';
                        description.className = element.category
                        close.className = element.category
                    }

                    const canvas = document.querySelector('canvas#structure');

                    drawCanvas(canvas)


                    const units = document.querySelectorAll('select');
                    units.forEach(unit => {
                        let point = unit.previousSibling.textContent;
                        unit.addEventListener('change', (e) => {
                            if (e.target.value == '°F') {
                                unit.previousSibling.textContent = ((parseInt(point) * 9 / 5) + 32).toPrecision(5)
                            } else if (e.target.value == '°C') {
                                unit.previousSibling.textContent = point
                            } else if (e.target.value == 'K') {
                                unit.previousSibling.textContent = (parseInt(point) + 273.15).toPrecision(5)
                            }
                        })
                    })
                })
                function drawCanvas(canvas) {
                    let c = canvas.getContext('2d');
                    canvas.width = 200;
                    canvas.height = 200;


                    // Utility Functions
                    function randomIntFromRange(min, max) {
                        return Math.floor(Math.random() * (max - min + 1) + min);
                    }


                    function Atom(x, y, radius, color) {
                        this.x = x;
                        this.y = y;
                        this.radius = radius;
                        this.color = color;
                        this.radians = Math.random() * 360
                        this.dfc = {
                            x: randomIntFromRange(10, canvas.height/2 - 10),
                            y: randomIntFromRange(10, canvas.height/2 - 10)
                        }

                        this.update = function () {
                            if (this.radius <= 5) {
                                this.radians += 0.04
                                this.x = x + Math.cos(this.radians) * this.dfc.x;
                                this.y = y + Math.sin(this.radians) * this.dfc.y;
                            }
                            this.draw()
                        }

                        this.draw = function () {
                            c.beginPath();
                            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                            c.fillStyle = this.color;
                            c.fill();

                            c.font = '15px Verdana';
                            c.textAlign = 'center';
                            c.textBaseline = 'middle'
                            c.fillStyle = 'black';
                            c.fillText(element.symbol, canvas.width/2, canvas.height/2)
                        };
                    }

                    let stars;

                    function init() {
                        stars = [];
                        var x = canvas.width / 2;
                        var y = canvas.height / 2;
                        var radius = 2;
                        stars.push(new Atom(x, y, 15, 'white'))

                        for (var i = 0; i < element.atomicNumber; i++) {
                            stars.push(new Atom(x, y, radius, "white"))
                        }
                    }


                    function animate() {
                        requestAnimationFrame(animate);
                        c.clearRect(0, 0, innerWidth, innerHeight);

                        stars.forEach(star => {
                            star.update()
                        })
                    }

                    init();
                    animate();

                }
            });
        })


    close.addEventListener('click', () => {
        popup.style.display = 'none';
    })
})