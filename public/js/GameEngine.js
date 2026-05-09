// GameEngine.js — Core game logic

class GameEngine {
  constructor(worldMap, memoryGame) {
    this.worldMap    = worldMap;
    this.memoryGame  = memoryGame;
    this.players     = [];
    this.currentIdx  = 0;
    this.usedIds     = new Set();
    this.state       = 'idle'; // idle | rolling | moving | question | memory | win
    this.highlightTileId = null;
    this.diceValue   = 1;
    this._moveTimer  = null;
  }

  // ── SETUP ─────────────────────────────────────────────────
  setup(playerConfigs) {
    this.players = playerConfigs.map((cfg, i) => ({
      id:         i,
      name:       cfg.name,
      avatarType: cfg.avatarType,
      color:      cfg.color,
      level:      cfg.level,
      tileId:     1,
      score:      0,
    }));
    this.currentIdx     = 0;
    this.usedIds        = new Set();
    this.state          = 'rolling';
    this.highlightTileId = 1;
    this._updateUI();
  }

  // ── CURRENT PLAYER ────────────────────────────────────────
  get current() { return this.players[this.currentIdx]; }

  // ── ROLL DICE ─────────────────────────────────────────────
  roll() {
    if (this.state !== 'rolling') return;
    this.state = 'moving';
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    this._animateDice(this.diceValue);

    // Disable roll button
    document.getElementById('btn-roll').disabled = true;
    document.getElementById('turn-message').textContent = `Rolled a ${this.diceValue}! Moving...`;

    // Short pause then move
    setTimeout(() => this._movePlayer(), 600);
  }

  _animateDice(val) {
    const area = document.getElementById('dice-area');
    area.classList.add('dice-rolling');
    setTimeout(() => area.classList.remove('dice-rolling'), 600);
    this._drawDice(val);
  }

