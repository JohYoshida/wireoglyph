import React from "react";

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
  m: [80, 35]
};

const colors = [
  "#f44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722"
];

export default function Wireoglyph(props) {
  const {
    string,
    size
  } = props;

  const draw = (ctx, string, size) => {
    let charArray = string.split("");
    let colorIndex = 1;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#ffffff";

    let lastCoord;
    charArray.forEach((char, i) => {
      let coord = chars[char.toLowerCase()];

      if (coord) {
        // handle valid characters
        if (i <= 0) {
          // draw start circle
          ctx.beginPath();
          ctx.arc(coord[0] * size, coord[1] * size, 2, 0, 365);
          ctx.fill();
          lastCoord = coord; // Set current coord to lastCoord for next iteration
        } else {
          // handle letters
          // Make gradient
          let gradient = ctx.createLinearGradient(
            lastCoord[0],
            lastCoord[1],
            coord[0],
            coord[1]
          );
          gradient.addColorStop(0, colors[colorIndex - 1]);
          gradient.addColorStop(1, colors[colorIndex]);
          ctx.strokeStyle = gradient;
          // Make line from lastCoord to coord
          ctx.beginPath();
          ctx.moveTo(lastCoord[0] * size, lastCoord[1] * size);
          ctx.lineTo(coord[0] * size, coord[1] * size);
          ctx.stroke();
          lastCoord = coord;
          // Increment colorIndex and loop if at end
          colorIndex++;
          if (colorIndex >= colors.length) colorIndex = 1;
        }
      }
    });
  };

  // Make array of canvases
  let strArray = string.split(" ");
  const Canvases = [];
  strArray.forEach((item, i) => {
    Canvases.push(
      <Canvas
        className="canvas"
        width={100 * size}
        height={50 * size}
        draw={draw}
        string={item}
        title={item}
        key={i}
        size={size}
      >
        {item}
      </Canvas>
    );
  });

  return <div className="Wireoglyph">{Canvases}</div>;
}

const Canvas = props => {
  const {
    draw,
    string,
    size,
    ...rest
  } = props;
  const canvasRef = useCanvas(draw, string, size);

  return <canvas ref={canvasRef} {...rest} />;
};

const useCanvas = (draw, string, size) => {
  const canvasRef = React.useRef(null);

  React.useEffect(
    () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      draw(context, string, size);
    },
    [draw, string, size]
  );

  return canvasRef;
};