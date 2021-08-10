function rearrangeArray(arr) {
    const o = arr.reduce((a, b) => {
        a[b] ? (a[b] += 1) : (a[b] = 1);
        return a;
    }, {});
    return o;
}

function sortArrayByYear(arr) {
    const res = arr.sort((a, b) => {
        const numA = (a.discovered.includes("BCE") || a.discovered.includes("BC") ? -1 : 1) * a.discovered.replace(/\D/g, '')
        const numB = (b.discovered.includes("BCE") || a.discovered.includes("BC") ? -1 : 1) * b.discovered.replace(/\D/g, '')
        return numA - numB
    });
    return res
}


fetch('PeriodicTable.json').then(response => {
    return response.json();
}).then(elements => {
    const category = elements.map(function(el) {
        return el.category
    })
    const dates = elements.map(function(el) {
        return {"name": el.name.toLowerCase(), discovered: el.discovered}
    })
    
    // console.log(sortArrayByYear(dates))
    
    function stateComparison() {
        const canvas = document.getElementById('state');
        
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
                        'hsla(174, 72%, 56%, 0.8)',
                        'hsla(60, 56%, 91%, 0.8)', 
                        'hsla(240, 100%, 25%, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "right"
                    },
                    title: {
                        display: true,
                        text: "Number of elements in each state of matter"
                    }
                }
            }
        })
    }


    function categoryComparison() {
        const canvas = document.getElementById('category');

        let categoryChart = new Chart(canvas, {
            type: "pie",
            data: {
                labels: Object.keys(rearrangeArray(category)),
                datasets: [{
                    label: "Elements in category",
                    data: Object.values(rearrangeArray(category)),
                    backgroundColor: [
                        "rgba(57, 242, 255, 0.8)",
                        "rgba(228, 116, 250, 0.8)",
                        "rgba(255, 197, 111, 0.8)",
                        "rgba(255, 192, 203, 0.8)",
                        "rgba(255, 95, 95, 0.8)",
                        "rgba(255, 241, 117, 0.8)",
                        "rgba(0, 151, 138, 0.8)",
                        "rgba(18, 253, 124, 0.8)",
                        "rgba(121, 141, 255, 0.8)",
                        "rgba(76, 77, 141, 0.8)"
                    ]
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 10
                    }
                },
                hoverOffset: 10,
                responsive:true,
                maintainAspectRatio: false,
                plugins:{
                    title: {
                        display: true,
                        text: "Number of elements in each category",
                        fontSize: 40
                    },
                    legend: {
                        labels: {
                            color: "grey"
                        },
                        display: true,
                        position: "bottom"
                    }
                }
            }
        })

    }
    
    categoryComparison();
    stateComparison()
})
