// MemoryGame.js — Animal card memory mini-game

class MemoryGame {
  constructor() {
    this.cards       = [];
    this.flipped     = [];
    this.matched     = 0;
    this.moves       = 0;
    this.total       = 0;
    this.locked      = false;
    this.onComplete  = null;
    this.pairs       = 6; // number of pairs
  }

  start(onComplete) {
    this.onComplete = onComplete;
    this.matched    = 0;
    this.moves      = 0;
    this.flipped    = [];
    this.locked     = false;

    const animals   = getRandomAnimalSet(this.pairs);
    const doubled   = [...animals, ...animals];
    shuffleArray(doubled);
    this.cards  = doubled;
    this.total  = doubled.length;

    const grid = document.getElementById('memory-grid');
    const status = document.getElementById('memory-status');
    const btn    = document.getElementById('btn-memory-close');

    grid.innerHTML = '';
    status.textContent = 'Find all matching pairs!';
    btn.style.display  = 'none';

    // Set grid to 4 columns for 12 cards
    grid.style.gridTemplateColumns = 'repeat(4, 1fr)';

    doubled.forEach((animal, idx) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.dataset.idx = idx;
      card.dataset.name = animal.name;

      const front = document.createElement('div');
      front.className = 'card-front';
      // Pattern design on card back
      const patternSVG = `<svg class="card-front-pattern" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="25" fill="none" stroke="white" stroke-width="2"/>
        <path d="M15 30 Q30 10 45 30 Q30 50 15 30" fill="none" stroke="white" stroke-width="2"/>
        <circle cx="30" cy="30" r="5" fill="white"/>
      </svg>`;
      front.innerHTML = patternSVG;

      const back = document.createElement('div');
      back.className = 'card-back';
      const img = document.createElement('img');
      img.src = animal.img;
      img.alt = animal.name;
      img.loading = 'lazy';
      back.appendChild(img);

      // Animal name label
      const label = document.createElement('div');
      label.style.cssText = 'position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.55);color:white;font-size:0.7rem;font-weight:700;text-align:center;padding:3px;border-radius:0 0 8px 8px;';
      label.textContent = animal.name;
      back.appendChild(label);

      card.appendChild(front);
      card.appendChild(back);
      card.addEventListener('click', () => this._flip(card, idx));
      grid.appendChild(card);
    });

    document.getElementById('dialog-memory').style.display = 'flex';
  }

  _flip(card, idx) {
    if (this.locked) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;
    if (this.flipped.length >= 2) return;

    card.classList.add('flipped');
    this.flipped.push({ card, idx, name: card.dataset.name });

    if (this.flipped.length === 2) {
      this.moves++;
      this._checkMatch();
    }
  }

  _checkMatch() {
    const [a, b] = this.flipped;
    const status = document.getElementById('memory-status');

    if (a.name === b.name) {
      // Match!
      a.card.classList.add('matched');
      b.card.classList.add('matched');
      this.matched += 2;
      this.flipped  = [];
      status.textContent = `Great match! ${this.matched/2} pairs found.`;

      if (this.matched === this.total) {
        // All done
        status.textContent = `Brilliant! All ${this.pairs} pairs found in ${this.moves} moves!`;
        document.getElementById('btn-memory-close').style.display = 'inline-block';
      }
    } else {
      // No match — flip back after delay
      this.locked = true;
      status.textContent = 'Not a match. Try again!';
      setTimeout(() => {
        a.card.classList.remove('flipped');
        b.card.classList.remove('flipped');
        this.flipped = [];
        this.locked  = false;
        status.textContent = `${this.moves} moves so far — keep going!`;
      }, 1100);
    }
  }

  close() {
    document.getElementById('dialog-memory').style.display = 'none';
    if (this.onComplete) this.onComplete(this.moves);
  }
}
