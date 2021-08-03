sessionStorage.getItem("element");
if(sessionStorage == null || sessionStorage == undefined || sessionStorage.length <= 1) {
  window.alert('Oops! Seems like you haven\'t selected an element', open('index.html', '_self')) 
}

import {toFarenheit} from "./exports.js";
import {toKelvin} from "./exports.js";
import {drawStructure} from "./exports.js";
import {drawAtom} from "./exports.js";

let atomData = {};

await fetch("PeriodicTable.json").then((res) => res.json()).then((data) => {
    const mainData = data[sessionStorage.atomicNumber - 1];
    for (const key in mainData) {
      Object.defineProperty(atomData, key,  {value: mainData[key]})
    }
  })
  
const cards = document.getElementsByClassName("card");
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

let updatedUses = [];
atomData.uses.forEach(use => {
  updatedUses.push("<li>" + use + "</li>");
});
let updatedHistory = [];
atomData.history.forEach(use => {
  updatedHistory.push("<li>" + use + "</li>");
});

title.innerHTML = atomData.name + ' (' + atomData.symbol + ')';

for(const card of cards) {
  card.classList.add(atomData.category)
}

uses.innerHTML = `<tag>Uses</tag> <br/><br/> 
    <ul>${updatedUses.join("<br/>")} </ul>`;

history.innerHTML = `<tag>History</tag><br/> <br/> <ul>${updatedHistory.join("<br/>")}</ul>`

structure.innerHTML = `<tag>3-D Structure</tag> <br/> <br/>
    <canvas id="structure1"></canvas> `;

structure2.innerHTML = `<tag>Bohr Model</tag> <br/> <br/>
    <canvas id="structure2"></canvas> <br/>
    Electron shells: [${atomData.shells}] <br/> <br/>
    Electron-Configuration : ${sessionStorage.electronConfig}`;

placement.innerHTML = `<tag>Position</tag> <br/> <br/>
    <strong>Group</strong> : ${atomData.group} <br/> <br/>
    <strong>Period</strong> : ${atomData.shells.length} <br/> <br/>
    <strong>Block</strong> : ${atomData.block} 
    `

name.innerHTML = ` <h3>${atomData.atomicNumber}</h3> <br><br/>
    <h1>${atomData.symbol}</h1><br><br/>
    <h2>${atomData.name}</h2> `;
pProperties.innerHTML = `<tag>Physical properties</tag> <br/><br/>
    <strong>Appearance : </strong> ${atomData.appearance} <br/><br/>
    <strong>State (STP) : </strong> ${atomData.state} <br/><br/>
    <strong>Category :</strong> ${atomData.category}`;

cProperties.innerHTML = `<tag>Chemical properties</tag> <br/><br/>
    <strong>Boiling-point : </strong> ${atomData.boilingPoint}
    <select>
    <option value="°C" selected>°C</option>
    <option value="°F">°F</option>
    <option value="K">K</option>
    </select>
    <br/><br/>
    <strong>Melting-point : </strong> ${atomData.meltingPoint}
    <select>
    <option value="°C" selected>°C</option>
    <option value="°F">°F</option>
    <option value="K">K</option>
    </select>
    <br/><br/>
    <strong>Density : </strong> ${atomData.density} <br/><br/>
    <strong>Atomic mass : </strong> ${atomData.atomicMass} g/mol`;

particles.innerHTML = `<tag>Particle data</tag> <br/><br/>
    <strong>Electrons : </strong> ${atomData.atomicNumber} <br/><br/>
    <strong>Protons : </strong> ${atomData.atomicNumber} <br/><br/>
    <strong>Neutrons : </strong> ${
      Math.round(atomData.atomicMass) - atomData.atomicNumber}`;

discovery.innerHTML = ` <tag>Discovery</tag> <br/><br/>
    <strong>Discovered by : </strong>${atomData.discoveredBy} <br/><br/>
    <strong>Discovered on : </strong>${atomData.discovered}`;

summary.innerHTML =`<img src="images/${atomData.name}.jpg" alt="${atomData.name.toLowerCase()}">
        ${atomData.description}<br/> <br/>  
        <small><a href="https://images-of-elements.com/${atomData.name.toLowerCase()}.php#a" target="_blank">Source</a> of image.</small>`;

source.innerHTML = `<a href="https://en.wikipedia.org/wiki/${atomData.name}" target="_blank">Wikipedia</a>`;

drawAtom(
  document.querySelector("#structure1"),
  atomData.atomicNumber,
  atomData.symbol
);
drawStructure(
  document.querySelector("#structure2"),
  atomData.shells,
  atomData.symbol,
  4,
  "15px",
  true
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