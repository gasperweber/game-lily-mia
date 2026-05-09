// WorldMap.js — Canvas-rendered cartoon world map with 60 tiles

class WorldMap {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx    = this.canvas.getContext('2d');
    this.W      = this.canvas.width;
    this.H      = this.canvas.height;
    this.tiles  = this._buildTiles();
    this.players = [];
    this.animFrame = null;
    this._cloudOffset = 0;
    this._waveOffset  = 0;
    this._landmarks   = this._buildLandmarks();
    this._animals     = this._buildMapAnimals();
  }

  // Convert lon/lat to canvas pixel
  _ll(lon, lat) {
    const x = (lon + 180) / 360 * this.W;
    const y = (85 - lat) / 165 * this.H;
    return { x, y };
  }

  // ── 60 TILES ──────────────────────────────────────────────
  _buildTiles() {
    const W = this.W, H = this.H;
    // Each tile: { id, country, continent, x, y, type }
    // type: 'normal' | 'special' (memory game) | 'start' | 'finish'
    const raw = [
      // North America
      [1,  "Greenland",      "Arctic",          -45,  72, "start"],
      [2,  "Alaska",         "North America",   -152, 61, "normal"],
      [3,  "Canada West",    "North America",   -125, 50, "normal"],
      [4,  "California",     "North America",   -122, 37, "normal"],
      [5,  "Texas",          "North America",   -99,  31, "normal"],
      [6,  "Florida",        "North America",   -81,  27, "normal"],
      [7,  "New York",       "North America",   -74,  41, "normal"],
      [8,  "Canada East",    "North America",   -71,  46, "special"],
      [9,  "Mexico",         "North America",   -99,  19, "normal"],
      [10, "Cuba",           "Central America & Caribbean", -82, 22, "normal"],
      // Central & South America
      [11, "Colombia",       "South America",   -74,  4,  "normal"],
      [12, "Venezuela",      "South America",   -66,  8,  "special"],
      [13, "Amazon",         "South America",   -62,  -3, "normal"],
      [14, "Brazil",         "South America",   -43,  -23,"normal"],
      [15, "Bolivia",        "South America",   -65,  -17,"normal"],
      [16, "Peru",           "South America",   -76,  -12,"normal"],
      [17, "Ecuador",        "South America",   -78,  -2, "special"],
      [18, "Chile",          "South America",   -71,  -30,"normal"],
      [19, "Argentina",      "South America",   -65,  -34,"normal"],
      [20, "Panama",         "Central America & Caribbean",-79, 9,"normal"],
      // Europe
      [21, "Iceland",        "Europe",          -22,  65, "normal"],
      [22, "United Kingdom", "Europe",          -2,   52, "normal"],
      [23, "Portugal",       "Europe",          -8,   38, "special"],
      [24, "Spain",          "Europe",          -4,   40, "normal"],
      [25, "France",         "Europe",          2,    47, "normal"],
      [26, "Netherlands",    "Europe",          5,    52, "normal"],
      [27, "Germany",        "Europe",          10,   51, "normal"],
      [28, "Italy",          "Europe",          12,   43, "special"],
      [29, "Greece",         "Europe",          22,   39, "normal"],
      [30, "Norway",         "Europe",          10,   62, "normal"],
      [31, "Finland",        "Europe",          26,   64, "normal"],
      [32, "Russia West",    "Europe",          37,   56, "normal"],
      // Africa
      [33, "Morocco",        "Africa",          -6,   32, "normal"],
      [34, "Egypt",          "Africa",          31,   27, "normal"],
      [35, "Nigeria",        "Africa",          8,    9,  "normal"],
      [36, "Ghana",          "Africa",          -1,   8,  "special"],
      [37, "Ethiopia",       "Africa",          40,   9,  "normal"],
      [38, "Kenya",          "Africa",          37,   0,  "normal"],
      [39, "Tanzania",       "Africa",          35,   -6, "normal"],
      [40, "Madagascar",     "Africa",          47,   -20,"special"],
      [41, "South Africa",   "Africa",          25,   -30,"normal"],
      [42, "DR Congo",       "Africa",          23,   -2, "normal"],
      // Middle East & South Asia
      [43, "Saudi Arabia",   "Middle East",     45,   24, "normal"],
      [44, "India South",    "South Asia",      73,   19, "normal"],
      [45, "India North",    "South Asia",      77,   29, "special"],
      [46, "Nepal",          "South Asia",      84,   28, "normal"],
      [47, "Sri Lanka",      "South Asia",      81,   8,  "normal"],
      // East Asia
      [48, "Mongolia",       "East Asia",       105,  47, "normal"],
      [49, "China North",    "East Asia",       116,  40, "normal"],
      [50, "China South",    "East Asia",       121,  31, "special"],
      [51, "Japan",          "East Asia",       139,  36, "normal"],
      [52, "South Korea",    "East Asia",       127,  37, "normal"],
      [53, "Russia East",    "East Asia",       100,  60, "normal"],
      // Southeast Asia
      [54, "Thailand",       "Southeast Asia",  101,  14, "normal"],
      [55, "Vietnam",        "Southeast Asia",  107,  16, "normal"],
      [56, "Philippines",    "Southeast Asia",  122,  12, "special"],
      [57, "Indonesia",      "Southeast Asia",  115,  -5, "normal"],
      // Oceania
      [58, "Australia West", "Oceania",         116,  -32,"normal"],
      [59, "Australia East", "Oceania",         151,  -34,"normal"],
      [60, "New Zealand",    "Oceania",         174,  -41,"finish"],
    ];

    return raw.map(([id, country, continent, lon, lat, type]) => {
      const pos = this._ll(lon, lat);
      return { id, country, continent, x: pos.x, y: pos.y, type };
    });
  }

  // ── LANDMARKS ────────────────────────────────────────────
  _buildLandmarks() {
    return [
      { lon: 2,   lat: 48.8, label: "Eiffel Tower", draw: (ctx,x,y) => this._drawEiffelTower(ctx,x,y) },
      { lon: -0.1,lat: 51.5, label: "Big Ben",      draw: (ctx,x,y) => this._drawBigBen(ctx,x,y) },
      { lon: -73.9,lat:40.7, label: "Skyscraper",   draw: (ctx,x,y) => this._drawSkyscraper(ctx,x,y) },
      { lon: -122.5,lat:37.8,label: "Golden Gate",  draw: (ctx,x,y) => this._drawBridge(ctx,x,y) },
    ];
  }

  _buildMapAnimals() {
    // Decorative cartoon animals on the map
    return [
      { lon: -100, lat: 50,  animal: "bear" },
      { lon: -70,  lat: -15, animal: "parrot" },
      { lon: 35,   lat: -3,  animal: "elephant" },
      { lon: 33,   lat: 0,   animal: "zebra" },
      { lon: 25,   lat: -25, animal: "lion" },
      { lon: 85,   lat: 30,  animal: "tiger" },
      { lon: 135,  lat: 34,  animal: "panda" },
      { lon: 148,  lat: -30, animal: "kangaroo" },
    ];
  }

  // ── DRAW TILE ─────────────────────────────────────────────
  _drawTile(tile, highlighted) {
    const ctx = this.ctx;
    const r = highlighted ? 18 : 13;
    const { x, y, type } = tile;

    // Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur  = 8;
    ctx.shadowOffsetY = 3;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);

    if (type === 'start')        { ctx.fillStyle = '#27ae60'; }
    else if (type === 'finish')  { ctx.fillStyle = '#ffd700'; }
    else if (type === 'special') { ctx.fillStyle = '#e74c3c'; }
    else                         { ctx.fillStyle = '#ff8c42'; }
    ctx.fill();

    ctx.restore();

    // Border
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = highlighted ? 4 : 2.5;
    ctx.stroke();

    // Number
    ctx.fillStyle = 'white';
    ctx.font = `bold ${highlighted ? 11 : 9}px Nunito, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tile.id, x, y);

    // Pulsing ring for highlighted tile
    if (highlighted) {
      const pulse = Math.sin(Date.now() / 300) * 0.4 + 0.6;
      ctx.beginPath();
      ctx.arc(x, y, r + 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,220,0,${pulse})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  _drawPath() {
    const ctx = this.ctx;
    ctx.save();
    ctx.setLineDash([6, 4]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.beginPath();
    for (let i = 0; i < this.tiles.length; i++) {
      const t = this.tiles[i];
      if (i === 0) ctx.moveTo(t.x, t.y);
      else         ctx.lineTo(t.x, t.y);
    }
    ctx.stroke();
    ctx.restore();
  }

  // ── CONTINENT SHAPES ─────────────────────────────────────
  _drawContinents() {
    this._drawNorthAmerica();
    this._drawSouthAmerica();
    this._drawEurope();
    this._drawAfrica();
    this._drawAsia();
    this._drawAustralia();
    this._drawAntarctica();
    this._drawGreenland();
  }

  _fillContinent(points, fillColor, strokeColor='rgba(255,255,255,0.4)') {
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    const [fx, fy] = points[0];
    ctx.moveTo(fx, fy);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  _toXY(lonLatArr) {
    return lonLatArr.map(([lon, lat]) => {
      const p = this._ll(lon, lat);
      return [p.x, p.y];
    });
  }

  _drawNorthAmerica() {
    const pts = this._toXY([
      [-168,71],[-140,71],[-130,73],[-95,73],[-80,73],[-67,63],
      [-55,48],[-55,46],[-67,47],[-66,44],[-68,44],[-70,41],
      [-75,35],[-80,25],[-87,16],[-92,16],[-88,23],[-104,23],
      [-110,32],[-125,33],[-120,38],[-122,37],[-124,48],
      [-125,50],[-130,55],[-133,57],[-140,60],[-145,62],
      [-155,59],[-163,60],[-168,65]
    ]);
    this._fillContinent(pts, '#6fba5a');

    // Color the desert regions sandy
    const desert = this._toXY([
      [-104,23],[-88,23],[-90,30],[-100,32],[-110,32]
    ]);
    this._fillContinent(desert, '#d4b483', 'transparent');
  }

  _drawSouthAmerica() {
    const pts = this._toXY([
      [-79,9],[-75,9],[-62,10],[-60,6],[-52,5],[-50,0],
      [-48,-5],[-43,-23],[-42,-22],[-50,-30],[-55,-35],
      [-65,-55],[-68,-55],[-72,-42],[-72,-30],[-68,-18],
      [-70,-15],[-75,-12],[-79,0],[-77,8]
    ]);
    this._fillContinent(pts, '#78c85e');

    // Amazon basin slightly darker green
    const amazon = this._toXY([
      [-73,3],[-52,3],[-48,-5],[-60,-10],[-75,-5]
    ]);
    this._fillContinent(amazon, '#5aa845', 'transparent');

    // Patagonia sandy
    const pat = this._toXY([
      [-72,-38],[-65,-38],[-65,-55],[-70,-55],[-72,-42]
    ]);
    this._fillContinent(pat, '#c9b882', 'transparent');
  }

  _drawEurope() {
    const pts = this._toXY([
      [-10,70],[30,71],[40,63],[30,60],[25,65],[15,70],
      [5,60],[-5,65],[-25,65],
      // south
      [-10,70],[-10,62],[0,58],[5,52],[2,48],[-5,43],
      [-9,38],[0,37],[5,36],[18,37],[23,38],[28,37],
      [35,37],[40,40],[40,63]
    ]);
    this._fillContinent(pts, '#7ec860');
  }

  _drawAfrica() {
    const pts = this._toXY([
      [-6,38],[37,38],[38,35],[42,12],[45,12],[51,12],
      [44,-11],[40,-10],[36,-3],[38,-11],[36,-17],
      [33,-28],[27,-34],[18,-35],[15,-30],[12,-18],
      [8,-5],[8,5],[1,5],[-5,5],[-10,8],[-15,15],
      [-15,25],[-10,36],[-5,38]
    ]);
    this._fillContinent(pts, '#78c85e');

    // Sahara desert
    const sahara = this._toXY([
      [-5,30],[38,30],[38,18],[12,18],[8,20],[-5,22]
    ]);
    this._fillContinent(sahara, '#e8c96b', 'transparent');
  }

  _drawAsia() {
    const pts = this._toXY([
      [37,56],[37,70],[50,73],[80,78],[100,78],
      [140,72],[170,65],[180,60],[170,50],[155,52],
      [142,47],[140,36],[130,34],[121,25],[110,18],
      [100,4],[105,-5],[120,-10],[128,-4],[135,0],
      [135,10],[120,25],[115,30],[100,30],[95,28],
      [73,8],[65,25],[45,12],[35,37],[40,40],[40,63],
      [37,70]
    ]);
    this._fillContinent(pts, '#74c260');

    // Siberian tundra lighter
    const siberia = this._toXY([
      [60,60],[160,60],[160,70],[60,70]
    ]);
    this._fillContinent(siberia, '#90d080', 'transparent');

    // Arabian peninsula — sandy
    const arabia = this._toXY([
      [35,28],[60,28],[60,12],[45,12],[37,22]
    ]);
    this._fillContinent(arabia, '#e8c96b', 'transparent');

    // Gobi desert
    const gobi = this._toXY([
      [90,38],[120,38],[120,45],[90,45]
    ]);
    this._fillContinent(gobi, '#d4c08a', 'transparent');
  }

  _drawAustralia() {
    const pts = this._toXY([
      [114,-22],[114,-35],[130,-35],[134,-33],[138,-35],
      [147,-38],[151,-34],[154,-27],[148,-19],[142,-10],
      [137,-12],[130,-12],[122,-18],[114,-22]
    ]);
    this._fillContinent(pts, '#c9b56a');

    // Coastal green strip
    const coast = this._toXY([
      [145,-38],[154,-27],[148,-19],[145,-38]
    ]);
    this._fillContinent(coast, '#7ec860', 'transparent');

    // NZ
    const nz = this._toXY([
      [166,-46],[168,-43],[172,-44],[176,-38],[172,-36],
      [170,-40],[168,-41],[166,-46]
    ]);
    this._fillContinent(nz, '#7ec860');
  }

  _drawAntarctica() {
    const pts = this._toXY([
      [-180,-70],[-120,-70],[-60,-70],[0,-70],[60,-70],
      [120,-70],[180,-70],[180,-80],[-180,-80]
    ]);
    this._fillContinent(pts, '#dff0ff');
  }

  _drawGreenland() {
    const pts = this._toXY([
      [-25,83],[-15,82],[0,81],[5,76],[-10,72],
      [-20,70],[-30,68],[-44,60],[-52,65],[-58,70],
      [-55,77],[-42,83],[-25,83]
    ]);
    this._fillContinent(pts, '#b8e0f5');
  }

  // ── LANDMARKS ────────────────────────────────────────────
  _drawEiffelTower(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#7f7f7f';
    ctx.beginPath();
    ctx.moveTo(x, y - 20);
    ctx.lineTo(x - 5, y);
    ctx.lineTo(x - 8, y + 8);
    ctx.lineTo(x + 8, y + 8);
    ctx.lineTo(x + 5, y);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x - 9, y + 8, 18, 3);
    ctx.restore();
  }

  _drawBigBen(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#a08060';
    ctx.fillRect(x - 4, y - 18, 8, 20);
    ctx.beginPath();
    ctx.moveTo(x - 5, y - 18);
    ctx.lineTo(x, y - 26);
    ctx.lineTo(x + 5, y - 18);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(x - 4, y - 15, 8, 8);
    ctx.restore();
  }

  _drawBridge(ctx, x, y) {
    ctx.save();
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 20, y);
    ctx.lineTo(x + 20, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - 8, y);
    ctx.lineTo(x - 8, y - 18);
    ctx.moveTo(x + 8, y);
    ctx.lineTo(x + 8, y - 18);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - 8, y - 18);
    ctx.quadraticCurveTo(x, y - 24, x + 8, y - 18);
    ctx.stroke();
    ctx.restore();
  }

  _drawSkyscraper(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#7bafd4';
    ctx.fillRect(x - 5, y - 22, 10, 22);
    ctx.fillRect(x - 3, y - 30, 6, 10);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(x - 4, y - 20 + i * 4, 3, 2);
      ctx.fillRect(x + 1, y - 20 + i * 4, 3, 2);
    }
    ctx.restore();
  }

  // ── CARTOON ANIMALS ON MAP ───────────────────────────────
  _drawCartoonAnimal(ctx, x, y, type) {
    ctx.save();
    ctx.translate(x, y);
    const scale = 0.55;
    ctx.scale(scale, scale);
    switch(type) {
      case 'bear':     this._drawBear(ctx); break;
      case 'elephant': this._drawElephant(ctx); break;
      case 'zebra':    this._drawZebra(ctx); break;
      case 'lion':     this._drawLion(ctx); break;
      case 'tiger':    this._drawTiger(ctx); break;
      case 'panda':    this._drawPanda(ctx); break;
      case 'kangaroo': this._drawKangaroo(ctx); break;
      case 'parrot':   this._drawParrot(ctx); break;
    }
    ctx.restore();
  }

  _drawBear(ctx) {
    ctx.fillStyle = '#8B5E3C';
    ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(-12, -12, 7, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(12, -12, 7, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#D2A679';
    ctx.beginPath(); ctx.arc(0, 4, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1a0800';
    ctx.beginPath(); ctx.arc(-5, -3, 2.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5, -3, 2.5, 0, Math.PI*2); ctx.fill();
  }

  _drawElephant(ctx) {
    ctx.fillStyle = '#aaa';
    ctx.beginPath(); ctx.ellipse(0, 0, 20, 15, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, -16, 14, 10, 0, 0, Math.PI*2); ctx.fill();
    // trunk
    ctx.beginPath();
    ctx.moveTo(-8, -12); ctx.quadraticCurveTo(-22, 0, -18, 12);
    ctx.lineWidth = 5; ctx.strokeStyle = '#aaa'; ctx.stroke();
    // ears
    ctx.beginPath(); ctx.ellipse(16, -10, 10, 14, 0.4, 0, Math.PI*2);
    ctx.fillStyle = '#c0b0b0'; ctx.fill();
    ctx.fillStyle = '#1a0800';
    ctx.beginPath(); ctx.arc(4, -18, 2, 0, Math.PI*2); ctx.fill();
  }

  _drawZebra(ctx) {
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.ellipse(0, 4, 16, 10, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-2, -10, 9, 12, -0.2, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#111';
    for (let i = -8; i < 18; i += 5) {
      ctx.fillRect(i - 16, 0, 2.5, 12);
    }
    ctx.fillStyle = '#1a0800';
    ctx.beginPath(); ctx.arc(4, -14, 2, 0, Math.PI*2); ctx.fill();
  }

  _drawLion(ctx) {
    ctx.fillStyle = '#c8a060';
    ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#8B5E20';
    ctx.beginPath(); ctx.arc(0, -2, 14, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#e8c060';
    ctx.beginPath(); ctx.arc(0, -2, 11, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1a0800';
    ctx.beginPath(); ctx.arc(-4, -4, 2.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(4, -4, 2.5, 0, Math.PI*2); ctx.fill();
  }

  _drawTiger(ctx) {
    ctx.fillStyle = '#e87820';
    ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#000';
    for (let a = 0; a < Math.PI*2; a += 0.6) {
      ctx.beginPath();
      ctx.moveTo(Math.cos(a)*9, Math.sin(a)*9);
      ctx.lineTo(Math.cos(a)*16, Math.sin(a)*16);
      ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-4, -2, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(4, -2, 3, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-4, -2, 1.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(4, -2, 1.5, 0, Math.PI*2); ctx.fill();
  }

  _drawPanda(ctx) {
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(-10, -12, 7, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(10, -12, 7, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-10, -12, 5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(10, -12, 5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-5, -2, 5, 4, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(5, -2, 5, 4, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-5, -2, 2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5, -2, 2, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-5, -2, 1, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5, -2, 1, 0, Math.PI*2); ctx.fill();
  }

  _drawKangaroo(ctx) {
    ctx.fillStyle = '#c8905a';
    ctx.beginPath(); ctx.ellipse(0, 5, 8, 14, 0.2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-4, -12, 7, 9, -0.3, 0, Math.PI*2); ctx.fill();
    // ears
    ctx.beginPath(); ctx.ellipse(-8, -20, 2, 5, -0.3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-4, -22, 2, 5, 0, 0, Math.PI*2); ctx.fill();
    // tail
    ctx.beginPath(); ctx.moveTo(8, 14); ctx.quadraticCurveTo(20, 18, 18, 5);
    ctx.lineWidth = 5; ctx.strokeStyle = '#c8905a'; ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-2, -15, 1.5, 0, Math.PI*2); ctx.fill();
  }

  _drawParrot(ctx) {
    ctx.fillStyle = '#27ae60';
    ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath(); ctx.ellipse(0, -12, 7, 9, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.moveTo(-3, -8); ctx.lineTo(8, -6); ctx.lineTo(-3, -4);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(-2, -11, 2, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#3498db';
    ctx.beginPath(); ctx.ellipse(-12, 2, 6, 10, 0.5, 0, Math.PI*2); ctx.fill();
  }

  // ── OCEAN BACKGROUND ─────────────────────────────────────
  _drawOcean() {
    const ctx = this.ctx;
    const grad = ctx.createLinearGradient(0, 0, 0, this.H);
    grad.addColorStop(0,   '#4cc9f8');
    grad.addColorStop(0.5, '#5bc8f5');
    grad.addColorStop(1,   '#3aabdf');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.W, this.H);

    // Wave lines
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1.5;
    for (let y = 40; y < this.H; y += 30) {
      ctx.beginPath();
      for (let x = 0; x < this.W; x += 4) {
        const wave = Math.sin((x + this._waveOffset + y * 0.5) / 25) * 3;
        if (x === 0) ctx.moveTo(x, y + wave);
        else         ctx.lineTo(x, y + wave);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  _drawClouds() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    const clouds = [
      { x: 80,  y: 45,  r: 16 },
      { x: 260, y: 30,  r: 14 },
      { x: 560, y: 55,  r: 18 },
      { x: 820, y: 40,  r: 15 },
      { x: 1100,y: 35,  r: 16 },
      { x: 1250,y: 60,  r: 13 },
      { x: 350, y: 70,  r: 12 },
      { x: 680, y: 25,  r: 17 },
    ];
    clouds.forEach(c => {
      const ox = ((c.x + this._cloudOffset) % (this.W + 80)) - 40;
      ctx.beginPath();
      ctx.arc(ox,       c.y,     c.r,     0, Math.PI*2);
      ctx.arc(ox+c.r,   c.y-3,   c.r*0.8, 0, Math.PI*2);
      ctx.arc(ox+c.r*2, c.y,     c.r*0.9, 0, Math.PI*2);
      ctx.arc(ox+c.r*3, c.y+2,   c.r*0.7, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.restore();
  }

  _drawWhales() {
    const ctx = this.ctx;
    const positions = [
      { x: 180, y: 420 }, { x: 1200, y: 480 }, { x: 540, y: 590 }
    ];
    positions.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillStyle = '#2c3e50';
      ctx.beginPath();
      ctx.ellipse(0, 0, 30, 12, 0, 0, Math.PI*2);
      ctx.fill();
      // tail
      ctx.beginPath();
      ctx.moveTo(28, 0);
      ctx.lineTo(40, -10);
      ctx.lineTo(42, 0);
      ctx.lineTo(40, 10);
      ctx.closePath();
      ctx.fill();
      // eye
      ctx.fillStyle = 'white';
      ctx.beginPath(); ctx.arc(-12, -3, 3, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#111';
      ctx.beginPath(); ctx.arc(-12, -3, 1.5, 0, Math.PI*2); ctx.fill();
      // spout
      ctx.strokeStyle = 'rgba(100,200,255,0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-5, -12);
      ctx.quadraticCurveTo(0, -28, 5, -20);
      ctx.stroke();
      ctx.restore();
    });
  }

  // ── PLAYER PIECES ─────────────────────────────────────────
  drawPlayers(players) {
    this.players = players;
  }

  _drawPlayerPieces() {
    if (!this.players) return;
    // Group players by tile
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
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const spread = n > 1 ? 16 : 0;
        const px = tile.x + Math.cos(angle) * spread;
        const py = tile.y + Math.sin(angle) * spread;
        Avatars.drawPiece(this.ctx, px, py - 20, p.avatarType, p.color, 1.0);
      });
    }
  }

  // ── TITLE SCREEN DRAW ─────────────────────────────────────
  drawTitle(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    // Ocean
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#4cc9f8'); g.addColorStop(1,'#2980b9');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    // Draw simplified map in background
    ctx.globalAlpha = 0.35;
    this._drawNorthAmerica();
    this._drawSouthAmerica();
    this._drawEurope();
    this._drawAfrica();
    this._drawAsia();
    this._drawAustralia();
    ctx.globalAlpha = 1;
    ctx.setTransform(1,0,0,1,0,0);
  }

  // ── MAIN RENDER ───────────────────────────────────────────
  render(highlightTileId) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);

    this._drawOcean();
    this._drawContinents();
    this._drawClouds();
    this._drawWhales();

    // Landmarks
    this._landmarks.forEach(lm => {
      const p = this._ll(lm.lon, lm.lat);
      lm.draw(ctx, p.x, p.y);
    });

    // Decorative map animals
    this._animals.forEach(a => {
      const p = this._ll(a.lon, a.lat);
      this._drawCartoonAnimal(ctx, p.x, p.y, a.animal);
    });

    // Path
    this._drawPath();

    // Tiles
    this.tiles.forEach(t => {
      this._drawTile(t, t.id === highlightTileId);
    });

    // Player pieces
    this._drawPlayerPieces();
  }

  // ── ANIMATION LOOP ────────────────────────────────────────
  startAnimation(getState) {
    const loop = () => {
      this._waveOffset  += 0.8;
      this._cloudOffset += 0.15;
      const state = getState();
      this.players = state.players || [];
      this.render(state.highlightTileId);
      this.animFrame = requestAnimationFrame(loop);
    };
    loop();
  }

  stopAnimation() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }

  // ── ZOOM TO TILE REGION ───────────────────────────────────
  zoomToTile(tileId, mapContainer) {
    const tile = this.tiles[tileId - 1];
    if (!tile) return;
    const canvas = this.canvas;
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    const sx = cw / this.W;
    const sy = ch / this.H;
    const scale = 2.2;
    const tx = (cw / 2) - (tile.x * sx * scale);
    const ty = (ch / 2) - (tile.y * sy * scale);

    canvas.style.transformOrigin = '0 0';
    canvas.style.transform = `scale(${scale}) translate(${tx / scale}px, ${ty / scale}px)`;

    const label = document.getElementById('zoom-label');
    if (label) {
      label.textContent = tile.country;
      label.classList.add('visible');
    }
  }

  zoomOut() {
    const canvas = this.canvas;
    canvas.style.transformOrigin = 'center center';
    canvas.style.transform = 'scale(1) translate(0,0)';
    const label = document.getElementById('zoom-label');
    if (label) label.classList.remove('visible');
  }

  getTile(id) { return this.tiles[id - 1]; }
}
