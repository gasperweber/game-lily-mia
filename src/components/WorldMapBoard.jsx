import { WORLD_STOPS, STOP_DECOS } from '../data/worldPath.js';

const PLAYER_COLORS = ['#e74c3c','#3498db','#2ecc71','#f39c12'];

const TYPE_COLOR = {
  START:'#11998e', FINISH:'#e8a000',
  M:'#8e2de2', S:'#1a7fc4', G:'#1e8449',
  H:'#c0392b', GK:'#d4760a', SQUID:'#1e2d40', LUCKY:'#b03ab0',
};
const TYPE_LABEL = {
  M:'MEMORY', S:'SCIENCE', G:'GEO', H:'HISTORY',
  GK:'GEN.K', SQUID:'🦑SQUID', LUCKY:'⭐LUCKY',
};

/* ── Land shapes (polygon points, 1200×650 equirectangular) ── */
const LAND = [
  // North America
  { id:'na', c:'#a8d48a', s:'#6aaa4a',
    p:'55,68 140,48 238,48 318,60 382,76 422,100 432,130 426,164 406,200 380,234 350,264 316,294 282,318 262,335 250,354 260,372 276,364 290,380 272,396 252,378 236,358 212,316 188,274 164,238 144,205 126,174 108,146 88,124 68,105' },
  // CA bridge
  { id:'ca', c:'#a8d48a', s:'#6aaa4a', p:'248,350 270,338 286,352 280,370 260,378 248,365' },
  // South America
  { id:'sa', c:'#90cc7a', s:'#4a8a3a',
    p:'243,350 286,332 350,334 412,360 460,398 490,450 504,506 490,556 460,590 420,607 384,604 350,578 318,547 298,507 278,458 260,410 247,376' },
  // Europe (main)
  { id:'eu', c:'#f5e97e', s:'#c8a818',
    p:'543,116 570,100 614,94 654,97 697,106 717,124 724,144 710,162 684,172 654,174 622,170 594,160 568,148 547,132' },
  // Iberian peninsula
  { id:'ib', c:'#f5e97e', s:'#c8a818', p:'544,150 558,164 550,182 534,184 520,172 520,156 534,150' },
  // British Isles
  { id:'uk', c:'#f5e97e', s:'#c8a818', p:'569,114 586,106 602,114 600,130 586,140 570,134' },
  { id:'ie', c:'#f5e97e', s:'#c8a818', p:'551,116 567,112 572,126 558,136 548,126' },
  // Africa
  { id:'af', c:'#f5c47a', s:'#c88020',
    p:'530,146 568,132 613,129 652,140 676,160 694,194 708,234 713,280 710,332 694,376 665,418 628,442 590,448 551,440 518,418 496,384 480,342 478,300 482,258 495,218 511,181 527,158' },
  // Madagascar
  { id:'mg', c:'#f5c47a', s:'#c88020', p:'722,360 733,350 742,356 741,376 730,386 720,378' },
  // Asia (main blob)
  { id:'as', c:'#9ed88a', s:'#508840',
    p:'567,100 618,82 692,70 763,61 843,54 925,51 1012,57 1093,64 1158,82 1198,110 1216,140 1206,168 1184,192 1147,208 1100,223 1052,235 1006,243 961,250 920,257 882,263 846,261 822,253 810,240 823,226 837,210 845,191 840,175 828,162 810,150 793,130 766,128 748,134 730,150 717,165 704,178 690,187 672,192 655,182 640,167 627,153 614,139 612,119 627,105 605,108 580,106' },
  // Indian sub-continent bump
  { id:'ind', c:'#9ed88a', s:'#508840', p:'840,252 855,262 864,282 858,298 844,308 830,300 824,282 830,265' },
  // SE Asia peninsula
  { id:'sea', c:'#9ed88a', s:'#508840', p:'939,229 958,248 958,292 942,314 927,300 916,270 924,246' },
  // Malay island chain
  { id:'mal', c:'#9ed88a', s:'#508840', p:'952,290 974,282 990,294 988,312 966,318 952,308' },
  // Japan
  { id:'jp', c:'#9ed88a', s:'#508840', p:'1116,150 1130,142 1140,150 1137,166 1122,172 1113,162' },
  // Australia
  { id:'au', c:'#f5c07a', s:'#c87818',
    p:'948,398 1002,382 1056,378 1104,386 1144,402 1165,430 1160,460 1138,485 1100,503 1053,511 1002,503 955,482 930,452 924,420' },
  // Tasmania
  { id:'tas', c:'#f5c07a', s:'#c87818', p:'1041,514 1058,510 1067,523 1060,540 1043,544 1033,530' },
  // NZ North Island
  { id:'nzn', c:'#90cc7a', s:'#4a8a3a', p:'1147,444 1172,431 1190,445 1185,470 1161,481 1143,464' },
  // NZ South Island
  { id:'nzs', c:'#90cc7a', s:'#4a8a3a', p:'1129,480 1157,468 1175,484 1170,515 1143,525 1125,507' },
  // Greenland
  { id:'gl', c:'#d8eeff', s:'#80b0e0', p:'430,44 470,26 513,24 547,38 560,66 546,94 514,110 480,114 449,100 427,74' },
  // Iceland
  { id:'is', c:'#d8eeff', s:'#80b0e0', p:'534,87 557,78 580,85 578,104 554,113 532,106' },
  // Antarctica strip
  { id:'ant', c:'#dde8ff', s:'#8888cc',
    d:'M0,626 L190,616 L380,623 L570,615 L760,623 L950,615 L1200,622 L1200,650 L0,650Z' },
];

