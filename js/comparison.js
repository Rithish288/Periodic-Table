fetch('../periodicTable.json').then(response => {
    return response.json();
}).then(elements => {
    const weights = elements.map(function(el) {
        return el.atomicMass
    })
    const number = elements.map(function(el) {
        return el.atomicNumber
    })
    const name = elements.map(function(el) {
        return el.name
    })
    const symbol = elements.map(function(el) {
        return el.symbol
    })
    const state = elements.map(function(el) {
        return el.state
    })

    function findPercent(num, total) {
        return ((num / total) * 100)
    }

    function stateComparison() {
        const canvas = document.getElementById('state');
        let c = canvas.getContext('2d');

        
        let stateChart = new Chart(canvas, {
            type: 'pie',
            data: {
                labels: ['solid', 'liquid', 'gas'],
                datasets: [{
                    label: 'State(STP)',
                    data: [
                        101,
                        3,
                        11
                    ],
                    backgroundColor: [
                        'Turquoise','beige', '#000080'
                    ]
                }]
            }
        })
    }

    function massComparison() {
        const canvas = document.getElementById('atomicMass');
    
        let massChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: symbol,
                datasets: [{
                    label: 'Atomic mass index',
                    data: weights,
                    fill: false,
                    borderColor: 'blue',
                    borderWidth: 1,
                    borderJoinStyle: 'bevel'
                }]
            },
            options: {
                elements: {
                    point: {
                        radius: 2
                    }
                },
                plugins: {
                    legend: {
                        position:'bottom'
                    }
                }
            }
        })
    }
    massComparison();
    stateComparison()
})
