import React from 'react'
import './App.css';


function App() {
  let mobyDick = "Call me Ishmael. Some years ago - never mind how long precisely - having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen, and regulating circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodologically knocking people's hats off - then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball... I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.";

  let shapes = "test roar rear treat fluff bulb bomb blob aria nonagon terrible"
  let longWords = "phenomenon deleuze communication cybernetic communism information lexicon phlebotomist technicality chromatic bellicose consideration languages bloviate legible extensible honorific charismatic diabolical prehensile"
  // State hooks
  const [string, setString] = React.useState(mobyDick);
  const [canvasSize, setC] = React.useState(3); // size multiplication factor for canvas
  // char positions on 100x50 canvas
  const chars = {
    1: [5, 5],
    2: [15, 5],
    3: [25, 5],
    4: [35, 5],
    5: [45, 5],
    6: [55, 5],
    7: [65, 5],
    8: [75, 5],
    9: [85, 5],
    0: [95, 5],

    q: [5, 15],
    w: [15, 15],
    e: [25, 15],
    r: [35, 15],
    t: [45, 15],
    y: [55, 15],
    u: [65, 15],
    i: [75, 15],
    o: [85, 15],
    p: [95, 15],

    a: [10, 25],
    s: [20, 25],
    d: [30, 25],
    f: [40, 25],
    g: [50, 25],
    h: [60, 25],
    j: [70, 25],
    k: [80, 25],
    l: [90, 25],

    z: [20, 35],
    x: [30, 35],
    c: [40, 35],
    v: [50, 35],
    b: [60, 35],
    n: [70, 35],
    m: [80, 35],
  }

  const colors = [
    "#f44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722"
  ];

  const draw = (ctx, string, canvasSize) => {
    let charArray = string.split("");
    let colorIndex = 1;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#ffffff';

    let lastCoord;
    charArray.forEach((char, i) => {
      let coord = chars[char.toLowerCase()];

      if (coord) { // handle valid characters
        if (i <= 0) { // draw start circle
          ctx.beginPath();
          ctx.arc(coord[0] * canvasSize, coord[1] * canvasSize, 2, 0, 365)
          ctx.fill();
          lastCoord = coord; // Set current coord to lastCoord for next iteration
        } else { // handle letters
          // Make gradient
          let gradient = ctx.createLinearGradient(lastCoord[0], lastCoord[1], coord[0], coord[1]);
          gradient.addColorStop(0, colors[colorIndex - 1]);
          gradient.addColorStop(1, colors[colorIndex]);
          ctx.strokeStyle = gradient;
          // Make line from lastCoord to coord
          ctx.beginPath();
          ctx.moveTo(lastCoord[0] * canvasSize, lastCoord[1] * canvasSize);
          ctx.lineTo(coord[0] * canvasSize, coord[1] * canvasSize);
          ctx.stroke();
          lastCoord = coord;
          // Increment colorIndex and loop if at end
          colorIndex++;
          if (colorIndex >= colors.length) colorIndex = 1;
        }
      }
    });
  }

  // Make array of canvases
  let strArray = string.split(" ");
  const Canvases = [];
  strArray.forEach((item, i) => {
    Canvases.push(
      <Canvas
        className="canvas"
        width={100 * canvasSize}
        height={50 * canvasSize}
        draw={draw}
        string={item}
        title={item}
        key={i}
        size={canvasSize}
      >
        {item}
      </Canvas>
    );
  });

  // Make array of canvases for footer
  let footerArray = "Copyright 2021 Joh Yoshida".split(" ");
  let footerSize = 0.7;
  const FooterCanvases = [];
  footerArray.forEach((item, i) => {
    FooterCanvases.push(
      <Canvas
        className="canvas"
        width={100 * footerSize}
        height={50 * footerSize}
        draw={draw}
        string={item}
        key={i}
        size={footerSize}
      >
        {item}
      </Canvas>
    );
    // title={item}
  });

  const changeTextString = event => {
    setString(event.target.value);
  }

  const changeCanvasSize = event => {
    setC(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <textarea type="textarea"
          name="textValue"
          onChange={changeTextString}
          value={string}
        />
        <div className="Buttons">
          <button name="Moby Dick" onClick={() => setString(mobyDick)}>Moby Dick</button>
          <button name="Geometry" onClick={() => setString(shapes)}>Geometry</button>
          <button name="Long words" onClick={() => setString(longWords)}>Long words</button>
        </div>
        <div>
          <input
            type="range"
            min="0.1"
            max="5"
            value={canvasSize}
            step="0.1"
            class="slider"
            id="sizeRange"
            onChange={changeCanvasSize}
          />
        <text>{canvasSize}</text>
        </div>
        <div className="Canvases">
          {Canvases}
        </div>
      </header>
      <footer className="App-footer">
        <div className="attribution" title="Copyright 2021 Joh Yoshida">
          {FooterCanvases}
        </div>
      </footer>
    </div>
  );
}

const Canvas = props => {
  const {
    draw,
    string,
    size,
    ...rest
  } = props
  const canvasRef = useCanvas(draw, string, size);

  return <canvas ref={canvasRef} {...rest}/>
}

const useCanvas = (draw, string, size) => {
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context, string, size);
  }, [draw, string]);

  return canvasRef
}

export default App;