const periodicTable = document.getElementById("periodic-Table");
const tabs = document.querySelectorAll("[data-targets]");
const tabContent = document.querySelectorAll("[data-tab-content]");
//Acessing the dom ↑ ↑ ↑

import { drawStructure } from './exports.js';


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

        switch(id) {
            case 57: elem.setAttribute('data-block', 'd-block');break;
            case 89: elem.setAttribute('data-block', 'd-block');break;
            case 24: elem.setAttribute('configuration', '[Ar] 4s1 3d5');break;
            case 29: elem.setAttribute('configuration', '[Ar] 4s1 3d10');break;
            case 41: elem.setAttribute('configuration', '[Kr] 5s1 4d4');break;
            case 42: elem.setAttribute('configuration', '[Kr] 5s1 4d5');break;
            case 44: elem.setAttribute('configuration', '[Kr] 5s1 4d7');break;
            case 45: elem.setAttribute('configuration', '[Kr] 5s1 4d8');break;
            case 46: elem.setAttribute('configuration', '[Kr] 4d10');break;
            case 47: elem.setAttribute('configuration', '[Kr] 5s1 4d10');break;
            case 57: elem.setAttribute('configuration', '[Xe] 6s2 5d1');break;
            case 58: elem.setAttribute('configuration', '[Xe] 6s2 4f1 5d1');break;
            case 64: elem.setAttribute('configuration', '[Xe] 6s2 4f7 5d1');break;
            case 78: elem.setAttribute('configuration', '[Xe] 6s1 4f14 5d9');break;
            case 79: elem.setAttribute('configuration', '[Xe] 6s1 4f14 5d10');break;
            case 89: elem.setAttribute('configuration', '[Rn] 7s2 6d1');break;
            case 90: elem.setAttribute('configuration', '[Rn] 7s2 6d2');break;
            case 91: elem.setAttribute('configuration', '[Rn] 7s2 5f2 6d1');break;
            case 92: elem.setAttribute('configuration', '[Rn] 7s2 5f3 6d1');break;
            case 93: elem.setAttribute('configuration', '[Rn] 7s2 5f4 6d1');break;
            case 96: elem.setAttribute('configuration', '[Rn] 7s2 5f7 6d1');break;
            case 103: elem.setAttribute('configuration', '[Rn] 7s2 5f14 7p1');break;
        }
        
        
        //Event listeners
        elem.addEventListener("click", (e) => {
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
                    electronConfig: findAttribute(),
                };
                
                for (let key in pairs) {
                    sessionStorage.setItem(key, pairs[key]);
                }
            }
        });
        elem.addEventListener('mouseenter', () => {
            let canvas2 = document.getElementById('hover-structure')
            if(id == element.atomicNumber) {
                drawStructure(canvas2,
                    element.shells,
                    element.symbol,
                    3.8, '15px', false)
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
            console.log(element)
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
            let prevNoblegas = new String(document.querySelector('.n' + finalAns).dataset.symbol).valueOf()
            return '[' + prevNoblegas + ']' + ' ' + str;
        }
    }); 
    
    