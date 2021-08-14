export function toFarenheit(num) {
  return (num * (9 / 5) + 32).toPrecision(6);
}

export function toKelvin(num) {
  return (num + 273.15).toPrecision(6);
}

export function drawStructure(
  canvas,
  array,
  text,
  electronSize,
  textSize,
  animationTrue
) {
  const c = canvas.getContext("2d");
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
          this.counter += 0.008;
          if (arr == 0) {
            return null;
          }
          let radians = (Math.PI * 2) / arr;
          for (let electrons = 0; electrons < arr; electrons++) {
            let x =
              this.x +
              Math.cos(radians * electrons + this.counter / i) * i * this.radi;
            let y =
              this.y +
              Math.sin(radians * electrons + this.counter / i) * i * this.radi;

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

  if (animationTrue) {
    animate();
  } else {
    electrons.draw();
    atom.drawRings();
  }
}

export function drawAtom(canvas, electronCount, text) {
  const c = canvas.getContext("2d");
  canvas.width = 450;
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
    c.clearRect(0, 0, canvas.width, canvas.height);
    atoms.forEach((atom) => {
      atom.update();
    });
  }
  init();
  animate();
}