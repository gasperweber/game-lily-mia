// Avatars.js — Chess piece avatars drawn with Canvas 2D

const Avatars = {
  TYPES: ['king', 'queen', 'rook'],
  COLORS: ['#e74c3c','#3498db','#27ae60','#9b59b6','#f39c12','#1abc9c'],
  COLOR_NAMES: ['Red','Blue','Green','Purple','Orange','Teal'],

  // Draw a piece at (cx, cy) top centre, scale factor
  drawPiece(ctx, cx, cy, type, color, scale=1) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    switch(type) {
      case 'king':  this._drawKing(ctx, color); break;
      case 'queen': this._drawQueen(ctx, color); break;
      case 'rook':  this._drawRook(ctx, color); break;
      default:      this._drawRook(ctx, color);
    }
    ctx.restore();
  },

  // --- KING ---
  _drawKing(ctx, color) {
    const dark = this._darken(color);
    const light = this._lighten(color);

    // Shadow under piece
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 36, 9, 3, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();

    // Base
    this._drawBase(ctx, color, dark);

    // Body
    ctx.fillStyle = color;
    this._roundRect(ctx, -7, 14, 14, 14, 3);
    ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 1; ctx.stroke();

    // Neck
    ctx.fillStyle = light;
    this._roundRect(ctx, -4, 7, 8, 10, 2);
    ctx.fill();

    // Head
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(0, 4, 8, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 1; ctx.stroke();

    // Crown cross
    ctx.fillStyle = '#ffd700';
    ctx.strokeStyle = '#c8a000'; ctx.lineWidth = 1;
    ctx.fillRect(-1.5, -7, 3, 10);
    ctx.fillRect(-5, -5, 10, 3);
    ctx.strokeRect(-1.5, -7, 3, 10);
    ctx.strokeRect(-5, -5, 10, 3);

    // Jewel
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath(); ctx.arc(0, -5, 2, 0, Math.PI*2); ctx.fill();

    // Face dots
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath(); ctx.arc(-3, 4, 1.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(3, 4, 1.5, 0, Math.PI*2); ctx.fill();
  },

  // --- QUEEN ---
  _drawQueen(ctx, color) {
    const dark = this._darken(color);
    const light = this._lighten(color);

    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 36, 9, 3, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();

    this._drawBase(ctx, color, dark);

    ctx.fillStyle = color;
    this._roundRect(ctx, -7, 14, 14, 14, 3);
    ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 1; ctx.stroke();

    ctx.fillStyle = light;
    this._roundRect(ctx, -4, 7, 8, 10, 2);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(0, 4, 8, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 1; ctx.stroke();

    // Crown with points
    ctx.fillStyle = '#ffd700';
    ctx.strokeStyle = '#c8a000'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.lineTo(-6, -5);
    ctx.lineTo(-3, -10);
    ctx.lineTo(0, -5);
    ctx.lineTo(3, -10);
    ctx.lineTo(6, -5);
    ctx.lineTo(6, 0);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // Crown gems
    const gemColors = ['#e74c3c','#3498db','#27ae60'];
    [[-3,-10],[0,-5],[3,-10]].forEach(([gx,gy], i) => {
      ctx.fillStyle = gemColors[i];
      ctx.beginPath(); ctx.arc(gx, gy, 1.8, 0, Math.PI*2); ctx.fill();
    });

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath(); ctx.arc(-3, 4, 1.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(3, 4, 1.5, 0, Math.PI*2); ctx.fill();

    // Smile
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 6, 3, 0, Math.PI);
    ctx.stroke();
  },

  // --- ROOK ---
  _drawRook(ctx, color) {
    const dark = this._darken(color);
    const light = this._lighten(color);

    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 36, 9, 3, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();

    this._drawBase(ctx, color, dark);

    // Tower body
    ctx.fillStyle = color;
    this._roundRect(ctx, -7, 8, 14, 22, 3);
    ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 1; ctx.stroke();

    // Battlements (merlons)
    ctx.fillStyle = light;
    [-5, -1, 3].forEach(bx => {
      ctx.fillRect(bx, -2, 3, 10);
    });
    ctx.strokeStyle = dark; ctx.lineWidth = 0.8;
    [-5, -1, 3].forEach(bx => {
      ctx.strokeRect(bx, -2, 3, 10);
    });

    // Window
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    this._roundRect(ctx, -2.5, 14, 5, 8, 1);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,180,0.6)';
    ctx.beginPath(); ctx.arc(0, 16, 1.5, 0, Math.PI*2); ctx.fill();

    // Shading stripe
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    this._roundRect(ctx, -5, 10, 4, 18, 2);
    ctx.fill();
  },

  // --- SHARED PARTS ---
  _drawBase(ctx, color, dark) {
    // Bottom base
    ctx.fillStyle = dark;
    this._roundRect(ctx, -10, 28, 20, 8, 4);
    ctx.fill();

    ctx.fillStyle = color;
    this._roundRect(ctx, -8, 24, 16, 6, 3);
    ctx.fill();
    ctx.strokeStyle = dark; ctx.lineWidth = 1; ctx.stroke();
  },

  _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  },

  _darken(hex) {
    return this._adjustColor(hex, -50);
  },

  _lighten(hex) {
    return this._adjustColor(hex, 60);
  },

  _adjustColor(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, Math.min(255, (n >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amount));
    const b = Math.max(0, Math.min(255, (n & 0xff) + amount));
    return `rgb(${r},${g},${b})`;
  },

  // Render preview onto a small canvas in the setup screen
  renderPreview(canvasEl, type, color) {
    const ctx = canvasEl.getContext('2d');
    const w = canvasEl.width, h = canvasEl.height;
    ctx.clearRect(0, 0, w, h);
    this.drawPiece(ctx, w/2, h/2 - 16, type, color, 0.85);
  },

  // Render larger win screen avatar
  renderWin(canvasEl, type, color) {
    const ctx = canvasEl.getContext('2d');
    const w = canvasEl.width, h = canvasEl.height;
    ctx.clearRect(0, 0, w, h);
    this.drawPiece(ctx, w/2, h/2 - 10, type, color, 2.0);
  }
};
