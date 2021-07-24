
sessionStorage.getItem("element");
if(sessionStorage == null || sessionStorage == undefined || sessionStorage.length <= 1) {
  window.alert('Oops! Seems like you haven\'t selected an element', open('index.html', '_self')) 
}


let elementUses = sessionStorage.uses.split('.,');

let sliced = sessionStorage.shells.split(",");

let shellArray = sliced.map((x) => {
  return parseInt(x);
});

function toFarenheit(num) {
  return (num * (9 / 5) + 32).toPrecision(6);
}
function toKelvin(num) {
  return (num + 273.15).toPrecision(6);
}

const name = document.querySelector(".name");
const pProperties = document.querySelector(".p-properties");
const cProperties = document.querySelector(".c-properties");
const placement = document.querySelector(".placement");
const history = document.querySelector(".history");
const uses = document.querySelector(".uses");
const particles = document.querySelector(".particles");
const structure = document.querySelector(".structure-3d");
const structure2 = document.querySelector(".structure-2d");
const discovery = document.querySelector(".discovery");
const summary = document.querySelector(".summary");
const source = document.querySelector(".source");
const title = document.querySelector("title");

const ul = document.createElement("ul");

elementUses.forEach(el => {
  let li = document.createElement('li');
  li.innerHTML = el + '.' + '<br/> <br/>';
  ul.appendChild(li);
})

uses.innerHTML = '<tag>Uses</tag> <br/><br/>';
uses.appendChild(ul);

title.innerHTML = sessionStorage.name + ' (' + sessionStorage.symbol + ')'
name.classList = "card " + "name " + sessionStorage.category;
pProperties.classList = "card " + "p-properties " + sessionStorage.category;
cProperties.classList = "card " + "c-properties " + sessionStorage.category;
placement.classList = "card " + "placement " + sessionStorage.category;
history.classList = "card " + "history " + sessionStorage.category;
uses.classList = "card " + "uses " + sessionStorage.category;
particles.classList = "card " + "particles " + sessionStorage.category;
structure.classList = "card " + "structure-3d " + sessionStorage.category;
structure2.classList = "card " + "structure-2d " + sessionStorage.category;
discovery.classList = "card " + "discovery " + sessionStorage.category;
summary.classList = "card " + "summary " + sessionStorage.category;
source.classList = "card " + "source " + sessionStorage.category;

history.innerHTML = `<tag>History</tag><br/> <br/>
        <h1>Prototype</h1> <br/> <br/> <br/> <br/> Release in 30th July`

structure.innerHTML = `<tag>3-D Structure</tag> <br/> <br/>
    <canvas id="structure1"></canvas> `;

structure2.innerHTML = `<tag>Bohr Model</tag> <br/> <br/>
    <canvas id="structure2"></canvas> <br/>
    Electron shells: [${sessionStorage.shells}] <br/> <br/>
    Electron-Configuration : ${sessionStorage.electronConfig}`;

placement.innerHTML = `<tag>Position</tag> <br/> <br/>
    <strong>Group</strong> : ${sessionStorage.group} <br/> <br/>
    <strong>Period</strong> : ${shellArray.length} <br/> <br/>
    <strong>Block</strong> : ${sessionStorage.block} 
    `

name.innerHTML = ` <h3>${sessionStorage.atomicNumber}</h3> <br><br/>
    <h1>${sessionStorage.symbol}</h1><br><br/>
    <h2>${sessionStorage.name}</h2> `;
pProperties.innerHTML = `<tag>Physical properties</tag> <br/><br/>
    <strong>Appearance : </strong> ${sessionStorage.appearance} <br/><br/>
    <strong>State (STP) : </strong> ${sessionStorage.state} <br/><br/>
    <strong>Category :</strong> ${sessionStorage.category}`;

cProperties.innerHTML = `<tag>Chemical properties</tag> <br/><br/>
    <strong>Boiling-point : </strong> ${sessionStorage.boilingPoint}
    <select>
    <option value="°C" selected>°C</option>
    <option value="°F">°F</option>
    <option value="K">K</option>
    </select>
    <br/><br/>
    <strong>Melting-point : </strong> ${sessionStorage.meltingPoint}
    <select>
    <option value="°C" selected>°C</option>
    <option value="°F">°F</option>
    <option value="K">K</option>
    </select>
    <br/><br/>
    <strong>Density : </strong> ${sessionStorage.density} <br/><br/>
    <strong>Atomic mass : </strong> ${sessionStorage.atomicMass} g/mol`;

