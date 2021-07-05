// Periodic table object
var PT = {  
    minWidth: 100,
    minHeight: 100,
    margin: 10,
    padding: 1,
    minFontSize: 6.5,
    resizeRate: 10,
    
    cvs: 0,
    ctx: 0,
    w: 0,
    h: 0,
    l: 0,
    t: 0,
    rows: 0,
    cols: 0,
    scale: 0,
    resizeTimer: 0,
    view: 0,
    activeAtom: 0,
    elements: [],
    
    Colors: {
      background: "rgb(0,180,180)",
      container:  "rgb(255,255,255)",
      text:       "rgb(64,64,64)"
    },
  
  Init: function(){
    var body = document.getElementsByTagName('body')[0];
    
    PT.cvs = document.createElement('canvas');
    body.appendChild(PT.cvs);
    body.style.overflow = "hidden";
    body.style.backgroundColor = PT.Colors.background;
    PT.cvs.style.position = "fixed";
    PT.ctx = PT.cvs.getContext('2d');
 
    PT.SetScale();
  },
  
  RegisterEvents: function(){
    window.addEventListener('resize',PT.Resize,false);
    window.addEventListener('click',PT.Click,false);
  },
  
  Click: function(e){
    if (PT.view === 0){
      var ele = PT.GetElementAtClick({x:e.clientX, y:e.clientY});
      if (ele){
        PT.view = ele;
        PT.Draw();        
      }
    }
    else{
      PT.view = 0;
      PT.activeAtom = 0;
      PT.Draw();
    }
  },
 
  GetElementAtClick: function(click){
    for(var i=0,len=PT.elements.length,ele; i<len; i++){
      ele = PT.elements[i];
      if (click.x > ele.l && click.x < ele.l + PT.eleW &&
          click.y > ele.t && click.y < ele.t + PT.eleH){
        return ele;
      }
    }
    return 0;
  },
 
  Resize: function(){
    if (PT.resizeTimer){
      clearTimeout(PT.resizeTimer);
    }
    PT.resizeTimer = setTimeout(PT.SetScale, 1000/PT.resizeRate);
  },
  
  SetScale: function(){
    var bodyW = Math.max(PT.minWidth, document.documentElement.clientWidth),
        bodyH = Math.max(PT.minHeight, document.documentElement.clientHeight);
 
    PT.resizeTimer = 0;
    
    if (bodyW != PT.w || bodyH != PT.h) {
      PT.w = PT.cvs.width = bodyW;
      PT.h = PT.cvs.height = bodyH;
 
      PT.cvs.style.top = PT.cvs.style.bottom = 0;
      PT.cvs.style.left = PT.cvs.style.right = 0;
      
      var scW = (((PT.w - PT.margin * 4) - ((PT.cols+1) * PT.padding)) / PT.cols) / 100,
          scH = (((PT.h - PT.margin * 4) - ((PT.rows+1) * PT.padding)) / PT.rows) / 120;
      
      PT.scale = Math.min(scW,scH);      
      PT.l = PT.t = PT.margin * 2;
      
      if(scH<scW){ 
        PT.l += (PT.w-PT.w/(scW/PT.scale))/2;
      }
            
      PT.SetScaleElements();            
      PT.Draw();
    }
  },
  
  SetScaleElements: function(){
    PT.eleW = PT.scale * 100;
    PT.eleH = PT.scale * 120;
    PT.roundRadius = PT.scale * 5;
    PT.fontS = PT.scale * 11;
    PT.fontM = PT.scale * 15;
    PT.fontL = PT.scale * 35;
    PT.fontXL = PT.scale * 55;
    PT.fontXXL = PT.scale * 65;
 
    for(var i=0,len=PT.elements.length,ele;i<len;i++){
      ele = PT.elements[i];      
      ele.l = PT.l+(ele.x*PT.eleW+(ele.x+1)*PT.padding);
      ele.t = PT.t+(ele.y*PT.eleH+(ele.y+1)*PT.padding);
    }
  },
  
  Add: function(num,name,abbr,x,y){
    var ele = {x:x, y:y, num:num, name:name, abbr:abbr};
 
    PT.cols = Math.max(PT.cols, x+1);
    PT.rows = Math.max(PT.rows, y+1);
 
    PT.elements.push(ele);
  },  
 
  Draw: function(){        
    PT.ctx.clearRect(0,0,PT.w,PT.h);
 
    for(var i=0, len=PT.elements.length, ele; i<len; i++){
      ele=PT.elements[i];
 
      // Container
      PT.RoundedRect(ele.l, ele.t, PT.eleW, PT.eleH, PT.roundRadius);
      PT.ctx.fillStyle = PT.Colors.container;
      PT.ctx.fill();
 
      // Based on the current canvas size, draw text components
      PT.ctx.fillStyle = PT.Colors.text;
      PT.DrawText(ele.abbr,ele.l + PT.eleW/2, ele.t+PT.eleH/2+PT.fontL/2, "center", PT.fontL);
      PT.DrawText(ele.num, ele.l+PT.fontM/2, ele.t+PT.eleH-PT.fontM/2, "left", PT.fontM);
      PT.DrawText(ele.name, ele.l + PT.eleW/2, ele.t+PT.fontS+PT.fontS/2, "center", PT.fontS);
    }
    
    if (PT.view){
      
      // Set element card vars
      var ele = PT.view,
          minAxis = (PT.w < PT.h/1.2) ? "Horiz" : "Vert",
          bounds = {l:0,t:0,w:0,h:0};
          
      if (minAxis === "Horiz"){
        bounds.l = PT.w * 0.06;
        bounds.t =(PT.h - PT.w*1.2)/2 + bounds.l;
        bounds.w = PT.w * 0.88;
        bounds.h = bounds.w * 1.2;
      }
      else{
        bounds.t = PT.h * 0.06;
        bounds.l = (PT.w - PT.h/1.2)/2 + bounds.t;
        bounds.h = PT.h * 0.88;
        bounds.w = bounds.h / 1.2;
      }
      
      // Fade out background area
      PT.ctx.fillStyle = "rgba(0,0,0,0.5)";
      PT.ctx.fillRect(0,0,PT.w,PT.h);
      
      // Start a new atom simulation
      if (!PT.activeAtom || PT.activeAtom.viewAtom !== ele){
        PT.activeAtom = new PT.AtomSimulation(ele,bounds,5,4,5);
        PT.activeAtom.Initialize();
        PT.Update();
      }      
    }
  },  
  
  AtomSimulation: function(viewAtom,bounds){
    this.viewAtom = viewAtom;
    this.bounds = bounds;
    this.protons = [];
    this.neutrons = [];
    this.electrons = [];
    this.rings = [];
 
    this.Initialize = function(){      
      var i,
          len,
          nLen = viewAtom.num+1 * 2,
          dist,
          ring,
          ringLimit,
          ringOffset,
          radOut,
          prevOrbital,
          nucleonRad = bounds.w / (Math.pow(nLen*10,0.3) * 6),
          electronRad = bounds.w / (Math.pow(viewAtom.num*100,0.5) * 2);
      
      // for(i=0, len=viewAtom.num*2, dist=0,ring=0, ringLimit = 8,ringOffset = 0; i < len; i++){
      //   if (i-ringOffset > ringLimit){
      //     ring++;
      //     ringOffset = Math.min(ringOffset + ringLimit, viewAtom.num*2);
      //     ringLimit = ringLimit*1.5;
      //   }
                
      //   var pOff = ((i-ringOffset)%ringLimit)/Math.min(ringLimit,viewAtom.num*2 - ringOffset);
      //   radOut = nucleonRad - (nucleonRad * (0.1 * Math.pow(Math.max(ring-1,0),0.4)));
      //   dist = 1.6 * ring * radOut;
        
      //   if (i % 2 === 1){
      //     this.neutrons.push(new PT.OrbitObj(radOut, "rgba(64,175,165,0.6)",0.4,dist,pOff));          
      //   }
      //   else{
      //     this.protons.push(new PT.OrbitObj(radOut, "rgba(64,205,195,0.6)",0.4,dist,pOff));
      //   }
      //   if (ring < 1){
      //     ring = 1;
      //   }
      // }
 
      for(i=0, len=viewAtom.num, prevOrbital=-1; i < len; i++){
        var orbital = Math.ceil(Math.max(0,(i - 2) / 8)), 
            offset = (orbital > 0) ? ((i - 2) % 8) / 8 : i / 2,
            speed = 0.2 + Math.pow(0.8, orbital),
            dist = bounds.w * 0.3 - (bounds.w/150 * Math.floor(viewAtom.num / 8)) + 4*orbital*electronRad;
 
        this.electrons.push(
          new PT.OrbitObj(electronRad,"rgb(96,195,195)",
                          speed,dist,offset));
        if (orbital > prevOrbital){
          prevOrbital = orbital;
          this.rings.push( 
            new PT.RingObj(dist,"rgb(216,216,216)",
                           1.5 + electronRad/8));
        }
      }
    };
    
    this.DrawCard = function(){
      // Draw element card            
      PT.ctx.fillStyle = "rgb(255,255,255)";
      PT.RoundedRect(bounds.l,bounds.t,bounds.w,bounds.h,PT.roundRadius);
      PT.ctx.fill();
      
      // Number      
      PT.ctx.fillStyle = PT.Colors.text;
      PT.ctx.font = PT.fontXXL + "pt Arial";
      PT.ctx.textAlign = "left";
      PT.ctx.fillText(this.viewAtom.num, bounds.l+PT.fontXXL/2, bounds.t+PT.fontXXL*1.5);
      
      // Name
      PT.ctx.font = PT.fontXL + "pt Arial";
      PT.ctx.textAlign = "center";
      PT.ctx.fillText(this.viewAtom.name, bounds.l+bounds.w/2, bounds.t+PT.fontXXL*1.5);
      
      // Abbreviation
      PT.ctx.font = PT.fontXXL + "pt Arial";
      PT.ctx.textAlign = "right";
      PT.ctx.fillText(this.viewAtom.abbr, bounds.l+bounds.w-PT.fontXXL/2, bounds.t+PT.fontXXL*1.5);
    },
      
    this.ClearAtomArea = function(){
      PT.ctx.clearRect(bounds.l,bounds.t + bounds.h * 0.1,bounds.w,bounds.h*0.9);
    }
    
  },
    
  Update: function(){
    if (PT.view === PT.activeAtom.viewAtom){
      var i, 
          len,
          x = PT.activeAtom.bounds.l + PT.activeAtom.bounds.w/2,
          y = PT.activeAtom.bounds.t + PT.activeAtom.bounds.h * 0.55;
 
      PT.time = Date.now();
 
      PT.activeAtom.ClearAtomArea();
      PT.activeAtom.DrawCard();
 
      for(i=Math.max(PT.activeAtom.neutrons.length,PT.activeAtom.neutrons.length) - 1; i >= 0; i--){
        if (i < PT.activeAtom.neutrons.length){
          PT.activeAtom.neutrons[i].Draw(x,y);
        }
 
        if (i < PT.activeAtom.protons.length){
          PT.activeAtom.protons[i].Draw(x,y);
        }
      }
      
      for(i=0, len=PT.activeAtom.rings.length; i < len; i++){
        PT.activeAtom.rings[i].Draw(x,y);
      }
 
      for(i=0, len=PT.activeAtom.electrons.length; i < len; i++){
        PT.activeAtom.electrons[i].Draw(x,y);
      }
 
      requestAnimationFrame(PT.Update);
    }
    else{
      PT.Draw();
    }
  },  
 
  // Orbiting object
  OrbitObj: function(radius,fillStyle,orbitSpeed,orbitDist,offset){    
    this.radius = radius;
    this.fillStyle = fillStyle;
    this.orbitSpeed = orbitSpeed;
    this.orbitDist = orbitDist;
    this.offset = offset * 2 * Math.PI / orbitSpeed;
 
    this.Draw = function(centerX,centerY){
      var x = centerX + Math.sin((PT.time/1000+this.offset) * this.orbitSpeed) * this.orbitDist,
          y = centerY + Math.cos((PT.time/1000+this.offset) * this.orbitSpeed) * this.orbitDist;
 
      PT.ctx.beginPath();
      PT.ctx.arc(x, y, this.radius, 0, Math.PI*2, false);
      PT.ctx.fillStyle = this.fillStyle;
      PT.ctx.fill();
    };
  },
    
  // Ring object
  RingObj: function(radius,strokeStyle,lineWidth){    
    this.radius = radius;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
 
    this.Draw = function(centerX,centerY){
      PT.ctx.beginPath();
      PT.ctx.arc(centerX,centerY,this.radius,0,Math.PI*2,false);
      PT.ctx.strokeStyle = this.strokeStyle;
      PT.ctx.lineWidth = this.lineWidth;
      PT.ctx.stroke();
    };
  },
 
  DrawText: function(text, x, y, align, fontSize){
    if (fontSize > PT.minFontSize){
      PT.ctx.font = fontSize + "pt Arial";
      PT.ctx.textAlign = align;  
      PT.ctx.fillText(text,x,y);
    }
  },
  
  RoundedRect: function(x,y,width,height,radius){
    PT.ctx.beginPath();
    PT.ctx.moveTo(x,y+radius);
    PT.ctx.lineTo(x,y+height-radius);
    PT.ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
    PT.ctx.lineTo(x+width-radius,y+height);
    PT.ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    PT.ctx.lineTo(x+width,y+radius);
    PT.ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
    PT.ctx.lineTo(x+radius,y);
    PT.ctx.quadraticCurveTo(x,y,x,y+radius);
  }
};
 
