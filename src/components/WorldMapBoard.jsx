import { WORLD_STOPS } from '../data/worldPath.js';

const PLAYER_COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12'];

const TYPE_COLORS = {
  START:'#11998e', FINISH:'#f7971e',
  M:'#8e2de2', S:'#2193b0', G:'#1e8449',
  H:'#c0392b', GK:'#e67e22', SQUID:'#2c3e50', LUCKY:'#c850c0',
};

// Simplified continent outlines for 1200×650 equirectangular viewBox
const LAND = [
  // North America
  { id:'na', fill:'#b8e4b8', stroke:'#5a9a5a', d:'M145,105 C170,78 228,62 290,65 C348,68 398,88 422,122 C440,150 442,184 428,216 C415,248 390,272 358,295 C328,318 292,334 265,348 C248,358 242,372 250,388 C258,404 272,398 282,410 C292,422 280,438 265,432 C248,425 236,408 226,390 C215,370 218,348 200,318 C182,285 162,245 150,205 C138,168 140,130 145,105Z' },
  // Central America bridge
  { id:'ca', fill:'#b8e4b8', stroke:'#5a9a5a', d:'M248,348 C260,352 275,360 278,375 C280,388 265,398 252,388 C245,380 244,368 248,348Z' },
  // South America
  { id:'sa', fill:'#a8d8a8', stroke:'#4a8a4a', d:'M248,348 C268,334 328,332 388,355 C448,378 495,420 515,468 C532,512 526,558 500,590 C474,622 435,642 396,640 C356,638 320,622 298,594 C275,565 260,528 248,488 C236,448 232,408 238,378 C242,368 244,355 248,348Z' },
  // Europe (simplified)
  { id:'eu', fill:'#fff6b0', stroke:'#c8a800', d:'M542,118 C565,102 604,94 645,97 C684,100 718,114 733,134 C745,150 742,170 726,182 C708,194 682,200 655,202 C626,204 598,198 575,185 C552,172 538,153 538,135Z' },
  // Iberian Peninsula
  { id:'ib', fill:'#fff6b0', stroke:'#c8a800', d:'M545,152 C548,162 544,172 535,178 C526,184 515,182 510,174 C505,165 508,155 516,150 C525,145 540,142 545,152Z' },
  // UK blob
  { id:'uk', fill:'#fff6b0', stroke:'#c8a800', d:'M572,118 C580,110 592,108 600,115 C608,122 606,134 598,140 C588,146 574,144 570,136 C566,128 568,122 572,118Z' },
  // Africa
  { id:'af', fill:'#ffd09a', stroke:'#c87800', d:'M532,148 C562,135 606,130 645,140 C678,150 700,176 712,212 C724,250 726,296 720,340 C714,384 698,424 670,452 C642,480 604,494 566,492 C528,490 496,474 474,445 C452,416 440,378 438,338 C435,296 444,254 458,220 C472,186 505,162 532,148Z' },
  // Madagascar
  { id:'mg', fill:'#ffd09a', stroke:'#c87800', d:'M726,362 C732,350 740,348 746,356 C752,364 750,380 744,390 C738,400 728,402 724,394 C720,386 720,374 726,362Z' },
  // Asia (combined big blob)
  { id:'as', fill:'#c8e8b8', stroke:'#508850', d:'M568,100 C618,82 688,70 762,62 C838,54 930,52 1012,58 C1090,64 1155,80 1196,110 C1220,130 1218,158 1194,182 C1168,206 1132,218 1090,228 C1044,238 994,248 944,254 C900,260 858,262 820,255 C800,250 788,242 798,228 C808,215 828,205 845,192 C860,180 864,164 850,152 C836,140 815,132 792,130 C770,128 750,135 736,150 C722,164 718,180 705,192 C692,204 675,205 658,196 C640,187 628,170 620,153 C610,134 608,114 622,104Z' },
  // Indian subcontinent bump
  { id:'in', fill:'#c8e8b8', stroke:'#508850', d:'M840,250 C854,258 862,276 858,292 C854,308 840,318 826,314 C812,310 804,296 808,282 C812,268 828,244 840,250Z' },
  // SE Asia peninsulas
  { id:'se', fill:'#c8e8b8', stroke:'#508850', d:'M948,228 C960,238 965,256 960,272 C955,288 942,298 930,294 C918,290 912,276 916,262 C920,248 936,220 948,228Z M970,260 C978,255 988,258 992,268 C996,278 990,292 980,296 C970,300 960,294 958,284 C956,274 962,264 970,260Z' },
  // Japan
  { id:'jp', fill:'#c8e8b8', stroke:'#508850', d:'M1118,155 C1124,148 1132,148 1136,156 C1140,164 1136,175 1128,178 C1120,181 1112,176 1112,168 C1112,162 1114,158 1118,155Z' },
  // Australia
  { id:'au', fill:'#ffd8a0', stroke:'#c87820', d:'M950,398 C990,382 1045,378 1095,385 C1138,392 1165,414 1170,442 C1175,470 1156,496 1122,510 C1088,524 1042,524 998,510 C954,496 918,470 908,440 C898,412 914,396 950,398Z' },
  // Tasmania
  { id:'tas', fill:'#ffd8a0', stroke:'#c87820', d:'M1042,520 C1050,516 1058,520 1060,530 C1062,540 1056,548 1046,548 C1036,548 1030,540 1032,530 C1034,522 1038,522 1042,520Z' },
  // New Zealand North Island
  { id:'nzn', fill:'#a8d8a8', stroke:'#4a8a4a', d:'M1148,445 L1172,432 L1188,445 L1184,468 L1162,478 L1145,464Z' },
  // New Zealand South Island
  { id:'nzs', fill:'#a8d8a8', stroke:'#4a8a4a', d:'M1132,478 L1158,468 L1174,482 L1170,512 L1146,522 L1128,504Z' },
  // Greenland
  { id:'gl', fill:'#ddf0ff', stroke:'#80b8e0', d:'M430,45 C462,28 505,25 538,38 C566,50 578,75 565,98 C552,120 524,132 494,130 C462,128 430,112 418,90 C408,70 412,54 430,45Z' },
  // Iceland
  { id:'is', fill:'#ddf0ff', stroke:'#80b8e0', d:'M536,88 C550,80 568,82 574,94 C580,106 570,118 555,118 C540,118 528,106 530,94Z' },
  // Antarctica
  { id:'ant', fill:'#dde8ff', stroke:'#9090c8', d:'M0,628 Q150,618 300,622 Q450,614 600,620 Q750,614 900,622 Q1050,618 1200,628 L1200,650 L0,650Z' },
  // Extra Antarctica bumps
  { id:'ant2', fill:'#dde8ff', stroke:'#9090c8', d:'M450,622 Q500,610 550,618 Q600,608 650,616 Q700,608 750,618Z' },
];