/* ── Extra flavor icons scattered across the map ── */
const FLAVOR = [
  // oceans
  [100,510,'🌊'],[220,570,'🌊'],[500,560,'🌊'],[1060,555,'🌊'],[380,490,'🌊'],
  [330,490,'⛵'],[920,355,'⛵'],[700,500,'🐬'],[840,462,'🐬'],[110,390,'🦈'],
];

function polyline(stops) {
  return stops.map((s,i)=>`${i===0?'M':'L'}${s.x},${s.y}`).join(' ');
}

function arrowAngle(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
}

// offset landmark/animal so they don't sit on top of the stop circle
// alternating left/right based on stop index
const DECO_SIDE = [
  1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,1,-1,
];

export default function WorldMapBoard({ players, currentStopIdx }) {
  const pathD = polyline(WORLD_STOPS);

  return (
    <div style={{
      width:'100%', borderRadius:20, overflow:'hidden',
      boxShadow:'0 10px 40px rgba(0,0,0,0.5)',
      border:'5px solid #fff',
      background:'#0d47a1',
    }}>
      <svg viewBox="0 0 1200 650" style={{ width:'100%', height:'auto', display:'block' }}
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="og" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1565c0"/>
            <stop offset="100%" stopColor="#0a3880"/>
          </linearGradient>
          {/* board parchment texture gradient */}
          <linearGradient id="land-overlay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.05)"/>
          </linearGradient>
          <filter id="drop" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45"/>
          </filter>
          <filter id="glow-stop" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="label-shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.6"/>
          </filter>
        </defs>

        {/* Ocean */}
        <rect width="1200" height="650" fill="url(#og)"/>

        {/* Subtle latitude lines */}
        {[108,217,325,433,541].map(y=>(
          <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        ))}

        {/* Land masses */}
        {LAND.map(sh => sh.d
          ? <path key={sh.id} d={sh.d} fill={sh.c} stroke={sh.s} strokeWidth="1.5"/>
          : <polygon key={sh.id} points={sh.p} fill={sh.c} stroke={sh.s} strokeWidth="1.5"/>
        )}
        {/* Subtle shading overlay on land */}
        {LAND.map(sh => sh.d
          ? <path key={`ov-${sh.id}`} d={sh.d} fill="url(#land-overlay)" pointerEvents="none"/>
          : <polygon key={`ov-${sh.id}`} points={sh.p} fill="url(#land-overlay)" pointerEvents="none"/>
        )}

        {/* Flavor icons */}
        {FLAVOR.map(([x,y,em],i)=>(
          <text key={i} x={x} y={y} fontSize="15" textAnchor="middle" opacity="0.55">{em}</text>
        ))}

        {/* Antarctica penguins row */}
        {[500,540,580,618,655,692,730,768].map((x,i)=>(
          <text key={`pg${i}`} x={x} y={643} fontSize="15" textAnchor="middle">🐧</text>
        ))}

        {/* ═══════════════════════════════════════════════════
            BOARD GAME PATH — layered for a bold road effect
        ═══════════════════════════════════════════════════ */}
        {/* Outer glow */}
        <path d={pathD} fill="none" stroke="rgba(255,220,50,0.18)" strokeWidth="28"
          strokeLinejoin="round" strokeLinecap="round"/>
        {/* Black shadow */}
        <path d={pathD} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="18"
          strokeLinejoin="round" strokeLinecap="round"/>
        {/* White road border */}
        <path d={pathD} fill="none" stroke="#ffffff" strokeWidth="13"
          strokeLinejoin="round" strokeLinecap="round"/>
        {/* Gold dashed center */}
        <path d={pathD} fill="none" stroke="#ffd700" strokeWidth="7"
          strokeDasharray="20,10" strokeLinejoin="round" strokeLinecap="round"/>
        {/* Bright inner highlight on dashes */}
        <path d={pathD} fill="none" stroke="#fff8a0" strokeWidth="3"
          strokeDasharray="20,10" strokeLinejoin="round" strokeLinecap="round"/>

        {/* Direction arrows at midpoints */}
        {WORLD_STOPS.slice(0,-1).map((s,i)=>{
          const t = WORLD_STOPS[i+1];
          const mx = (s.x+t.x)/2;
          const my = (s.y+t.y)/2;
          const angle = arrowAngle(s,t);
          return (
            <g key={`ar${i}`} transform={`translate(${mx},${my}) rotate(${angle})`}>
              <polygon points="-8,-5 8,0 -8,5" fill="#ffd700" opacity="0.9" filter="url(#drop)"/>
            </g>
          );
        })}

        {/* ═══════════════════════════════════════════════════
            LANDMARK / ANIMAL DECORATIONS (per stop)
        ═══════════════════════════════════════════════════ */}
        {STOP_DECOS.map(deco => {
          const stop = WORLD_STOPS[deco.stopId];
          if (!stop) return null;
          const side = DECO_SIDE[deco.stopId] ?? 1;
          // place decorations offset to the side that doesn't block the path
          const dx = side * 38;
          const dy = -22;
          return (
            <g key={`deco${deco.stopId}`} opacity="0.92">
              {/* small pill background */}
              <rect x={stop.x+dx-18} y={stop.y+dy-13} width={36} height={26}
                rx={5} fill="rgba(0,0,0,0.55)"/>
              <text x={stop.x+dx} y={stop.y+dy} fontSize="13" textAnchor="middle">{deco.landmark}</text>
              <text x={stop.x+dx} y={stop.y+dy+13} fontSize="11" textAnchor="middle">{deco.animal}</text>
            </g>
          );
        })}

        {/* ═══════════════════════════════════════════════════
            STOP MARKERS
        ═══════════════════════════════════════════════════ */}
        {WORLD_STOPS.map((stop, i) => {
          const col = TYPE_COLOR[stop.type] ?? '#555';
          const isSpecial = stop.type==='START' || stop.type==='FINISH';
          const r = isSpecial ? 22 : 15;
          const isActive = currentStopIdx === i;

          return (
            <g key={stop.id}>
              {/* Active pulse ring */}
              {isActive && (
                <circle cx={stop.x} cy={stop.y} r={r+10} fill="none" stroke="#fff" strokeWidth="3">
                  <animate attributeName="r" values={`${r+7};${r+16};${r+7}`} dur="1.4s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.9;0.15;0.9" dur="1.4s" repeatCount="indefinite"/>
                </circle>
              )}

              {/* Drop shadow */}
              <circle cx={stop.x+2} cy={stop.y+4} r={r+3} fill="rgba(0,0,0,0.35)"/>
              {/* White ring */}
              <circle cx={stop.x} cy={stop.y} r={r+3} fill="#ffffff"/>
              {/* Colored fill */}
              <circle cx={stop.x} cy={stop.y} r={r} fill={col}/>
              {/* Inner highlight */}
              <circle cx={stop.x} cy={stop.y} r={r} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>

              {/* Flag emoji */}
              <text x={stop.x} y={stop.y+1} fontSize={isSpecial?15:12}
                textAnchor="middle" dominantBaseline="middle">{stop.flag}</text>

              {/* Step number badge */}
              <circle cx={stop.x+r+1} cy={stop.y-r-1} r={8} fill="#fff" stroke={col} strokeWidth="2"/>
              <text x={stop.x+r+1} y={stop.y-r} fontSize="7" fontWeight="bold"
                textAnchor="middle" dominantBaseline="middle" fill={col}>{i+1}</text>

              {/* Type badge (above for non-special) */}
              {!isSpecial && TYPE_LABEL[stop.type] && (
                <>
                  <rect x={stop.x-22} y={stop.y-r-20} width={44} height={13} rx={4} fill={col}/>
                  <text x={stop.x} y={stop.y-r-10} fontSize="6.8" fontWeight="bold"
                    textAnchor="middle" fill="#fff">{TYPE_LABEL[stop.type]}</text>
                </>
              )}

              {/* START / FINISH label */}
              {isSpecial && (
                <>
                  <rect x={stop.x-26} y={stop.y-r-22} width={52} height={16} rx={5} fill={col}/>
                  <text x={stop.x} y={stop.y-r-11} fontSize="9" fontWeight="bold"
                    textAnchor="middle" fill="#fff" fontFamily="'Fredoka One',cursive">
                    {stop.type==='START' ? '🏁 START' : '🏆 FINISH'}
                  </text>
                </>
              )}

              {/* Country name below */}
              <rect x={stop.x-32} y={stop.y+r+4} width={64} height={13} rx={4} fill="rgba(0,0,0,0.7)"/>
              <text x={stop.x} y={stop.y+r+13} fontSize="6.8" fontWeight="bold"
                textAnchor="middle" fill="#fff">
                {stop.name.length>14 ? stop.name.slice(0,13)+'…' : stop.name}
              </text>
            </g>
          );
        })}

        {/* START starburst rays */}
        {[0,45,90,135,180,225,270,315].map((a,i)=>{
          const s=WORLD_STOPS[0]; const r=a*Math.PI/180;
          return <line key={`sr${i}`} x1={s.x} y1={s.y}
            x2={s.x+Math.cos(r)*40} y2={s.y+Math.sin(r)*40}
            stroke="#38ef7d" strokeWidth="2.5" opacity="0.7"/>;
        })}
        {/* FINISH starburst rays */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>{
          const s=WORLD_STOPS[WORLD_STOPS.length-1]; const r=a*Math.PI/180;
          return <line key={`fr${i}`} x1={s.x} y1={s.y}
            x2={s.x+Math.cos(r)*40} y2={s.y+Math.sin(r)*40}
            stroke="#ffd700" strokeWidth="2.5" opacity="0.7"/>;
        })}

        {/* ═══════════════════════════════════════════════════
            PLAYER TOKENS
        ═══════════════════════════════════════════════════ */}
        {players.map((p, pi) => {
          const stop = WORLD_STOPS[p.position];
          if (!stop) return null;
          // offset tokens so multiple players on same stop don't overlap
          const offsets = [[-16,-16],[16,-16],[-16,16],[16,16]];
          const [ox,oy] = offsets[pi % 4];
          return (
            <g key={`pl${pi}`}>
              <circle cx={stop.x+ox+1} cy={stop.y+oy+2} r={12} fill="rgba(0,0,0,0.3)"/>
              <circle cx={stop.x+ox} cy={stop.y+oy} r={12}
                fill={PLAYER_COLORS[pi]} stroke="#fff" strokeWidth="2.5"/>
              <text x={stop.x+ox} y={stop.y+oy+1} fontSize="9" fontWeight="bold"
                textAnchor="middle" dominantBaseline="middle" fill="#fff">
                {p.name[0].toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Compass rose (bottom-right corner) */}
        <g transform="translate(1158,590)">
          <circle cx="0" cy="0" r="22" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          {[['N',-16],['S',20],['E',20],['W',-20]].map(([l,v],i)=>(
            <text key={l} x={i<2?0:v} y={i<2?v:5} fontSize="8" fontWeight="bold"
              textAnchor="middle" fill="#ffd700">{l}</text>
          ))}
          <polygon points="0,-14 3,-4 0,0 -3,-4" fill="#fff"/>
          <polygon points="0,14 3,4 0,0 -3,4" fill="rgba(255,255,255,0.5)"/>
          <polygon points="14,0 4,-3 0,0 4,3" fill="rgba(255,255,255,0.5)"/>
          <polygon points="-14,0 -4,-3 0,0 -4,3" fill="rgba(255,255,255,0.5)"/>
        </g>

        {/* ── Title bar ── */}
        <rect x="0" y="0" width="1200" height="28" fill="rgba(0,0,0,0.6)"/>
        <text x="600" y="19" fontSize="14" textAnchor="middle" fill="#ffd700"
          fontWeight="bold" fontFamily="'Fredoka One',cursive" letterSpacing="1">
          🧠 THE GREAT BRAIN RACE!!! — WORLD TOUR  🌍  NZ → Antarctica
        </text>

        {/* ── Legend bar ── */}
        <rect x="0" y="622" width="1200" height="28" fill="rgba(0,0,0,0.6)"/>
        {[
          ['#8e2de2','🧩 MEMORY'],['#1a7fc4','🔬 SCIENCE'],['#1e8449','🌍 GEO'],
          ['#c0392b','📜 HISTORY'],['#d4760a','🧠 GEN.K'],['#1e2d40','🦑 SQUID -3'],['#b03ab0','⭐ LUCKY +3'],
        ].map(([col,label],i)=>(
          <g key={label} transform={`translate(${10+i*172},625)`}>
            <rect x="0" y="1" width="10" height="10" rx="3" fill={col}/>
            <text x="14" y="11" fontSize="8" fill="#fff" fontWeight="700">{label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
