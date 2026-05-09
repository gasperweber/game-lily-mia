// main.js — Screen controller and setup UI

// Polyfill Canvas roundRect for Safari/older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (r > w/2) r = w/2;
    if (r > h/2) r = h/2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.lineTo(x+w-r, y);
    this.quadraticCurveTo(x+w, y, x+w, y+r);
    this.lineTo(x+w, y+h-r);
    this.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    this.lineTo(x+r, y+h);
    this.quadraticCurveTo(x, y+h, x, y+h-r);
    this.lineTo(x, y+r);
    this.quadraticCurveTo(x, y, x+r, y);
    this.closePath();
    return this;
  };
}

let worldMap   = null;
let memoryGame = null;
let engine     = null;

const PLAYER_COLORS = Avatars.COLORS;
const PLAYER_COLOR_NAMES = Avatars.COLOR_NAMES;
const AVATAR_TYPES = Avatars.TYPES;

let playerCount = 2;
const playerSetups = [];

// ── SCREEN MANAGEMENT ────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.style.display = 'none';
    s.style.opacity = '0';
    s.classList.remove('active');
  });
  const screen = document.getElementById(id);
  screen.style.display = 'flex';
  requestAnimationFrame(() => {
    screen.style.opacity = '1';
    screen.classList.add('active');
  });
}

// ── TITLE SCREEN ─────────────────────────────────────────────
function initTitleScreen() {
  // Draw a preview map on the title canvas
  const titleCanvas = document.getElementById('title-canvas');
  if (worldMap) {
    worldMap.render(null);
    // Copy rendered map to title canvas
    const ctx = titleCanvas.getContext('2d');
    ctx.drawImage(worldMap.canvas, 0, 0, titleCanvas.width, titleCanvas.height);
  }

  document.getElementById('btn-start').addEventListener('click', () => {
    showScreen('screen-setup');
    buildSetupCards();
  });

  document.getElementById('btn-howtoplay').addEventListener('click', () => {
    showScreen('screen-howtoplay');
    drawHowToIcons();
  });

  document.getElementById('btn-back-title').addEventListener('click', () => {
    showScreen('screen-title');
  });
}

// ── HOW TO PLAY ICONS ────────────────────────────────────────
function drawHowToIcons() {
  const icons = document.querySelectorAll('.step-icon');
  const specs = [
    { type: 'dice', color: '#ff6b35' },
    { type: 'question', color: '#3498db' },
    { type: 'memory', color: '#27ae60' },
    { type: 'trophy', color: '#f1c40f' },
  ];
  icons.forEach((el, i) => {
    el.innerHTML = '';
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    drawStepIcon(c.getContext('2d'), 32, 32, specs[i].type, specs[i].color);
    el.appendChild(c);
  });
}

function drawStepIcon(ctx, cx, cy, type, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 1;

  if (type === 'dice') {
    const r = 8;
    const x = cx - 20, y = cy - 20, s = 40;
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+s-r,y);
    ctx.quadraticCurveTo(x+s,y,x+s,y+r);
    ctx.lineTo(x+s,y+s-r);
    ctx.quadraticCurveTo(x+s,y+s,x+s-r,y+s);
    ctx.lineTo(x+r,y+s);
    ctx.quadraticCurveTo(x,y+s,x,y+s-r);
    ctx.lineTo(x,y+r);
    ctx.quadraticCurveTo(x,y,x+r,y);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'white';
    [[cx-8,cy-8],[cx+8,cy+8],[cx,cy]].forEach(([dx,dy]) => {
      ctx.beginPath(); ctx.arc(dx,dy,4,0,Math.PI*2); ctx.fill();
    });
  } else if (type === 'question') {
    ctx.beginPath(); ctx.arc(cx, cy, 24, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.font = 'bold 28px Nunito, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('?', cx, cy);
  } else if (type === 'memory') {
    // 4 mini cards
    const positions = [[-12,-12],[4,-12],[-12,4],[4,4]];
    const colors2 = ['#e74c3c','#3498db','#27ae60','#e74c3c'];
    positions.forEach(([dx,dy],i) => {
      ctx.fillStyle = i < 2 ? color : '#fff';
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      const rx = cx+dx, ry = cy+dy;
      ctx.roundRect(rx,ry,14,14,3);
      ctx.fill(); ctx.stroke();
      if (i >= 2) {
        ctx.fillStyle = colors2[i];
        ctx.beginPath(); ctx.arc(rx+7,ry+7,5,0,Math.PI*2); ctx.fill();
      }
    });
  } else if (type === 'trophy') {
    ctx.beginPath();
    ctx.moveTo(cx-18, cy-20);
    ctx.lineTo(cx+18, cy-20);
    ctx.quadraticCurveTo(cx+18, cy+8, cx, cy+14);
    ctx.quadraticCurveTo(cx-18, cy+8, cx-18, cy-20);
    ctx.fill(); ctx.stroke();
    // handles
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath(); ctx.arc(cx-18, cy-12, 5, Math.PI/2, -Math.PI/2, true); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+18, cy-12, 5, Math.PI/2, -Math.PI/2, false); ctx.fill();
    // stem
    ctx.fillStyle = color;
    ctx.fillRect(cx-4, cy+14, 8, 10);
    ctx.fillRect(cx-12, cy+22, 24, 5);
    // star
    ctx.fillStyle = '#fff';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', cx, cy-4);
  }
}

