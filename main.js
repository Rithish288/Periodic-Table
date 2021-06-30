window.addEventListener('DOMContentLoaded', () => {
    const periodicTable = document.getElementById('periodic-Table');
    const description = document.querySelector('#content');
    const close  = document.querySelector('#close')
    const popup = document.querySelector('.description')

    fetch('PeriodicTable.json')
        .then((response) => {
            return response.json()
        })
        .then((elements) => {
            elements.forEach((element, i) => {
                const elem = document.createElement('div');
                let id = i += 1
                elem.className = 'element' + ' n' + id + ' ' + element.category;
                elem.innerHTML = '<p class="number">' + element.atomicNumber + '</p>' + '<h1>' + element.symbol + '</h1>' + '<p>' + element.name + '</p>';
                periodicTable.appendChild(elem);
                elem.addEventListener('click', () => {
                    if(id == element.atomicNumber) {
                        description.innerHTML = 
                        `<strong>Atomic-mass: </strong> ${element.atomicMass} <br/> <br/>
                        <strong>Appearance: </strong> ${element.appearance} <br/> <br/>
                        <strong>Melting point: </strong> ${element.meltingPoint} <br/> <br/>
                        <strong>Boiling point: </strong> ${element.boilingPoint} <br/> <br/>
                        <strong>Category: </strong> ${element.category} <br/> <br/>
                        <strong>State (at STP): </strong> ${element.state} <br/> <br/>
                        <strong>Density (at STP): </strong> ${element.density} <br/> <br/>
                        <strong>Year discovered: </strong> ${element.discovered} <br/> <br/>
                        <strong>Discovered by: </strong> ${element.discoveredBy} <br/> <br/>
                        <strong>Description: </strong> <br/> ${element.description}`
                        popup.style.display = 'block';
                        description.className = element.category
                        close.className = element.category
                    }
                })
            });
        })
        
        close.addEventListener('click', () => {
            popup.style.display = 'none';
        })
})