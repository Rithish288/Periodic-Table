window.addEventListener('load', () => {

    const periodicTable = document.getElementById('periodic-Table');
    const description = document.querySelector('#content');
    const close  = document.querySelector('#close')
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
                    if(id == element.atomicNumber) {
                        description.innerHTML = 
                        `<strong>Atomic-mass : </strong> ${element.atomicMass} <br/> <br/>
                        
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

                    const units = document.querySelectorAll('select');
                    units.forEach(unit => {
                        let point = unit.previousSibling.textContent;
                        unit.addEventListener('change', (e) => {
                            if(e.target.value == '°F') {
                                unit.previousSibling.textContent = ((parseInt(point) * 9/5) + 32).toPrecision(5)
                            } else if(e.target.value == '°C') {
                                unit.previousSibling.textContent = point
                            } else if(e.target.value == 'K') {
                                unit.previousSibling.textContent = (parseInt(point) + 273.15).toPrecision(5)
                            }   
                        })
                    })
                })
            });
        })


        close.addEventListener('click', () => {
            popup.style.display = 'none';
        })
})