// ── SETUP SCREEN ─────────────────────────────────────────────
function buildSetupCards() {
  // Player count buttons
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playerCount = +btn.dataset.count;
      renderPlayerCards();
    });
  });
  renderPlayerCards();
}

const DEFAULT_NAMES = ['Lily','Mia','Alex','Sam'];

function renderPlayerCards() {
  const container = document.getElementById('player-cards');
  container.innerHTML = '';

  for (let i = 0; i < playerCount; i++) {
    if (!playerSetups[i]) {
      playerSetups[i] = {
        name:       DEFAULT_NAMES[i] || `Player ${i+1}`,
        avatarType: AVATAR_TYPES[i % 3],
        color:      PLAYER_COLORS[i % PLAYER_COLORS.length],
        level:      1,
      };
    }
    const cfg = playerSetups[i];
    const card = document.createElement('div');
    card.className = 'player-card';

    const header = document.createElement('div');
    header.className = 'player-card-header';
    header.textContent = `Player ${i+1}`;

    // Name input
    const nameInput = document.createElement('input');
    nameInput.type  = 'text';
    nameInput.value = cfg.name;
    nameInput.maxLength = 16;
    nameInput.addEventListener('input', () => { cfg.name = nameInput.value; });

    // Avatar selector
    const avLabel = document.createElement('div');
    avLabel.className = 'label-small';
    avLabel.textContent = 'Choose Piece';

    const avSel = document.createElement('div');
    avSel.className = 'avatar-selector';

    AVATAR_TYPES.forEach(type => {
      const opt = document.createElement('div');
      opt.className = 'avatar-opt' + (cfg.avatarType === type ? ' selected' : '');
      const c = document.createElement('canvas');
      c.width = 44; c.height = 56;
      Avatars.renderPreview(c, type, cfg.color);
      const lbl = document.createElement('span');
      lbl.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      opt.appendChild(c);
      opt.appendChild(lbl);
      opt.addEventListener('click', () => {
        cfg.avatarType = type;
        avSel.querySelectorAll('.avatar-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        // Refresh all previews with new color
        refreshAvatarPreviews(avSel, cfg);
      });
      avSel.appendChild(opt);
    });

    // Color selector
    const colLabel = document.createElement('div');
    colLabel.className = 'label-small';
    colLabel.textContent = 'Choose Colour';

    const colSel = document.createElement('div');
    colSel.className = 'color-selector';

    PLAYER_COLORS.forEach((col, ci) => {
      const opt = document.createElement('div');
      opt.className = 'color-opt' + (cfg.color === col ? ' selected' : '');
      opt.style.background = col;
      opt.title = PLAYER_COLOR_NAMES[ci];
      opt.addEventListener('click', () => {
        cfg.color = col;
        colSel.querySelectorAll('.color-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        refreshAvatarPreviews(avSel, cfg);
      });
      colSel.appendChild(opt);
    });

    // Difficulty selector
    const diffLabel = document.createElement('div');
    diffLabel.className = 'label-small';
    diffLabel.textContent = 'Difficulty';

    const diffSel = document.createElement('div');
    diffSel.className = 'difficulty-selector';

    [['Easy',1,'diff-easy'],['Medium',2,'diff-medium'],['Hard',3,'diff-hard']].forEach(([name, val, cls]) => {
      const btn = document.createElement('button');
      btn.className = `diff-btn ${cls}` + (cfg.level === val ? ' active' : '');
      btn.textContent = name;
      btn.addEventListener('click', () => {
        cfg.level = val;
        diffSel.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      diffSel.appendChild(btn);
    });

    card.appendChild(header);
    card.appendChild(nameInput);
    card.appendChild(avLabel);
    card.appendChild(avSel);
    card.appendChild(colLabel);
    card.appendChild(colSel);
    card.appendChild(diffLabel);
    card.appendChild(diffSel);
    container.appendChild(card);
  }
}

function refreshAvatarPreviews(avSel, cfg) {
  avSel.querySelectorAll('.avatar-opt').forEach((opt, idx) => {
    const c = opt.querySelector('canvas');
    Avatars.renderPreview(c, AVATAR_TYPES[idx], cfg.color);
  });
}

// ── START GAME ───────────────────────────────────────────────
function startGame() {
  const configs = playerSetups.slice(0, playerCount).map(cfg => ({
    name:       cfg.name || 'Player',
    avatarType: cfg.avatarType,
    color:      cfg.color,
    level:      cfg.level,
  }));

  showScreen('screen-game');

  // Small delay for screen to mount
  setTimeout(() => {
    engine.setup(configs);
    worldMap.startAnimation(() => engine.getMapState());
    document.getElementById('btn-roll').disabled = false;
    document.getElementById('turn-message').textContent = "It's your turn — roll the dice!";
    document.getElementById('tile-info').style.display = 'none';
  }, 200);
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Init the hidden game canvas first so map is ready
  worldMap   = new WorldMap('map-canvas');
  memoryGame = new MemoryGame();
  engine     = new GameEngine(worldMap, memoryGame);

  // Draw initial dice face
  if (engine) engine._drawDice(1);

  // Draw title background using world map
  const titleCanvas = document.getElementById('title-canvas');
  worldMap.render(null);
  const tctx = titleCanvas.getContext('2d');
  tctx.drawImage(worldMap.canvas, 0, 0, titleCanvas.width, titleCanvas.height);

  initTitleScreen();

  // Show title
  showScreen('screen-title');

  // ── BUTTON WIRING ────
  document.getElementById('btn-setup-back').addEventListener('click', () => showScreen('screen-title'));

  document.getElementById('btn-play').addEventListener('click', () => {
    // Validate names
    for (let i = 0; i < playerCount; i++) {
      if (!playerSetups[i]) { alert('Please set up all players.'); return; }
      if (!playerSetups[i].name.trim()) playerSetups[i].name = `Player ${i+1}`;
    }
    startGame();
  });

  document.getElementById('btn-roll').addEventListener('click', () => {
    engine.roll();
  });

  document.getElementById('btn-next-turn').addEventListener('click', () => {
    engine.closeQuestion();
  });

  document.getElementById('btn-memory-close').addEventListener('click', () => {
    memoryGame.close();
  });

  document.getElementById('btn-main-menu').addEventListener('click', () => {
    if (!confirm('Return to main menu? Current game will be lost.')) return;
    worldMap.stopAnimation();
    worldMap.zoomOut();
    showScreen('screen-title');
    // Re-draw title
    worldMap.render(null);
    const tctx = document.getElementById('title-canvas').getContext('2d');
    tctx.drawImage(worldMap.canvas, 0, 0, 1400, 700);
  });

  document.getElementById('btn-play-again').addEventListener('click', () => {
    worldMap.zoomOut();
    showScreen('screen-setup');
    buildSetupCards();
  });
});