PT.Add(1,"Hydrogen","H",0,0);
PT.Add(2,"Helium","He",17,0);
 
PT.Add(3,"Lithium","Li",0,1);
PT.Add(4,"Beryllium","Be",1,1);
PT.Add(5,"Boron","B",12,1);
PT.Add(6,"Carbon","C",13,1);
PT.Add(7,"Nitrogen","N",14,1);
PT.Add(8,"Oxygen","O",15,1);
PT.Add(9,"Fluorine","F",16,1);
PT.Add(10,"Neon","Ne",17,1);
 
PT.Add(11,"Sodium","Na",0,2);
PT.Add(12,"Magnesium","Mg",1,2);
PT.Add(13,"Aluminium","Al",12,2);
PT.Add(14,"Silicon","Si",13,2);
PT.Add(15,"Phosphorus","P",14,2);
PT.Add(16,"Sulfur","S",15,2);
PT.Add(17,"Chlorine","Cl",16,2);
PT.Add(18,"Argon","Ar",17,2);
 
PT.Add(19,"Potassium","K",0,3);
PT.Add(20,"Calcium","Ca",1,3);
PT.Add(21,"Scandium","Sc",2,3);
PT.Add(22,"Titanium","Ti",3,3);
PT.Add(23,"Vanadium","V",4,3);
PT.Add(24,"Chromium","Cr",5,3);
PT.Add(25,"Manganese","Mn",6,3);
PT.Add(26,"Iron","Fe",7,3);
PT.Add(27,"Cobalt","Co",8,3);
PT.Add(28,"Nickel","Ni",9,3);
PT.Add(29,"Copper","Cu",10,3);
PT.Add(30,"Zinc","Zn",11,3);
PT.Add(31,"Gallium","Ga",12,3);
PT.Add(32,"Germanium","Ge",13,3);
PT.Add(33,"Arsenic","As",14,3);
PT.Add(34,"Selenium","Se",15,3);
PT.Add(35,"Bromine","Br",16,3);
PT.Add(36,"Krypton","Kr",17,3);
 