particles.innerHTML = `<tag>Particle data</tag> <br/><br/>
    <strong>Electrons : </strong> ${sessionStorage.atomicNumber} <br/><br/>
    <strong>Protons : </strong> ${sessionStorage.atomicNumber} <br/><br/>
    <strong>Neutrons : </strong> ${
      Math.round(sessionStorage.atomicMass) - sessionStorage.atomicNumber
    }`;

discovery.innerHTML = ` <tag>Discovery</tag> <br/><br/>
    <strong>Discovered by : </strong>${sessionStorage.discoveredBy} <br/><br/>
    <strong>Discovered on : </strong>${sessionStorage.discovered}`;

summary.innerHTML =`<img src="images/${sessionStorage.name}.jpg" alt="${sessionStorage.name.toLowerCase()}">
        ${sessionStorage.description}<br/> <br/>  
        <small><a href="https://images-of-elements.com/${sessionStorage.name.toLowerCase()}.php#a" target="_blank">Source</a> of image.</small>`;

source.innerHTML = `<a href="https://en.wikipedia.org/wiki/${sessionStorage.name}" target="_blank">Wikipedia</a>`;

drawAtom(
  document.querySelector("#structure1"),
  sessionStorage.atomicNumber,
  sessionStorage.symbol
);
drawStructure(
  document.querySelector("#structure2"),
  shellArray,
  sessionStorage.symbol,
  4,
  "15px"
);

const units = document.querySelectorAll("select");
units.forEach((unit) => {
  let point = unit.previousSibling.textContent;
  unit.addEventListener("change", (e) => {
    if (e.target.value == "°F") {
      unit.previousSibling.textContent = toFarenheit(parseFloat(point));
    } else if (e.target.value == "°C") {
      unit.previousSibling.textContent = point;
    } else if (e.target.value == "K") {
      unit.previousSibling.textContent = toKelvin(parseFloat(point));
    }
  });
});

function drawStructure(canvas, array, text, electronSize, textSize) {
  let c = canvas.getContext("2d");
  canvas.width = 450;
  canvas.height = 350;

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
          c.arc(
            this.x,
            this.y,
            this.ringRadius * shells,
            0,
            Math.PI * 2,
            false
          );
          c.strokeStyle = this.color;
          c.stroke();
        }
        c.beginPath();
        c.arc(
          canvas.width / 2,
          canvas.height / 2,
          electronSize * 4,
          0,
          Math.PI * 2,
          false
        );
        c.fillStyle = "black";
        c.fill();
        c.font = `${textSize} Verdana`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = "white";
        c.fillText(text, canvas.width / 2, canvas.height / 2);
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
      this.counter = 0;

      this.draw = function () {
        array.forEach((arr, i) => {
          i += 1;
          this.counter += Math.sin(0.005 / arr)
          let radians = (Math.PI * 2) / arr;
          for (let electrons = 0; electrons < arr; electrons++) {
            let x = this.x + Math.sin(radians * electrons + this.counter) * i * this.radi;
            let y = this.y + Math.cos(radians * electrons + this.counter) * i * this.radi;

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

  let electrons = new Electron(
    canvas.width / 2,
    canvas.height / 2,
    electronSize,
    "rgb(125, 125, 125)"
  );

  let ringx = canvas.width / 2;
  let ringy = canvas.height / 2;
  let ringRadi = canvas.height / 2.2 / array.length;
  let atom = new Atom(ringx, ringy, ringRadi, "rgb(125, 125, 125)");

  
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    electrons.draw();
    atom.drawRings();
  }
  animate()
}

function drawAtom(canvas, electronCount, text) {
  let c = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 400;
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
      this.velocity = 0.03;
      this.dfc = {
        x: randomIntFromRange(20, canvas.width / 2 - 20),
        y: randomIntFromRange(20, canvas.height / 2 - 50),
      };
      
      this.update = function () {
        if (this.radius <= 5) {
          this.radians += this.velocity;
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