
sessionStorage.getItem("element");
if(sessionStorage == null || sessionStorage == undefined || sessionStorage.length <= 1) {
    window.alert('Oops! Seems like you haven\'t selected an element', open('index.html', '_self')) 
}

let toggle = false;
const toggleBtn = document.querySelector("#mode");
const sunPath =
  "M15.1899 6.6962C15.1899 7.24849 15.6376 7.6962 16.1899 7.6962C16.7422 7.6962 17.1899 7.24849 17.1899 6.6962H15.1899ZM17.1899 1C17.1899 0.447715 16.7422 0 16.1899 0C15.6376 0 15.1899 0.447715 15.1899 1H17.1899ZM15.1899 31C15.1899 31.5523 15.6376 32 16.1899 32C16.7422 32 17.1899 31.5523 17.1899 31H15.1899ZM17.1899 25.3038C17.1899 24.7515 16.7422 24.3038 16.1899 24.3038C15.6376 24.3038 15.1899 24.7515 15.1899 25.3038H17.1899ZM21.5587 8.87768C21.1682 9.2682 21.1682 9.90137 21.5587 10.2919C21.9492 10.6824 22.5824 10.6824 22.9729 10.2919L21.5587 8.87768ZM27.0008 6.26407C27.3913 5.87354 27.3913 5.24038 27.0008 4.84986C26.6102 4.45933 25.9771 4.45933 25.5865 4.84986L27.0008 6.26407ZM4.09037 25.5865C3.69985 25.9771 3.69985 26.6102 4.09037 27.0008C4.4809 27.3913 5.11406 27.3913 5.50459 27.0008L4.09037 25.5865ZM9.53241 22.9729C9.92293 22.5824 9.92293 21.9492 9.53241 21.5587C9.14188 21.1682 8.50872 21.1682 8.1182 21.5587L9.53241 22.9729ZM26.346 27.0008C26.7366 27.3913 27.3697 27.3913 27.7602 27.0008C28.1508 26.6102 28.1508 25.9771 27.7602 25.5865L26.346 27.0008ZM23.7324 21.5587C23.3419 21.1682 22.7087 21.1682 22.3182 21.5587C21.9277 21.9492 21.9277 22.5824 22.3182 22.9729L23.7324 21.5587ZM8.87768 9.5324C9.2682 9.92292 9.90137 9.92292 10.2919 9.5324C10.6824 9.14187 10.6824 8.50871 10.2919 8.11818L8.87768 9.5324ZM6.26407 4.09036C5.87354 3.69984 5.24038 3.69984 4.84986 4.09036C4.45933 4.48089 4.45933 5.11405 4.84986 5.50458L6.26407 4.09036ZM25.3038 15.1899C24.7515 15.1899 24.3038 15.6376 24.3038 16.1899C24.3038 16.7422 24.7515 17.1899 25.3038 17.1899V15.1899ZM31 17.1899C31.5523 17.1899 32 16.7422 32 16.1899C32 15.6376 31.5523 15.1899 31 15.1899V17.1899ZM1 15.1899C0.447715 15.1899 0 15.6376 0 16.1899C0 16.7422 0.447715 17.1899 1 17.1899V15.1899ZM6.6962 17.1899C7.24849 17.1899 7.6962 16.7422 7.6962 16.1899C7.6962 15.6376 7.24849 15.1899 6.6962 15.1899V17.1899ZM24.3038 15.8101C24.3038 20.5011 20.5011 24.3038 15.8101 24.3038V26.3038C21.6056 26.3038 26.3038 21.6056 26.3038 15.8101H24.3038ZM15.8101 24.3038C11.1192 24.3038 7.31646 20.5011 7.31646 15.8101H5.31646C5.31646 21.6056 10.0146 26.3038 15.8101 26.3038V24.3038ZM7.31646 15.8101C7.31646 11.1192 11.1192 7.31646 15.8101 7.31646V5.31646C10.0146 5.31646 5.31646 10.0146 5.31646 15.8101H7.31646ZM15.8101 7.31646C20.5011 7.31646 24.3038 11.1192 24.3038 15.8101H26.3038C26.3038 10.0146 21.6056 5.31646 15.8101 5.31646V7.31646ZM17.1899 6.6962V1H15.1899V6.6962H17.1899ZM17.1899 31V25.3038H15.1899V31H17.1899ZM22.9729 10.2919L27.0008 6.26407L25.5865 4.84986L21.5587 8.87768L22.9729 10.2919ZM5.50459 27.0008L9.53241 22.9729L8.1182 21.5587L4.09037 25.5865L5.50459 27.0008ZM27.7602 25.5865L23.7324 21.5587L22.3182 22.9729L26.346 27.0008L27.7602 25.5865ZM10.2919 8.11818L6.26407 4.09036L4.84986 5.50458L8.87768 9.5324L10.2919 8.11818ZM25.3038 17.1899H31V15.1899H25.3038V17.1899ZM1 17.1899H6.6962V15.1899H1V17.1899Z M25.3038 15.8101C25.3038 21.0533 21.0533 25.3038 15.8101 25.3038C10.5669 25.3038 6.31646 21.0533 6.31646 15.8101C6.31646 10.5669 10.5669 6.31646 15.8101 6.31646C21.0533 6.31646 25.3038 10.5669 25.3038 15.8101Z";
