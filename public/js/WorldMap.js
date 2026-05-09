// WorldMap.js — Artistic canvas-rendered world map with 60 tiles

class WorldMap {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx    = this.canvas.getContext('2d');
    this.W      = this.canvas.width;   // 1300
    this.H      = this.canvas.height;  // 650
    this.tiles  = [];           // populated by setTileCategories
    this.tileCategories = [];
    this.players = [];
    this.animFrame = null;
    this._waveOffset  = 0;
    this._cloudOffset = 0;
    this._glowPhase   = 0;
  }

  // ── COORDINATE CONVERSION ────────────────────────────────────
  _ll(lon, lat) {
    return {
      x: (lon + 180) / 360 * this.W,
      y: (85 - lat)  / 165 * this.H,
    };
  }

  _toXY(lonLatArr) {
    return lonLatArr.map(([lon, lat]) => {
      const p = this._ll(lon, lat);
      return [p.x, p.y];
    });
  }

  // ── TILE SETUP ───────────────────────────────────────────────
  setTileCategories(cats) {
    this.tileCategories = cats;
    this.tiles = this._buildTiles(cats);
  }

  _buildTiles(cats) {
    // 60 tiles — lon/lat positions around the world path
    const raw = [
      [1,  -45,  72], [2,  -152, 61], [3,  -125, 50], [4,  -122, 37],
      [5,  -99,  31], [6,  -81,  27], [7,  -74,  41], [8,  -71,  46],
      [9,  -99,  19], [10, -82,  22], [11, -74,   4], [12, -66,   8],
      [13, -62,  -3], [14, -43, -23], [15, -65, -17], [16, -76, -12],
      [17, -78,  -2], [18, -71, -30], [19, -65, -34], [20, -79,   9],
      [21, -22,  65], [22,  -2,  52], [23,  -8,  38], [24,  -4,  40],
      [25,   2,  47], [26,   5,  52], [27,  10,  51], [28,  12,  43],
      [29,  22,  39], [30,  10,  62], [31,  26,  64], [32,  37,  56],
      [33,  -6,  32], [34,  31,  27], [35,   8,   9], [36,  -1,   8],
      [37,  40,   9], [38,  37,   0], [39,  35,  -6], [40,  47, -20],
      [41,  25, -30], [42,  23,  -2], [43,  45,  24], [44,  73,  19],
      [45,  77,  29], [46,  84,  28], [47,  81,   8], [48, 105,  47],
      [49, 116,  40], [50, 121,  31], [51, 139,  36], [52, 127,  37],
      [53, 100,  60], [54, 101,  14], [55, 107,  16], [56, 122,  12],
      [57, 115,  -5], [58, 116, -32], [59, 151, -34], [60, 174, -41],
    ];

    return raw.map(([id, lon, lat]) => {
      const pos = this._ll(lon, lat);
      const category = (cats && cats[id - 1]) ? cats[id - 1] : 'geography';
      return { id, x: pos.x, y: pos.y, category };
    });
  }

  // ── COUNTRY SHAPES ───────────────────────────────────────────
  _drawCountries() {
    const countries = [
      // North America
      { name:'Greenland',    color:'#90CAF9', pts:[[-54,83],[-20,83],[-12,78],[-15,72],[-25,68],[-43,60],[-52,65],[-55,77]] },
      { name:'Alaska',       color:'#5C6BC0', pts:[[-140,70],[-141,60],[-163,60],[-168,65],[-168,71],[-155,71],[-140,70]] },
      { name:'Canada',       color:'#F48FB1', pts:[[-141,60],[-141,49],[-125,49],[-95,49],[-84,46],[-77,44],[-67,47],[-56,47],[-60,46],[-60,63],[-68,63],[-80,63],[-95,60],[-110,60],[-141,60]] },
      { name:'USA',          color:'#42A5F5', pts:[[-125,49],[-95,49],[-84,46],[-77,44],[-67,47],[-67,44],[-70,41],[-76,35],[-81,25],[-90,29],[-97,26],[-105,31],[-117,32],[-124,38],[-124,48],[-125,49]] },
      { name:'Mexico',       color:'#FFA726', pts:[[-117,32],[-97,26],[-90,21],[-88,16],[-92,16],[-105,23],[-114,29],[-117,32]] },
      { name:'Cuba',         color:'#66BB6A', pts:[[-85,23],[-74,20],[-74,22],[-84,23],[-85,23]] },
      { name:'Colombia',     color:'#AB47BC', pts:[[-79,8],[-67,12],[-67,6],[-76,-1],[-79,1],[-79,8]] },
      { name:'Venezuela',    color:'#FFCA28', pts:[[-67,12],[-60,9],[-61,8],[-60,5],[-67,6],[-67,12]] },
      { name:'Brazil',       color:'#66BB6A', pts:[[-34,-4],[-35,-9],[-38,-13],[-43,-23],[-48,-27],[-52,-33],[-55,-35],[-60,-33],[-64,-20],[-60,-15],[-56,-10],[-50,-1],[-44,0],[-34,-4]] },
      { name:'Peru',         color:'#FF7043', pts:[[-82,-2],[-80,-3],[-69,-14],[-70,-18],[-76,-14],[-79,-8],[-80,-2],[-82,-2]] },
      { name:'Chile',        color:'#26C6DA', pts:[[-70,-18],[-70,-55],[-75,-55],[-75,-42],[-72,-30],[-69,-20],[-70,-18]] },
      { name:'Argentina',    color:'#81D4FA', pts:[[-60,-33],[-56,-35],[-56,-51],[-66,-55],[-68,-55],[-65,-40],[-60,-33]] },
      { name:'Bolivia',      color:'#EF5350', pts:[[-69,-14],[-60,-15],[-58,-17],[-60,-22],[-68,-22],[-69,-14]] },
      // Europe
      { name:'Iceland',      color:'#80DEEA', pts:[[-25,66],[-13,65],[-13,66],[-20,66],[-25,66]] },
      { name:'UK',           color:'#EC407A', pts:[[-5,50],[-2,51],[2,51],[0,52],[-1,52],[-5,58],[-5,50]] },
      { name:'France',       color:'#5C6BC0', pts:[[-5,43],[3,43],[7,44],[7,49],[2,51],[-2,48],[-5,47],[-5,43]] },
      { name:'Spain',        color:'#FFA726', pts:[[-9,36],[3,36],[3,43],[-5,43],[-9,44],[-9,36]] },
      { name:'Portugal',     color:'#FDD835', pts:[[-9,37],[-7,37],[-7,42],[-9,42],[-9,37]] },
      { name:'Germany',      color:'#78909C', pts:[[7,48],[13,48],[15,51],[14,54],[10,55],[7,53],[7,48]] },
      { name:'Italy',        color:'#4CAF50', pts:[[7,44],[15,38],[16,39],[13,38],[8,40],[7,44]] },
      { name:'Greece',       color:'#29B6F6', pts:[[20,38],[26,38],[27,41],[22,42],[20,38]] },
      { name:'Norway',       color:'#AB47BC', pts:[[5,58],[5,62],[15,70],[28,71],[30,70],[28,63],[20,63],[14,60],[5,58]] },
      { name:'Sweden',       color:'#42A5F5', pts:[[11,56],[14,56],[14,60],[20,63],[18,69],[15,70],[5,62],[11,56]] },
      { name:'Finland',      color:'#A5D6A7', pts:[[20,60],[30,60],[28,70],[20,70],[20,60]] },
      { name:'Poland',       color:'#E53935', pts:[[14,54],[24,54],[24,50],[14,50],[14,54]] },
      { name:'Russia',       color:'#CE93D8', pts:[[30,70],[60,73],[80,73],[140,73],[160,65],[180,65],[180,54],[150,52],[140,47],[120,50],[100,50],[80,55],[60,60],[37,55],[30,60],[30,70]] },
      { name:'Turkey',       color:'#EF6C00', pts:[[26,42],[36,42],[44,38],[36,36],[26,36],[26,42]] },
      // Africa
      { name:'Morocco',      color:'#FFCC02', pts:[[-6,36],[0,35],[2,36],[2,34],[0,30],[-5,28],[-8,28],[-9,30],[-6,36]] },
      { name:'Egypt',        color:'#FFE082', pts:[[25,31],[35,30],[37,22],[33,22],[25,22],[25,31]] },
      { name:'Nigeria',      color:'#4CAF50', pts:[[3,6],[14,12],[14,6],[3,5],[3,6]] },
      { name:'Kenya',        color:'#A1887F', pts:[[34,5],[42,2],[42,-2],[37,-4],[34,1],[34,5]] },
      { name:'Tanzania',     color:'#00ACC1', pts:[[29,-1],[40,-1],[40,-11],[32,-11],[29,-5],[29,-1]] },
      { name:'South Africa', color:'#42A5F5', pts:[[17,-29],[32,-29],[32,-34],[27,-35],[17,-34],[17,-29]] },
      { name:'Ethiopia',     color:'#EF5350', pts:[[33,15],[43,12],[43,4],[36,4],[33,7],[33,15]] },
      { name:'Madagascar',   color:'#F48FB1', pts:[[44,-13],[50,-13],[50,-26],[44,-26],[44,-13]] },
      // Middle East & Asia
      { name:'Saudi Arabia', color:'#FFE082', pts:[[36,30],[56,30],[56,16],[43,14],[36,22],[36,30]] },
      { name:'India',        color:'#FF7043', pts:[[68,37],[80,37],[82,28],[78,8],[72,8],[68,23],[68,37]] },
      { name:'China',        color:'#EF5350', pts:[[73,40],[135,40],[135,25],[120,20],[110,22],[105,18],[100,20],[90,28],[80,35],[73,40]] },
      { name:'Japan',        color:'#F48FB1', pts:[[130,33],[131,31],[132,33],[136,34],[142,44],[141,44],[133,34],[130,33]] },
      { name:'South Korea',  color:'#42A5F5', pts:[[126,34],[129,34],[129,38],[126,38],[126,34]] },
      { name:'Mongolia',     color:'#A5D6A7', pts:[[87,47],[120,47],[120,42],[87,42],[87,47]] },
      { name:'Thailand',     color:'#EC407A', pts:[[98,20],[102,20],[102,13],[100,5],[98,8],[98,20]] },
      { name:'Indonesia',    color:'#FF5722', pts:[[95,-6],[141,-6],[141,-8],[130,-9],[115,-8],[95,-7],[95,-6]] },
      // Oceania
      { name:'Australia',    color:'#FFCA28', pts:[[114,-22],[114,-35],[130,-35],[138,-35],[148,-38],[154,-27],[148,-19],[136,-12],[130,-12],[121,-18],[114,-22]] },
      { name:'New Zealand',  color:'#66BB6A', pts:[[166,-46],[168,-43],[172,-44],[176,-38],[173,-36],[170,-40],[168,-41],[166,-46]] },
      { name:'Antarctica',   color:'#E3F2FD', pts:[[-180,-70],[180,-70],[180,-80],[-180,-80]] },
    ];

    const ctx = this.ctx;
    countries.forEach(c => {
      const pts = this._toXY(c.pts);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = c.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    });
  }

  // ── COUNTRY LABELS ───────────────────────────────────────────
  _drawCountryLabels() {
    const labels = [
      { text:'Canada',       lon:-100, lat:56  },
      { text:'USA',          lon: -98, lat: 38  },
      { text:'Mexico',       lon:-102, lat: 24  },
      { text:'Brazil',       lon: -52, lat:-12  },
      { text:'Argentina',    lon: -63, lat:-38  },
      { text:'Peru',         lon: -75, lat:-10  },
      { text:'UK',           lon:  -2, lat: 53  },
      { text:'France',       lon:   2, lat: 46  },
      { text:'Spain',        lon:  -4, lat: 40  },
      { text:'Germany',      lon:  10, lat: 51  },
      { text:'Italy',        lon:  12, lat: 42  },
      { text:'Russia',       lon:  90, lat: 62  },
      { text:'China',        lon: 105, lat: 35  },
      { text:'India',        lon:  78, lat: 22  },
      { text:'Egypt',        lon:  30, lat: 26  },
      { text:'Nigeria',      lon:   8, lat:  8  },
      { text:'S. Africa',    lon:  25, lat:-30  },
      { text:'Australia',    lon: 133, lat:-26  },
      { text:'Saudi Arabia', lon:  44, lat: 24  },
      { text:'Indonesia',    lon: 115, lat: -5  },
    ];
    const ctx = this.ctx;
    ctx.save();
    ctx.font = 'bold 9px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    labels.forEach(l => {
      const { x, y } = this._ll(l.lon, l.lat);
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillText(l.text, x + 0.5, y + 0.5);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillText(l.text, x, y);
    });
    ctx.restore();
  }

  // ── OCEAN LABELS ─────────────────────────────────────────────
  _drawOceanLabels() {
    const labels = [
      { text:'PACIFIC OCEAN',         lon:-170, lat: 5  },
      { text:'NORTH ATLANTIC OCEAN',  lon: -35, lat: 25 },
      { text:'SOUTH ATLANTIC OCEAN',  lon: -15, lat:-25 },
      { text:'INDIAN OCEAN',          lon:  80, lat:-20 },
      { text:'SOUTHERN OCEAN',        lon:  50, lat:-60 },
      { text:'ARCTIC OCEAN',          lon:  20, lat: 79 },
      { text:'PACIFIC OCEAN',         lon: 165, lat:-20 },
    ];
    const ctx = this.ctx;
    ctx.save();
    ctx.font = 'italic bold 10px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    labels.forEach(l => {
      const { x, y } = this._ll(l.lon, l.lat);
      ctx.fillText(l.text, x, y);
    });
    ctx.restore();
  }

  // ── OCEAN BACKGROUND ─────────────────────────────────────────
  _drawOcean() {
    const ctx = this.ctx;
    const grad = ctx.createLinearGradient(0, 0, 0, this.H);
    grad.addColorStop(0,   '#4cc9f8');
    grad.addColorStop(0.5, '#2e86c1');
    grad.addColorStop(1,   '#1a5276');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.W, this.H);

    // Wave lines
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1.5;
    for (let wy = 40; wy < this.H; wy += 22) {
      ctx.beginPath();
      for (let wx = 0; wx < this.W; wx += 4) {
        const wave = Math.sin((wx + this._waveOffset + wy * 0.4) / 28) * 2.5;
        if (wx === 0) ctx.moveTo(wx, wy + wave);
        else          ctx.lineTo(wx, wy + wave);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // ── DECORATIVE ANIMALS ───────────────────────────────────────
  _drawAllAnimals() {
    const animals = [
      { lon:-100, lat: 50, type:'bear'      },
      { lon: -80, lat: 40, type:'eagle'     },
      { lon: -55, lat:-12, type:'jaguar'    },
      { lon: 135, lat:-32, type:'kangaroo'  },
      { lon: 110, lat: 30, type:'panda'     },
      { lon:  25, lat: -5, type:'elephant'  },
      { lon:  -5, lat:-63, type:'penguin'   },
      { lon: -30, lat: 79, type:'polarbear' },
    ];
    animals.forEach(a => {
      const { x, y } = this._ll(a.lon, a.lat);
      this._drawAnimal(x, y, a.type);
    });
  }

  _drawAnimal(x, y, type) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(0.52, 0.52);
    switch(type) {
      case 'bear':      this._anBear(ctx); break;
      case 'eagle':     this._anEagle(ctx); break;
      case 'jaguar':    this._anJaguar(ctx); break;
      case 'kangaroo':  this._anKangaroo(ctx); break;
      case 'panda':     this._anPanda(ctx); break;
      case 'elephant':  this._anElephant(ctx); break;
      case 'penguin':   this._anPenguin(ctx); break;
      case 'polarbear': this._anPolarBear(ctx); break;
    }
    ctx.restore();
  }

  _anBear(ctx) {
    ctx.fillStyle = '#8B5E3C';
    ctx.beginPath(); ctx.arc(0,0,15,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(-11,-11,6,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(11,-11,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#D2A679';
    ctx.beginPath(); ctx.arc(0,4,7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-5,-2,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5,-2,2,0,Math.PI*2); ctx.fill();
  }
  _anEagle(ctx) {
    ctx.fillStyle = '#4a3000';
    ctx.beginPath(); ctx.arc(0,0,12,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(0,-5,7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#e8a800';
    ctx.beginPath();
    ctx.moveTo(-3,-2); ctx.lineTo(8,-4); ctx.lineTo(-3,0);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-2,-6,2,0,Math.PI*2); ctx.fill();
    // wings
    ctx.fillStyle = '#4a3000';
    ctx.beginPath(); ctx.ellipse(-18,2,12,5,0.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(18,2,12,5,-0.5,0,Math.PI*2); ctx.fill();
  }
  _anJaguar(ctx) {
    ctx.fillStyle = '#c8a000';
    ctx.beginPath(); ctx.arc(0,0,15,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#000000';
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2;
      ctx.beginPath();
      ctx.arc(Math.cos(a)*9,Math.sin(a)*9,2.5,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = '#e8c050';
    ctx.beginPath(); ctx.arc(-4,-3,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(4,-3,3,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-4,-3,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(4,-3,1.5,0,Math.PI*2); ctx.fill();
  }
  _anKangaroo(ctx) {
    ctx.fillStyle = '#c8905a';
    ctx.beginPath(); ctx.ellipse(0,6,8,13,0.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-4,-11,7,9,-0.3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-8,-19,2.5,5,-0.3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-4,-21,2,5,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(8,13); ctx.quadraticCurveTo(20,17,18,5);
    ctx.lineWidth=5; ctx.strokeStyle='#c8905a'; ctx.stroke();
    ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(-2,-14,1.5,0,Math.PI*2); ctx.fill();
  }
  _anPanda(ctx) {
    ctx.fillStyle='#fff';
    ctx.beginPath(); ctx.arc(0,0,15,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(-10,-12,6,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(10,-12,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#111';
    ctx.beginPath(); ctx.arc(-10,-12,4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(10,-12,4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-5,-1,5,3.5,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(5,-1,5,3.5,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#fff';
    ctx.beginPath(); ctx.arc(-5,-1,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5,-1,2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#111';
    ctx.beginPath(); ctx.arc(-5,-1,1,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5,-1,1,0,Math.PI*2); ctx.fill();
  }
  _anElephant(ctx) {
    ctx.fillStyle='#aaa';
    ctx.beginPath(); ctx.ellipse(0,0,19,14,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0,-16,13,9,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-8,-12); ctx.quadraticCurveTo(-22,0,-18,12);
    ctx.lineWidth=5; ctx.strokeStyle='#aaa'; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(16,-10,10,13,0.4,0,Math.PI*2);
    ctx.fillStyle='#c0b0b0'; ctx.fill();
    ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(4,-18,2,0,Math.PI*2); ctx.fill();
  }
  _anPenguin(ctx) {
    ctx.fillStyle='#111';
    ctx.beginPath(); ctx.ellipse(0,2,9,13,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#fff';
    ctx.beginPath(); ctx.ellipse(0,4,6,9,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0,-9,5,6,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#e8a800';
    ctx.beginPath(); ctx.moveTo(-3,-7); ctx.lineTo(3,-7); ctx.lineTo(0,-5); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(-2,-9,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(2,-9,1.5,0,Math.PI*2); ctx.fill();
  }
  _anPolarBear(ctx) {
    ctx.fillStyle='#e8f8ff';
    ctx.beginPath(); ctx.arc(0,0,15,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(-11,-11,6,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(11,-11,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#d0e8f0';
    ctx.beginPath(); ctx.arc(0,4,7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#111';
    ctx.beginPath(); ctx.arc(-5,-2,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5,-2,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(0,5,1.5,0,Math.PI*2); ctx.fill();
  }

  // ── LANDMARKS ────────────────────────────────────────────────
  _drawLandmarks() {
    const lms = [
      { lon: 2,    lat: 48.9, draw: (x,y) => this._lmEiffelTower(x,y),  label:'Eiffel Tower' },
      { lon:-0.12, lat: 51.5, draw: (x,y) => this._lmBigBen(x,y),       label:'Big Ben'      },
      { lon:12.5,  lat: 41.9, draw: (x,y) => this._lmColosseum(x,y),    label:'Colosseum'    },
      { lon:78.0,  lat: 27.2, draw: (x,y) => this._lmTajMahal(x,y),     label:'Taj Mahal'    },
      { lon:116.6, lat: 40.3, draw: (x,y) => this._lmGreatWall(x,y),    label:'Great Wall'   },
      { lon:-74.0, lat: 40.7, draw: (x,y) => this._lmStatue(x,y),       label:'Liberty'      },
      { lon:151.2, lat:-33.9, draw: (x,y) => this._lmOperaHouse(x,y),   label:'Opera House'  },
      { lon:31.1,  lat: 29.9, draw: (x,y) => this._lmPyramids(x,y),     label:'Pyramids'     },
    ];
    const ctx = this.ctx;
    lms.forEach(lm => {
      const { x, y } = this._ll(lm.lon, lm.lat);
      lm.draw(x, y);
    });
  }

  _lmEiffelTower(x, y) {
    const ctx = this.ctx; ctx.save();
    ctx.fillStyle = '#888';
    ctx.beginPath(); ctx.moveTo(x,y-18); ctx.lineTo(x-4,y); ctx.lineTo(x-7,y+6); ctx.lineTo(x+7,y+6); ctx.lineTo(x+4,y); ctx.closePath(); ctx.fill();
    ctx.fillRect(x-8,y+6,16,3); ctx.restore();
  }
  _lmBigBen(x, y) {
    const ctx = this.ctx; ctx.save();
    ctx.fillStyle = '#b8965a';
    ctx.fillRect(x-3,y-16,6,18);
    ctx.beginPath(); ctx.moveTo(x-4,y-16); ctx.lineTo(x,y-24); ctx.lineTo(x+4,y-16); ctx.closePath(); ctx.fill();
    ctx.strokeStyle='#fff'; ctx.lineWidth=1; ctx.strokeRect(x-3,y-13,6,6); ctx.restore();
  }
  _lmColosseum(x, y) {
    const ctx = this.ctx; ctx.save();
    ctx.strokeStyle = '#c8a060'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(x,y,14,9,0,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x,y,9,5,0,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle='#c8a060';
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI*2;
      ctx.beginPath(); ctx.arc(x+Math.cos(a)*14,y+Math.sin(a)*9,1.5,0,Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }
  _lmTajMahal(x, y) {
    const ctx = this.ctx; ctx.save();
    ctx.fillStyle = '#f0ece4';
    ctx.fillRect(x-10,y-2,20,8);
    ctx.beginPath(); ctx.arc(x,y-2,7,Math.PI,0); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x,y-9); ctx.lineTo(x-2,y-2); ctx.lineTo(x+2,y-2); ctx.closePath(); ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,0.2)'; ctx.lineWidth=0.5; ctx.strokeRect(x-10,y-2,20,8); ctx.restore();
  }
  _lmGreatWall(x, y) {
    const ctx = this.ctx; ctx.save();
    ctx.strokeStyle = '#c0a080'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x-20,y+2); ctx.quadraticCurveTo(x,y-10,x+20,y+2); ctx.stroke();
    for(let i=-15;i<=15;i+=5){
      ctx.fillStyle='#c0a080';
      ctx.fillRect(x+i,y-12,3,4);
    }
    ctx.restore();
  }
  _lmStatue(x, y) {
    const ctx = this.ctx; ctx.save();
    ctx.fillStyle = '#5b9e8c';
    ctx.fillRect(x-3,y-2,6,10);
    ctx.beginPath(); ctx.arc(x,y-2,5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#7aba9a';
    ctx.beginPath(); ctx.moveTo(x,y-7); ctx.lineTo(x-2,y-2); ctx.lineTo(x+2,y-2); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+3,y-4); ctx.lineTo(x+8,y-6); ctx.lineWidth=2; ctx.strokeStyle='#7aba9a'; ctx.stroke(); ctx.restore();
  }
  _lmOperaHouse(x, y) {
    const ctx = this.ctx; ctx.save();
    ctx.fillStyle = '#f0ece4';
    ctx.beginPath(); ctx.moveTo(x-14,y+4); ctx.quadraticCurveTo(x-8,y-12,x,y+4); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x,y+4); ctx.quadraticCurveTo(x+8,y-8,x+14,y+4); ctx.closePath(); ctx.fill();
    ctx.fillRect(x-16,y+4,32,3); ctx.restore();
  }
  _lmPyramids(x, y) {
    const ctx = this.ctx; ctx.save();
    ctx.fillStyle = '#d4a83a';
    ctx.beginPath(); ctx.moveTo(x,y-16); ctx.lineTo(x-14,y+4); ctx.lineTo(x+14,y+4); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+10,y-10); ctx.lineTo(x+20,y+4); ctx.lineTo(x+30,y+4); ctx.closePath();
    ctx.fillStyle='#c8a030'; ctx.fill(); ctx.restore();
  }

  // ── TILE ICON DRAWING ────────────────────────────────────────
  _drawTileIcon(ctx, x, y, category, r) {
    const scale = r / 18;
    ctx.save();
    ctx.translate(x, y - r * 0.25);
    ctx.scale(scale * 0.6, scale * 0.6);
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.fillStyle   = 'rgba(255,255,255,0.9)';
    ctx.lineWidth   = 2;
    ctx.lineCap     = 'round';

    switch (category) {
      case 'geography': {
        // compass rose
        ctx.beginPath(); ctx.arc(0,0,8,0,Math.PI*2); ctx.stroke();
        [[0,-9],[0,9],[-9,0],[9,0]].forEach(([dx,dy])=>{
          ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(dx,dy); ctx.stroke();
        });
        break;
      }
      case 'mathematics': {
        // Σ symbol
        ctx.font = 'bold 14px serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('Σ', 0, 0);
        break;
      }
      case 'biology': {
        // leaf
        ctx.beginPath();
        ctx.moveTo(0,8); ctx.quadraticCurveTo(-8,-4,0,-10); ctx.quadraticCurveTo(8,-4,0,8);
        ctx.fill();
        ctx.beginPath(); ctx.moveTo(0,8); ctx.lineTo(0,-8);
        ctx.strokeStyle='rgba(0,0,0,0.3)'; ctx.lineWidth=1; ctx.stroke();
        break;
      }
      case 'general': {
        // star
        ctx.beginPath();
        for(let i=0;i<5;i++){
          const ao=i*Math.PI*2/5-Math.PI/2;
          const ai=ao+Math.PI/5;
          if(i===0) ctx.moveTo(Math.cos(ao)*9,Math.sin(ao)*9);
          else ctx.lineTo(Math.cos(ao)*9,Math.sin(ao)*9);
          ctx.lineTo(Math.cos(ai)*4,Math.sin(ai)*4);
        }
        ctx.closePath(); ctx.fill();
        break;
      }
      case 'funfacts': {
        // lightning bolt
        ctx.beginPath();
        ctx.moveTo(3,-10); ctx.lineTo(-2,0); ctx.lineTo(2,0); ctx.lineTo(-3,10); ctx.lineTo(6,0); ctx.lineTo(1,0);
        ctx.closePath(); ctx.fill();
        break;
      }
      case 'squid': {
        // simple squid
        ctx.beginPath(); ctx.ellipse(0,-3,5,7,0,0,Math.PI*2); ctx.fill();
        for(let i=-4;i<=4;i+=2){
          ctx.beginPath(); ctx.moveTo(i,4); ctx.lineTo(i+0.5,10); ctx.lineWidth=1.5; ctx.stroke();
        }
        ctx.beginPath(); ctx.moveTo(-3,-4); ctx.lineTo(-8,-10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(3,-4); ctx.lineTo(8,-10); ctx.stroke();
        break;
      }
      case 'memory': {
        // card pair
        ctx.strokeStyle='rgba(255,255,255,0.9)';
        ctx.lineWidth=1.5;
        ctx.strokeRect(-8,-7,9,13);
        ctx.strokeRect(-1,-4,9,13);
        ctx.beginPath(); ctx.arc(-3,2,3,0,Math.PI*2); ctx.stroke();
        break;
      }
      case 'start': {
        // flag
        ctx.beginPath(); ctx.moveTo(-4,-10); ctx.lineTo(-4,9); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-4,-10); ctx.lineTo(6,-6); ctx.lineTo(-4,-2); ctx.closePath(); ctx.fill();
        break;
      }
      case 'finish': {
        // trophy
        ctx.beginPath(); ctx.moveTo(-7,-8); ctx.lineTo(7,-8);
        ctx.quadraticCurveTo(7,4,0,7); ctx.quadraticCurveTo(-7,4,-7,-8); ctx.fill();
        ctx.fillRect(-2,7,4,5); ctx.fillRect(-5,11,10,3);
        break;
      }
    }
    ctx.restore();
  }

  // ── DRAW A SINGLE TILE ───────────────────────────────────────
  _drawTile(tile, highlighted) {
    const ctx  = this.ctx;
    const cat  = tile.category || 'geography';
    const meta = CATEGORY_META[cat] || CATEGORY_META.geography;
    const { x, y } = tile;

    let r = 15;
    if (cat === 'start' || cat === 'finish') r = 20;
    else if (cat === 'squid' || cat === 'memory') r = 17;
    if (highlighted) r += 3;

    // Pulsing glow ring
    if (highlighted) {
      const pulse = Math.sin(this._glowPhase) * 0.35 + 0.65;
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r + 8, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(255,220,50,${pulse})`;
      ctx.lineWidth = 4; ctx.stroke(); ctx.restore();
    }

    // Shadow
    ctx.save();
    ctx.shadowColor   = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur    = 7;
    ctx.shadowOffsetY = 3;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = meta.color;
    ctx.fill(); ctx.restore();

    // White border
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.lineWidth = highlighted ? 3 : 2;
    ctx.stroke();

    // Tile number
    ctx.fillStyle = 'white';
    ctx.font = `bold ${highlighted ? 10 : 8}px Nunito, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tile.id, x, y + r * 0.42);

    // Category icon
    this._drawTileIcon(ctx, x, y, cat, r);
  }

  // ── TILE PATH ────────────────────────────────────────────────
  _drawPath() {
    const ctx = this.ctx;
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath();
    this.tiles.forEach((t, i) => {
      if (i === 0) ctx.moveTo(t.x, t.y);
      else         ctx.lineTo(t.x, t.y);
    });
    ctx.stroke();
    ctx.restore();
  }

  // ── PLAYER PIECES ─────────────────────────────────────────────
  drawPlayers(players) {
    this.players = players;
  }

  _drawPlayerPieces() {
    if (!this.players || !this.players.length) return;
    const byTile = {};
    for (const p of this.players) {
      if (!byTile[p.tileId]) byTile[p.tileId] = [];
      byTile[p.tileId].push(p);
    }
    for (const [tileId, group] of Object.entries(byTile)) {
      const tile = this.tiles[+tileId - 1];
      if (!tile) continue;
      const n = group.length;
      group.forEach((p, i) => {
        const angle  = n > 1 ? (i / n) * Math.PI * 2 - Math.PI / 2 : 0;
        const spread = n > 1 ? 18 : 0;
        const px = tile.x + Math.cos(angle) * spread;
        const py = tile.y + Math.sin(angle) * spread;
        Avatars.drawPiece(this.ctx, px, py - 18, p.avatarType, p.color, 0.95);
      });
    }
  }

  // ── CLOUDS ───────────────────────────────────────────────────
  _drawClouds() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    const clouds = [
      {x:80,y:45,r:14},{x:250,y:30,r:12},{x:550,y:52,r:16},
      {x:820,y:38,r:13},{x:1100,y:32,r:14},{x:1250,y:58,r:11},
    ];
    clouds.forEach(c => {
      const ox = ((c.x + this._cloudOffset) % (this.W + 80)) - 40;
      ctx.beginPath();
      ctx.arc(ox,c.y,c.r,0,Math.PI*2);
      ctx.arc(ox+c.r,c.y-3,c.r*0.8,0,Math.PI*2);
      ctx.arc(ox+c.r*2,c.y,c.r*0.9,0,Math.PI*2);
      ctx.fill();
    });
    ctx.restore();
  }

  // ── MAIN RENDER ───────────────────────────────────────────────
  render(highlightTileId) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);

    this._drawOcean();
    this._drawCountries();
    this._drawClouds();
    this._drawLandmarks();
    this._drawAllAnimals();
    this._drawOceanLabels();
    this._drawCountryLabels();
    this._drawPath();

    this.tiles.forEach(t => {
      this._drawTile(t, t.id === highlightTileId);
    });

    this._drawPlayerPieces();
  }

  // ── ANIMATION LOOP ────────────────────────────────────────────
  startAnimation(getState) {
    const loop = () => {
      this._waveOffset  += 0.7;
      this._cloudOffset += 0.12;
      this._glowPhase   += 0.06;
      const state = getState();
      this.players = state.players || [];
      if (state.tileCategories && state.tileCategories.length) {
        this.tileCategories = state.tileCategories;
        this.tiles = this._buildTiles(state.tileCategories);
      }
      this.render(state.highlightTileId);
      this.animFrame = requestAnimationFrame(loop);
    };
    loop();
  }

  stopAnimation() {
    if (this.animFrame) { cancelAnimationFrame(this.animFrame); this.animFrame = null; }
  }

  // ── ZOOM ──────────────────────────────────────────────────────
  zoomToTile(tileId, mapContainer) {
    const tile = this.tiles[tileId - 1];
    if (!tile) return;
    const canvas = this.canvas;
    const cw     = canvas.offsetWidth  || this.W;
    const ch     = canvas.offsetHeight || this.H;
    const sx     = cw / this.W;
    const sy     = ch / this.H;
    const scale  = 2.4;
    const tx     = (cw / 2) - (tile.x * sx * scale);
    const ty     = (ch / 2) - (tile.y * sy * scale);
    canvas.style.transformOrigin = '0 0';
    canvas.style.transform = `scale(${scale}) translate(${tx/scale}px,${ty/scale}px)`;
    const lbl = document.getElementById('zoom-label');
    if (lbl) { lbl.textContent = tile.category ? (CATEGORY_META[tile.category]||{}).label || '' : ''; lbl.classList.add('visible'); }
  }

  zoomOut() {
    this.canvas.style.transformOrigin = 'center center';
    this.canvas.style.transform = 'scale(1) translate(0,0)';
    const lbl = document.getElementById('zoom-label');
    if (lbl) lbl.classList.remove('visible');
  }

  getTile(id) { return this.tiles[id - 1] || null; }
}
