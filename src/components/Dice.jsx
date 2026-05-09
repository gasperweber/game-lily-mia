const DOT_LAYOUTS = {
  1: [[false,false,false],[false,true,false],[false,false,false]],
  2: [[true,false,false],[false,false,false],[false,false,true]],
  3: [[true,false,false],[false,true,false],[false,false,true]],
  4: [[true,false,true],[false,false,false],[true,false,true]],
  5: [[true,false,true],[false,true,false],[true,false,true]],
  6: [[true,false,true],[true,false,true],[true,false,true]],
};

export default function Dice({ value, rolling }) {
  const layout = DOT_LAYOUTS[value || 1];
  return (
    <div className={`dice ${rolling ? 'rolling' : ''}`}>
      {layout.flat().map((show, i) => (
        <div key={i} className={`dot ${show ? '' : 'dot-hidden'}`} />
      ))}
    </div>
  );
}