const moonPath =
  "M25.6288 23.6435C19.6476 29.3755 10.1523 29.1734 4.42036 23.1923C-1.31157 17.2111 -1.10953 7.71579 4.87162 1.98386C10.8528 -3.74806 4.73747 5.35647 13.5 14.5C22.2625 23.6435 31.6099 17.9116 25.6288 23.6435Z";
let path = document.querySelector(".path");
let gitPath = document.querySelector(".gitHub");

toggleBtn.addEventListener("click", () => {
  if (!toggle) {
    toggle = true;
    path.setAttribute("d", sunPath);
    path.setAttribute("fill", "#FCDB67");
    gitPath.setAttribute("fill", "white ");
    document.body.classList.remove("lightMode");
    document.body.classList.add("darkMode");
  } else {
    toggle = false;
    path.setAttribute("d", moonPath);
    path.setAttribute("fill", "black");
    gitPath.setAttribute("fill", "black");
    document.body.classList.remove("darkMode");
    document.body.classList.add("lightMode");
  }
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
const particles = document.querySelector(".particles");
const structure = document.querySelector(".structure-3d");
const structure2 = document.querySelector(".structure-2d");
const discovery = document.querySelector(".discovery");
const summary = document.querySelector(".summary");
const source = document.querySelector(".source");
const title = document.querySelector("title")

title.innerHTML = sessionStorage.name + ' (' + sessionStorage.symbol + ')'
name.classList = "card " + "name " + sessionStorage.category;
pProperties.classList = "card " + "p-properties " + sessionStorage.category;
cProperties.classList = "card " + "c-properties " + sessionStorage.category;
particles.classList = "card " + "particles " + sessionStorage.category;
structure.classList = "card " + "structure-3d " + sessionStorage.category;
structure2.classList = "card " + "structure-2d " + sessionStorage.category;
discovery.classList = "card " + "discovery " + sessionStorage.category;
summary.classList = "card " + "summary " + sessionStorage.category;
source.classList = "card " + "source " + sessionStorage.category;

structure.innerHTML = `<tag>3-D Structure</tag> <br/> <br/>
    <canvas id="structure1"></canvas> `;

structure2.innerHTML = `<tag>Bohr Model</tag> <br/> <br/>
    <canvas id="structure2"></canvas> <br/>
    <p>Electron shells: [${sessionStorage.shells}]</p>`;

name.innerHTML = ` <h3>${sessionStorage.atomicNumber}</h3> <br><br/>
    <h1>${sessionStorage.symbol}</h1><br><br/>
    <h2>${sessionStorage.name}</h2> `;
pProperties.innerHTML = `<tag>Physical properties</tag> <br/><br/>
    <strong>Appearance : </strong> ${sessionStorage.appearance} <br/><br/>
    <strong>State (STP) : </strong> ${sessionStorage.state}`;

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

summary.innerHTML = sessionStorage.description;

source.innerHTML = `<a href="https://en.wikipedia.org/wiki/${sessionStorage.name}" target="_blank">Wikipedia</a>`;

let sliced = sessionStorage.shells.split(",");

let shellArray = sliced.map((x) => {
  return parseInt(x);
});
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

  electrons.draw();
  atom.drawRings();
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
        x: randomIntFromRange(15, canvas.width / 2 - 20),
        y: randomIntFromRange(15, canvas.height / 2 - 20),
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