  _drawDice(val) {
    const canvas = document.getElementById('dice-canvas');
    const ctx    = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Dice body
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur  = 6;
    const r = 10;
    const x0=4, y0=4, bw=W-8, bh=H-8;
    ctx.beginPath();
    ctx.moveTo(x0+r,y0);
    ctx.lineTo(x0+bw-r,y0);
    ctx.quadraticCurveTo(x0+bw,y0,x0+bw,y0+r);
    ctx.lineTo(x0+bw,y0+bh-r);
    ctx.quadraticCurveTo(x0+bw,y0+bh,x0+bw-r,y0+bh);
    ctx.lineTo(x0+r,y0+bh);
    ctx.quadraticCurveTo(x0,y0+bh,x0,y0+bh-r);
    ctx.lineTo(x0,y0+r);
    ctx.quadraticCurveTo(x0,y0,x0+r,y0);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Dots
    ctx.fillStyle = '#2c1a0e';
    const dots = {
      1: [[0,0]],
      2: [[-1,-1],[1,1]],
      3: [[-1,-1],[0,0],[1,1]],
      4: [[-1,-1],[1,-1],[-1,1],[1,1]],
      5: [[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],
      6: [[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]],
    };
    const cx=W/2, cy=H/2, sp=13, dotR=4.5;
    (dots[val]||[]).forEach(([dx,dy]) => {
      ctx.beginPath();
      ctx.arc(cx + dx*sp, cy + dy*sp, dotR, 0, Math.PI*2);
      ctx.fill();
    });
  }

  // ── MOVE PLAYER ───────────────────────────────────────────
  _movePlayer() {
    const player   = this.current;
    const target   = Math.min(player.tileId + this.diceValue, 60);
    const steps    = target - player.tileId;
    let   current  = player.tileId;

    const doStep = () => {
      if (current >= target) {
        player.tileId = target;
        this.highlightTileId = target;
        this._afterMove();
        return;
      }
      current++;
      player.tileId = current;
      this.highlightTileId = current;

      const tile = this.worldMap.getTile(current);
      const msg  = document.getElementById('turn-message');
      if (msg) msg.textContent = `Moving to tile ${current}...`;

      this._moveTimer = setTimeout(doStep, 280);
    };
    doStep();
  }

  _afterMove() {
    const player = this.current;
    const tile   = this.worldMap.getTile(player.tileId);

    // Update tile info
    document.getElementById('tile-info').style.display = 'block';
    document.getElementById('tile-country').textContent   = tile.country;
    document.getElementById('tile-continent').textContent = tile.continent;

    // Check win
    if (player.tileId >= 60) {
      this._triggerWin();
      return;
    }

    // Zoom to region
    this.worldMap.zoomToTile(player.tileId, document.getElementById('map-container'));
    setTimeout(() => this.worldMap.zoomOut(), 2500);

    if (tile.type === 'special') {
      // Memory game tile
      document.getElementById('turn-message').textContent = 'Special tile! Animal memory challenge!';
      setTimeout(() => {
        this.state = 'memory';
        this.memoryGame.start((moves) => {
          // Bonus points for memory game
          const bonus = Math.max(0, 12 - moves) * 10;
          player.score += 50 + bonus;
          this._updateUI();
          document.getElementById('dialog-memory').style.display = 'none';
          this._nextTurn();
        });
      }, 800);
    } else {
      // Regular question
      setTimeout(() => this._askQuestion(), 600);
    }
  }

  // ── QUESTION ──────────────────────────────────────────────
  _askQuestion() {
    const player  = this.current;
    const tile    = this.worldMap.getTile(player.tileId);
    this.state    = 'question';

    const pool = getQuestionsForTile(tile.country, tile.continent, player.level, this.usedIds);
    if (pool.length === 0) {
      // No questions — skip turn
      this._nextTurn();
      return;
    }

    const q = pool[0];
    this.usedIds.add(q.id);
    this._showQuestion(q, player);
  }

  _showQuestion(q, player) {
    const overlay = document.getElementById('dialog-question');
    overlay.style.display = 'flex';

    // Country flag canvas
    const flagCanvas = document.getElementById('q-country-flag');
    flagCanvas.innerHTML = '';
    const fc = document.createElement('canvas');
    fc.width = 72; fc.height = 72;
    Avatars.renderPreview(fc, player.avatarType, player.color);
    flagCanvas.appendChild(fc);

    document.getElementById('q-country-name').textContent = q.country;

    const badge = document.getElementById('q-level-badge');
    badge.textContent = ['','Easy','Medium','Hard'][q.level];
    badge.className   = 'q-level-badge ' + ['','level-easy','level-medium','level-hard'][q.level];

    document.getElementById('q-text').textContent = q.question;
    document.getElementById('q-feedback').style.display = 'none';
    document.getElementById('q-fact').style.display     = 'none';
    document.getElementById('btn-next-turn').style.display = 'none';

    const optionsEl = document.getElementById('q-options');
    optionsEl.innerHTML = '';
    const shuffledOptions = [...q.options.map((text, i) => ({ text, i }))];
    shuffleArray(shuffledOptions);

    shuffledOptions.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'q-option';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => this._answerQuestion(opt.i, q, player, optionsEl, btn));
      optionsEl.appendChild(btn);
    });
  }

  _answerQuestion(chosen, q, player, optionsEl, clickedBtn) {
    // Disable all options
    optionsEl.querySelectorAll('.q-option').forEach(b => b.disabled = true);

    const correct  = chosen === q.answer;
    const feedback = document.getElementById('q-feedback');
    const fact     = document.getElementById('q-fact');

    // Mark correct answer green, wrong answer red
    const correctText = q.options[q.answer];
    optionsEl.querySelectorAll('.q-option').forEach(b => {
      if (b.textContent === correctText) b.classList.add('correct');
    });
    if (!correct) clickedBtn.classList.add('wrong');

    // Score
    if (correct) {
      const points = [0, 100, 200, 350][player.level];
      player.score += points;
      feedback.textContent = `Correct! +${points} points!`;
      feedback.className   = 'q-feedback correct';
    } else {
      player.tileId = Math.max(1, player.tileId - 2); // move back 2 on wrong
      feedback.textContent = 'Not quite! Move back 2 spaces.';
      feedback.className   = 'q-feedback wrong';
    }

    feedback.style.display = 'block';
    if (q.fact) {
      fact.textContent     = 'Did you know? ' + q.fact;
      fact.style.display   = 'block';
    }
    document.getElementById('btn-next-turn').style.display = 'block';
    this._updateUI();
  }

  closeQuestion() {
    document.getElementById('dialog-question').style.display = 'none';
    this._nextTurn();
  }

  // ── NEXT TURN ─────────────────────────────────────────────
  _nextTurn() {
    this.currentIdx = (this.currentIdx + 1) % this.players.length;
    this.state      = 'rolling';
    document.getElementById('btn-roll').disabled = false;
    document.getElementById('turn-message').textContent = "It's your turn — roll the dice!";
    this._updateUI();
  }

  // ── WIN ───────────────────────────────────────────────────
  _triggerWin() {
    this.state = 'win';
    const winner = this.current;
    document.getElementById('win-player-name').textContent = winner.name;

    const wc = document.getElementById('win-avatar-canvas');
    Avatars.renderWin(wc, winner.avatarType, winner.color);

    // Show win screen
    document.querySelectorAll('.screen').forEach(s => { s.style.display='none'; s.classList.remove('active'); });
    const winScreen = document.getElementById('screen-win');
    winScreen.style.display = 'flex';
    setTimeout(() => winScreen.style.opacity = '1', 10);
    this.worldMap.stopAnimation();
  }

  // ── UI UPDATE ─────────────────────────────────────────────
  _updateUI() {
    // Player list in side panel
    const list = document.getElementById('player-list');
    list.innerHTML = '';
    this.players.forEach((p, i) => {
      const row  = document.createElement('div');
      row.className = 'player-row' + (i === this.currentIdx ? ' active-player' : '');

      const ac = document.createElement('canvas');
      ac.width = 40; ac.height = 50;
      ac.className = 'player-row-avatar';
      Avatars.drawPiece(ac.getContext('2d'), 20, 8, p.avatarType, p.color, 0.68);

      const info = document.createElement('div');
      info.className = 'player-row-info';
      const tile = this.worldMap.getTile(p.tileId);
      info.innerHTML = `<div class="player-row-name">${p.name}</div>
        <div class="player-row-pos">Tile ${p.tileId} — ${tile ? tile.country : ''}</div>`;

      const score = document.createElement('div');
      score.className = 'player-row-score';
      score.textContent = p.score;

      row.appendChild(ac);
      row.appendChild(info);
      row.appendChild(score);
      list.appendChild(row);
    });

    // Current player name
    document.getElementById('current-player-name').textContent = this.current.name + "'s Turn";

    // Pass players to world map for rendering
    this.worldMap.drawPlayers(this.players.map(p => ({
      tileId: p.tileId,
      avatarType: p.avatarType,
      color: p.color,
    })));
  }

  getMapState() {
    return {
      players: this.players.map(p => ({
        tileId:     p.tileId,
        avatarType: p.avatarType,
        color:      p.color,
      })),
      highlightTileId: this.highlightTileId,
    };
  }
}
