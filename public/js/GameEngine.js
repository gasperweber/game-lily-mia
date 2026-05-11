// GameEngine.js — Core game logic with category tiles and answer-before-roll flow

class GameEngine {
  constructor(worldMap, memoryGame) {
    this.worldMap       = worldMap;
    this.memoryGame     = memoryGame;
    this.players        = [];
    this.currentIdx     = 0;
    this.usedIds        = new Set();
    this.state          = 'idle'; // idle | rolling | moving | unanswered | memory | win
    this.highlightTileId = null;
    this.diceValue      = 1;
    this.tileCategories = [];
    this._moveTimer     = null;
    this._currentQuestion = null;
    this._selectedOption  = null;
  }

  // ── SETUP ─────────────────────────────────────────────────────
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
    this.currentIdx      = 0;
    this.usedIds         = new Set();
    this.tileCategories  = generateTileCategories();
    this.worldMap.setTileCategories(this.tileCategories);
    this.state           = 'rolling';  // tile 1 = start, no question needed
    this.highlightTileId = 1;
    this._currentQuestion = null;
    this._selectedOption  = null;
    this._updateUI();
  }

  // ── CURRENT PLAYER ────────────────────────────────────────────
  get current() { return this.players[this.currentIdx]; }

  // ── ROLL ──────────────────────────────────────────────────────
  roll() {
    if (this.state !== 'rolling') return;
    this.state     = 'moving';
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    this._animateDice(this.diceValue);
    document.getElementById('btn-roll').disabled = true;
    document.getElementById('turn-message').textContent = `Rolled a ${this.diceValue}! Moving…`;
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
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.3)'; ctx.shadowBlur = 6;
    const r = 10, x0 = 4, y0 = 4, bw = W - 8, bh = H - 8;
    ctx.beginPath();
    ctx.moveTo(x0+r,y0); ctx.lineTo(x0+bw-r,y0);
    ctx.quadraticCurveTo(x0+bw,y0,x0+bw,y0+r);
    ctx.lineTo(x0+bw,y0+bh-r);
    ctx.quadraticCurveTo(x0+bw,y0+bh,x0+bw-r,y0+bh);
    ctx.lineTo(x0+r,y0+bh);
    ctx.quadraticCurveTo(x0,y0+bh,x0,y0+bh-r);
    ctx.lineTo(x0,y0+r);
    ctx.quadraticCurveTo(x0,y0,x0+r,y0);
    ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0; ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#2c1a0e';
    const dots = {1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],
      4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],
      6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]};
    const cx = W/2, cy = H/2, sp = 13, dotR = 4.5;
    (dots[val]||[]).forEach(([dx,dy]) => {
      ctx.beginPath(); ctx.arc(cx+dx*sp,cy+dy*sp,dotR,0,Math.PI*2); ctx.fill();
    });
  }

  // ── MOVE PLAYER ───────────────────────────────────────────────
  _movePlayer() {
    const player = this.current;
    const target = Math.min(player.tileId + this.diceValue, 60);
    let   cur    = player.tileId;

    const doStep = () => {
      if (cur >= target) {
        player.tileId        = target;
        this.highlightTileId = target;
        this._afterMove();
        return;
      }
      cur++;
      player.tileId        = cur;
      this.highlightTileId = cur;
      const msg = document.getElementById('turn-message');
      if (msg) msg.textContent = `Moving… tile ${cur}`;
      this._updateUI();
      this._moveTimer = setTimeout(doStep, 280);
    };
    doStep();
  }

  _afterMove() {
    const player = this.current;
    const tile   = this.worldMap.getTile(player.tileId);
    if (!tile) { this._nextTurn(); return; }

    const cat = tile.category;

    // Check win
    if (player.tileId >= 60) {
      this._triggerWin();
      return;
    }

    // Zoom briefly
    this.worldMap.zoomToTile(player.tileId, document.getElementById('map-container'));
    setTimeout(() => this.worldMap.zoomOut(), 2200);

    if (cat === 'squid') {
      this._handleSquid(player);
    } else if (cat === 'memory') {
      setTimeout(() => this._handleMemory(player), 700);
    } else if (cat === 'start' || cat === 'finish') {
      // No question for start/finish
      this.state = 'rolling';
      document.getElementById('btn-roll').disabled = false;
      document.getElementById('turn-message').textContent = "Lucky tile! Roll again!";
      this._updateUI();
    } else {
      // Regular category question — must answer BEFORE next roll
      setTimeout(() => this._askQuestion(player), 700);
    }
  }

  // ── SQUID TILE ────────────────────────────────────────────────
  _handleSquid(player) {
    const moveBack = Math.min(3, player.tileId - 1);
    document.getElementById('turn-message').textContent = `🦑 The squid sends you back ${moveBack} tiles!`;
    setTimeout(() => {
      player.tileId        = Math.max(1, player.tileId - 3);
      this.highlightTileId = player.tileId;
      this._updateUI();
      // Show squid overlay message then move on
      this._showSquidMessage(() => {
        this._nextTurn();
      });
    }, 500);
  }

  _showSquidMessage(callback) {
    // Reuse question dialog for squid message
    const overlay = document.getElementById('dialog-question');
    overlay.style.display = 'flex';
    document.getElementById('q-country-name').textContent = '🦑 Squid Attack!';
    const badge = document.getElementById('q-level-badge');
    badge.textContent = 'Special Tile';
    badge.className   = 'q-level-badge';
    badge.style.background = CATEGORY_META.squid.color;
    badge.style.color = '#fff';
    document.getElementById('q-text').textContent = 'Oh no! The giant squid drags you back 3 tiles!';
    document.getElementById('q-options').innerHTML = '';
    document.getElementById('q-feedback').style.display = 'none';
    document.getElementById('q-fact').style.display = 'none';

    const flagEl = document.getElementById('q-country-flag');
    flagEl.innerHTML = '🦑';
    flagEl.style.fontSize = '40px';

    const btn = document.getElementById('btn-next-turn');
    btn.style.display = 'block';
    btn.textContent   = 'Continue';
    btn.onclick = () => {
      overlay.style.display = 'none';
      btn.textContent = 'Next Turn';
      btn.onclick = null;
      badge.style.background = '';
      badge.style.color = '';
      flagEl.style.fontSize = '';
      flagEl.innerHTML = '';
      callback();
    };
  }

  // ── MEMORY TILE ───────────────────────────────────────────────
  _handleMemory(player) {
    document.getElementById('turn-message').textContent = '🃏 Memory challenge!';
    this.state = 'memory';
    this.memoryGame.start((moves) => {
      const bonus = Math.max(0, 12 - moves) * 10;
      player.score += 50 + bonus;
      this._updateUI();
      document.getElementById('dialog-memory').style.display = 'none';
      this._nextTurn();
    });
  }

  // ── ASK QUESTION ──────────────────────────────────────────────
  _askQuestion(player) {
    const tile = this.worldMap.getTile(player.tileId);
    if (!tile) { this._nextTurn(); return; }

    const cat = tile.category;
    const q   = getQuestionForTile(cat, player.level, this.usedIds);
    if (!q) { this._nextTurn(); return; }

    this.usedIds.add(q.id);
    this._currentQuestion = q;
    this._selectedOption  = null;
    this.state = 'unanswered';

    // Disable roll while answering
    document.getElementById('btn-roll').disabled = true;
    this._showQuestion(q, player);
  }

  _showQuestion(q, player) {
    const overlay = document.getElementById('dialog-question');
    overlay.style.display = 'flex';

    // Player avatar in flag area
    const flagEl = document.getElementById('q-country-flag');
    flagEl.innerHTML = '';
    flagEl.style.fontSize = '';
    const fc = document.createElement('canvas');
    fc.width = 60; fc.height = 72;
    Avatars.renderPreview(fc, player.avatarType, player.color);
    flagEl.appendChild(fc);

    // Category label
    const cat  = q.cat;
    const meta = CATEGORY_META[cat] || CATEGORY_META.geography;
    document.getElementById('q-country-name').textContent = meta.label;

    const badge = document.getElementById('q-level-badge');
    badge.textContent  = ['','Easy','Medium','Hard'][q.level] + ' (' + player.name + ')';
    badge.className    = 'q-level-badge ' + ['','level-easy','level-medium','level-hard'][q.level];
    badge.style.background = '';
    badge.style.color  = '';

    document.getElementById('q-text').textContent = q.q;
    document.getElementById('q-feedback').style.display = 'none';
    document.getElementById('q-fact').style.display     = 'none';
    document.getElementById('btn-next-turn').style.display = 'none';
    document.getElementById('btn-next-turn').textContent   = 'Next Turn';
    document.getElementById('btn-next-turn').onclick = null;

    const confirmBtn = document.getElementById('btn-confirm-answer');
    if (confirmBtn) { confirmBtn.style.display = 'none'; }

    // Shuffle options keeping track of original index
    const opts = q.opts.map((text, i) => ({ text, origIdx: i }));
    shuffleArray(opts);

    const optionsEl = document.getElementById('q-options');
    optionsEl.innerHTML = '';
    opts.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className   = 'q-option';
      btn.textContent = opt.text;
      btn.dataset.origIdx = opt.origIdx;
      optionsEl.appendChild(btn);
    });
  }

  // ── SELECT OPTION (highlight, show confirm) ───────────────────
  selectOption(origIdx, clickedBtn, optionsEl) {
    if (this.state !== 'unanswered') return;
    // If same option clicked again, deselect
    if (this._selectedOption === origIdx) {
      this._selectedOption = null;
      clickedBtn.classList.remove('selected');
      const confirmBtn = document.getElementById('btn-confirm-answer');
      if (confirmBtn) confirmBtn.style.display = 'none';
      return;
    }
    this._selectedOption = origIdx;
    // Highlight selected
    if (!optionsEl) {
      optionsEl = document.getElementById('q-options');
    }
    optionsEl.querySelectorAll('.q-option').forEach(b => b.classList.remove('selected'));
    clickedBtn.classList.add('selected');

    // Show confirm button
    const confirmBtn = document.getElementById('btn-confirm-answer');
    if (confirmBtn) {
      confirmBtn.style.display = 'block';
      confirmBtn.disabled      = false;
    }
  }

  // ── CONFIRM ANSWER ────────────────────────────────────────────
  confirmAnswer() {
    if (this.state !== 'unanswered') return;
    if (this._selectedOption === null) return;

    const q      = this._currentQuestion;
    const player = this.current;
    const chosen = this._selectedOption;
    const correct = chosen === q.a;

    const optionsEl  = document.getElementById('q-options');
    const feedback   = document.getElementById('q-feedback');
    const factEl     = document.getElementById('q-fact');
    const confirmBtn = document.getElementById('btn-confirm-answer');

    // Disable options and confirm
    optionsEl.querySelectorAll('.q-option').forEach(b => b.disabled = true);
    if (confirmBtn) confirmBtn.style.display = 'none';

    // Mark correct/wrong
    optionsEl.querySelectorAll('.q-option').forEach(b => {
      if (+b.dataset.origIdx === q.a) b.classList.add('correct');
    });
    if (!correct) {
      optionsEl.querySelectorAll('.q-option.selected').forEach(b => b.classList.add('wrong'));
    }

    if (correct) {
      const pts = [0, 100, 200, 350][player.level];
      player.score += pts;
      feedback.textContent = `✅ Correct! +${pts} points!`;
      feedback.className   = 'q-feedback correct';
      feedback.style.display = 'block';
      if (q.fact) {
        factEl.textContent  = '💡 Did you know? ' + q.fact;
        factEl.style.display = 'block';
      }
      const nextBtn = document.getElementById('btn-next-turn');
      nextBtn.style.display = 'block';
      nextBtn.textContent   = 'Next Turn →';
      this._updateUI();
      // State becomes rolling after player clicks Next Turn (via closeQuestion)
    } else {
      // Wrong answer — show feedback briefly, then re-show same question
      feedback.textContent  = '❌ Not quite! Try again!';
      feedback.className    = 'q-feedback wrong';
      feedback.style.display = 'block';

      setTimeout(() => {
        // Re-show same question (options reshuffled)
        this._selectedOption = null;
        this._showQuestion(q, player);
      }, 1800);
    }
  }

  // ── CLOSE QUESTION ────────────────────────────────────────────
  closeQuestion() {
    document.getElementById('dialog-question').style.display = 'none';
    this._nextTurn();
  }

  // ── NEXT TURN ─────────────────────────────────────────────────
  _nextTurn() {
    this.currentIdx      = (this.currentIdx + 1) % this.players.length;
    this.state           = 'rolling';
    this._currentQuestion = null;
    this._selectedOption  = null;
    const roll = document.getElementById('btn-roll');
    if (roll) roll.disabled = false;
    const confirmBtn = document.getElementById('btn-confirm-answer');
    if (confirmBtn) confirmBtn.style.display = 'none';
    document.getElementById('turn-message').textContent = "It's your turn — roll the dice!";
    this._updateUI();
  }

  // ── WIN ────────────────────────────────────────────────────────
  _triggerWin() {
    this.state = 'win';
    const winner = this.current;
    document.getElementById('win-player-name').textContent = winner.name;
    const wc = document.getElementById('win-avatar-canvas');
    Avatars.renderWin(wc, winner.avatarType, winner.color);
    document.querySelectorAll('.screen').forEach(s => { s.style.display='none'; s.classList.remove('active'); });
    const ws = document.getElementById('screen-win');
    ws.style.display = 'flex';
    requestAnimationFrame(() => { ws.style.opacity='1'; });
    this.worldMap.stopAnimation();
  }

  // ── UI UPDATE ──────────────────────────────────────────────────
  _updateUI() {
    const list = document.getElementById('player-list');
    if (!list) return;
    list.innerHTML = '';
    this.players.forEach((p, i) => {
      const row  = document.createElement('div');
      row.className = 'player-row' + (i === this.currentIdx ? ' active-player' : '');

      const ac = document.createElement('canvas');
      ac.width = 40; ac.height = 50; ac.className = 'player-row-avatar';
      Avatars.drawPiece(ac.getContext('2d'), 20, 8, p.avatarType, p.color, 0.68);

      const tile = this.worldMap.getTile(p.tileId);
      const cat  = tile ? tile.category : '';
      const meta = CATEGORY_META[cat];
      const catLabel = meta ? meta.label : '';

      const info = document.createElement('div');
      info.className = 'player-row-info';
      info.innerHTML = `<div class="player-row-name">${p.name}</div>
        <div class="player-row-pos">Tile ${p.tileId}${catLabel ? ' · '+catLabel : ''}</div>`;

      const score = document.createElement('div');
      score.className = 'player-row-score';
      score.textContent = p.score;

      row.appendChild(ac); row.appendChild(info); row.appendChild(score);
      list.appendChild(row);
    });

    const nameEl = document.getElementById('current-player-name');
    if (nameEl) nameEl.textContent = this.current.name + "'s Turn";

    // Pass players to map
    this.worldMap.drawPlayers(this.players.map(p => ({
      tileId: p.tileId, avatarType: p.avatarType, color: p.color,
    })));
  }

  // ── MAP STATE ──────────────────────────────────────────────────
  getMapState() {
    return {
      players: this.players.map(p => ({
        tileId: p.tileId, avatarType: p.avatarType, color: p.color,
      })),
      highlightTileId: this.highlightTileId,
      tileCategories:  this.tileCategories,
    };
  }
}
