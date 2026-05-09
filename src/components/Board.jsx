import { BOARD_TILES, TILES_PER_ROW } from '../data/board.js';

const PLAYER_COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12'];

function buildRows() {
  const rows = [];
  for (let i = 0; i < BOARD_TILES.length; i += TILES_PER_ROW) {
    const rowTiles = BOARD_TILES.slice(i, i + TILES_PER_ROW);
    const rowIndex = Math.floor(i / TILES_PER_ROW);
    rows.push({ tiles: rowTiles, reversed: rowIndex % 2 === 1 });
  }
  return rows;
}

const ROWS = buildRows();

export default function Board({ players }) {
  return (
    <div className="board-wrapper">
      <div className="board">
        <div className="board-title-text">🧠 The Great Brain Race!!! 🧠</div>

        {/* Legend */}
        <div className="legend" style={{ marginBottom: '6px' }}>
          {[
            { cls:'tile-M', label:'Memory' },
            { cls:'tile-S', label:'Science' },
            { cls:'tile-G', label:'Geography' },
            { cls:'tile-H', label:'History' },
            { cls:'tile-GK', label:'Gen. Knowledge' },
            { cls:'tile-SQUID', label:'Giant Squid (-3)' },
            { cls:'tile-LUCKY', label:'Lucky Star (+3)' },
          ].map(({cls, label}) => (
            <div key={label} className="legend-item">
              <div className={`legend-dot ${cls}`} />
              {label}
            </div>
          ))}
        </div>

        {ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className={`board-row ${row.reversed ? 'reversed' : ''}`}>
            {row.tiles.map(tile => {
              const playersHere = players.filter(p => p.position === tile.id);
              const isAnyPlayerHere = playersHere.length > 0;
              return (
                <div
                  key={tile.id}
                  className={`tile tile-${tile.type} ${isAnyPlayerHere ? 'tile-current-highlight' : ''}`}
                  title={`${tile.label} (tile ${tile.id})`}
                >
                  <span className="tile-number">{tile.id}</span>
                  <span className="tile-icon">{tile.icon}</span>
                  <span className="tile-label">{tile.label}</span>
                  {playersHere.length > 0 && (
                    <div className="tile-players">
                      {playersHere.map(p => (
                        <div
                          key={p.id}
                          className="tile-player-token"
                          style={{ background: PLAYER_COLORS[p.id] }}
                          title={p.name}
                        >
                          {p.name[0].toUpperCase()}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