// Path polyline through all stops
function buildPathD(stops) {
  return stops.map((s, i) => `${i === 0 ? 'M' : 'L'}${s.x},${s.y}`).join(' ');
}

// Staggered label offsets so they don't overlap
const LABEL_OFFSET = [
  [12,14],[12,-16],[12,14],[-10,-16],[12,-16],
  [14,12],[12,-16],[12,14],[-12,-16],[12,14],
  [12,-16],[-14,-14],[14,12],[12,-16],[-12,14],
  [-14,12],[12,-16],[12,14],[12,-16],[-14,12],
  [12,14],[12,-16],[14,12],[0,18],
];

export default function WorldMapBoard({ players, currentStopIdx }) {
  return (
    <div style={{ width:'100%', overflow:'hidden', borderRadius:16, boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
      <svg
        viewBox="0 0 1200 650"
        style={{ width:'100%', height:'auto', display:'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a6fa8" />
            <stop offset="60%" stopColor="#1e8bc3" />
            <stop offset="100%" stopColor="#0d5a8a" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="waves" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M0,10 Q10,4 20,10 Q30,16 40,10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          </pattern>
        </defs>

        {/* Ocean */}
        <rect width="1200" height="650" fill="url(#ocean)" />
        <rect width="1200" height="650" fill="url(#waves)" />

        {/* Ocean decorations */}
        {[
          [80,520,'🌊'],[200,580,'🌊'],[500,580,'🌊'],[1050,570,'🌊'],
          [110,380,'🦈'],[700,500,'🐬'],[820,450,'🐬'],[350,500,'🌊'],
          [650,580,'🌊'],[950,300,'⛵'],[450,450,'⛵'],[150,280,'🌊'],
        ].map(([x,y,em],i)=>(
          <text key={i} x={x} y={y} fontSize="14" textAnchor="middle" opacity="0.55">{em}</text>
        ))}

        {/* Antarctica penguins */}
        {[520,560,600,640,680,720,760].map((x,i)=>(
          <text key={`p${i}`} x={x} y={642} fontSize="13" textAnchor="middle">🐧</text>
        ))}

        {/* Land masses */}
        {LAND.map(shape => (
          <path key={shape.id} d={shape.d} fill={shape.fill} stroke={shape.stroke} strokeWidth="1.2" />
        ))}

        {/* Latitude guide lines (subtle) */}
        {[108, 217, 325, 433, 541].map(y => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        ))}
        {[200,400,600,800,1000].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="650" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        ))}

        {/* Game path */}
        <path d={buildPathD(WORLD_STOPS)} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeDasharray="10,6" />
        <path d={buildPathD(WORLD_STOPS)} fill="none" stroke="rgba(255,220,50,0.5)" strokeWidth="1.5" strokeDasharray="10,6" />

        {/* Landmark & animal decorations */}
        {WORLD_STOPS.map((stop, i) => {
          const [ox, oy] = LABEL_OFFSET[i] ?? [12, 14];
          const lx = stop.x + ox * 2.2;
          const ly = stop.y + oy * 1.8;
          return (
            <g key={`deco-${stop.id}`}>
              <text x={lx} y={ly - 8} fontSize="13" textAnchor="middle">{stop.landmark}</text>
              <text x={lx} y={ly + 7} fontSize="11" textAnchor="middle">{stop.animal}</text>
            </g>
          );
        })}

        {/* Stop markers */}
        {WORLD_STOPS.map((stop, i) => {
          const isActive = currentStopIdx === i;
          const col = TYPE_COLORS[stop.type] ?? '#888';
          const r = stop.type === 'START' || stop.type === 'FINISH' ? 16 : 14;
          const [ox, oy] = LABEL_OFFSET[i] ?? [12, 14];

          return (
            <g key={stop.id}>
              {/* glow ring when active */}
              {isActive && (
                <circle cx={stop.x} cy={stop.y} r={r+7} fill="rgba(255,220,50,0.35)" stroke="#ffd200" strokeWidth="2">
                  <animate attributeName="r" values={`${r+5};${r+10};${r+5}`} dur="1.5s" repeatCount="indefinite"/>
                </circle>
              )}
              {/* outer ring */}
              <circle cx={stop.x} cy={stop.y} r={r+2} fill="rgba(0,0,0,0.3)" />
              {/* main circle */}
              <circle cx={stop.x} cy={stop.y} r={r} fill={col} stroke="#fff" strokeWidth="2" />
              {/* icon */}
              <text x={stop.x} y={stop.y+1} fontSize={stop.type==='START'||stop.type==='FINISH'?12:10}
                textAnchor="middle" dominantBaseline="middle">{stop.flag}</text>
              {/* stop number badge */}
              <circle cx={stop.x+r-2} cy={stop.y-r+2} r={6} fill="#fff" stroke={col} strokeWidth="1.5"/>
              <text x={stop.x+r-2} y={stop.y-r+3} fontSize="6" textAnchor="middle" dominantBaseline="middle"
                fontWeight="bold" fill={col}>{i+1}</text>
              {/* country name label */}
              <rect x={stop.x + ox*2.2 - 24} y={stop.y + oy*1.8 - 26} width={48} height={12} rx={3}
                fill="rgba(0,0,0,0.55)" />
              <text x={stop.x + ox*2.2} y={stop.y + oy*1.8 - 17} fontSize="6.5" textAnchor="middle"
                fill="#fff" fontWeight="bold">{stop.name}</text>
            </g>
          );
        })}

        {/* Player tokens on their stops */}
        {players.map((player, pi) => {
          const stop = WORLD_STOPS[player.position];
          if (!stop) return null;
          const offset = [(pi%2===0?-1:1)*12, (pi<2?-1:1)*12];
          const tx = stop.x + offset[0];
          const ty = stop.y + offset[1];
          return (
            <g key={`player-${pi}`}>
              <circle cx={tx} cy={ty} r={10} fill={PLAYER_COLORS[pi]} stroke="#fff" strokeWidth="2"
                style={{ filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}/>
              <text x={tx} y={ty+1} fontSize="8" textAnchor="middle" dominantBaseline="middle"
                fill="#fff" fontWeight="bold">{player.name[0].toUpperCase()}</text>
            </g>
          );
        })}

        {/* Title */}
        <rect x="0" y="0" width="1200" height="28" fill="rgba(0,0,0,0.45)" />
        <text x="600" y="19" fontSize="14" textAnchor="middle" fill="#ffd200" fontWeight="bold"
          fontFamily="'Fredoka One', cursive">🧠 THE GREAT BRAIN RACE!!! — World Tour 🌍</text>
      </svg>
    </div>
  );
}