PT.Add(37,"Rubidium","Rb",0,4);
PT.Add(38,"Strontium","Sr",1,4);
PT.Add(39,"Yttrium","Y",2,4);
PT.Add(40,"Zirconium","Zr",3,4);
PT.Add(41,"Niobium","Nb",4,4);
PT.Add(42,"Molybdenum","Mo",5,4);
PT.Add(43,"Technetium","Tc",6,4);
PT.Add(44,"Ruthenium","Ru",7,4);
PT.Add(45,"Rhodium","Rh",8,4);
PT.Add(46,"Palladium","Pd",9,4);
PT.Add(47,"Silver","Ag",10,4);
PT.Add(48,"Cadmium","Cd",11,4);
PT.Add(49,"Indium","In",12,4);
PT.Add(50,"Tin","Sn",13,4);
PT.Add(51,"Antimony","Sb",14,4);
PT.Add(52,"Tellurium","Te",15,4);
PT.Add(53,"Iodine","I",16,4);
PT.Add(54,"Xenon","Xe",17,4);
 
PT.Add(55,"Caesium","Cs",0,5);
PT.Add(56,"Barium","Ba",1,5);
PT.Add("57-71","","*",2,5);
PT.Add(72,"Hafnium","Hf",3,5);
PT.Add(73,"Tantalum","Ta",4,5);
PT.Add(74,"Tungsten","W",5,5);
PT.Add(75,"Rhenium","Re",6,5);
PT.Add(76,"Osmium","Os",7,5);
PT.Add(77,"Iridium","Ir",8,5);
PT.Add(78,"Platinum","Pt",9,5);
PT.Add(79,"Gold","Au",10,5);
PT.Add(80,"Mercury","Hg",11,5);
PT.Add(81,"Thallium","Ti",12,5);
PT.Add(82,"Lead","Pb",13,5);
PT.Add(83,"Bismuth","Bi",14,5);
PT.Add(84,"Polonium","Po",15,5);
PT.Add(85,"Astatine","At",16,5);
PT.Add(86,"Radon","Rn",17,5);
  
  PT.Add(87,"Francium","Fr",0,6);
  PT.Add(88,"Radium","Ra",1,6);
  PT.Add("89-103","","**",2,6);
  PT.Add(104,"Rutherfordium","Rf",3,6);
  PT.Add(105,"Dubnium","Db",4,6);
  PT.Add(106,"Seaborgium","Sg",5,6);
  PT.Add(107,"Bohrium","Bh",6,6);
  PT.Add(108,"Hassium","Hs",7,6);
  PT.Add(109,"Meitnerium","Mt",8,6);
  PT.Add(110,"Darmstadtium","Ds",9,6);
  PT.Add(111,"Roentgenium","Rg",10,6);
  PT.Add(112,"Copernicium","Cn",11,6);
  PT.Add(113,"Ununtrium","Uut",12,6);
  PT.Add(114,"Flerovium","Fl",13,6);
  PT.Add(115,"Ununpentium","Uup",14,6);
  PT.Add(116,"Livermorium","Lv",15,6);
  PT.Add(117,"Ununseptium","Uus",16,6);
  PT.Add(118,"Ununoctium","Uuo",17,6);
  
  PT.Add(57,"Lanthanum","La",2,7.5);
  PT.Add(58,"Cerium","Ce",3,7.5);
  PT.Add(59,"Praseodymium","Pr",4,7.5);
  PT.Add(60,"Neodymium","Nd",5,7.5);
  PT.Add(61,"Promethium","Pm",6,7.5);
  PT.Add(62,"Samarium","Sm",7,7.5);
  PT.Add(63,"Europium","Eu",8,7.5);
  PT.Add(64,"Gadolinium","Gd",9,7.5);
  PT.Add(65,"Terbium","Tb",10,7.5);
  PT.Add(66,"Dysprosium","Dy",11,7.5);
  PT.Add(67,"Holmium","Ho",12,7.5);
  PT.Add(68,"Erbium","Er",13,7.5);
  PT.Add(69,"Thulium","Tm",14,7.5);
  PT.Add(70,"Ytterbium","Yb",15,7.5);
  PT.Add(71,"Lutetium","Lu",16,7.5);
  
  PT.Add(89,"Actinium","Ac",2,8.5);
  PT.Add(90,"Thorium","Th",3,8.5);
  PT.Add(91,"Protactinium","Pa",4,8.5);
  PT.Add(92,"Uranium","U",5,8.5);
  PT.Add(93,"Neptunium","Np",6,8.5);
  PT.Add(94,"Plutonium","Pu",7,8.5);
  PT.Add(95,"Americium","Am",8,8.5);
  PT.Add(96,"Curium","Cm",9,8.5);
  PT.Add(97,"Berkelium","Bk",10,8.5);
  PT.Add(98,"Californium","Cf",11,8.5);
  PT.Add(99,"Einsteinium","Es",12,8.5);
  PT.Add(100,"Fermium","Fm",13,8.5);
  PT.Add(101,"Mendelevium","Md",14,8.5);
  PT.Add(102,"Nobelium","No",15,8.5);
  PT.Add(103,"Lawrencium","Lr",16,8.5);
  
  PT.Init();
  PT.RegisterEvents();
  PT.Draw();