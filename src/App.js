import React from 'react'
import Wireoglyph from "./components/Wireoglyph"
import './App.css';

let mobyDick = "Call me Ishmael. Some years ago - never mind how long precisely - having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen, and regulating circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodologically knocking people's hats off - then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball... I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me."

let shapes = "test roar rear treat fluff bulb bomb blob neon aria nonagon terrible exposee"

let funWords = "phenomenal lexicon scintillating communication bloviate excessively languages consideration cybernetic communism information steersmanship portobello deleuze phlebotomist technicality chromatic bellicose legible extensible honorific charismatic diabolical prehensile ascetic network flagellum gargantuan invalidation charismatic megafauna uncomfortable metaphysical shoulderblade"

let wireoglyph = "tvybu ytuybvn ybyujhn yuyhjhbn tunvt utvnjh ybm hthihb yikhyhb tgvgjujn"

function App() {
  // State hooks
  const [string, setString] = React.useState("This program converts text into the lines drawn between letters as they'd be inputted on a swipe keyboard. Type something here to try it out, or press one of the below buttons to see some more examples");
  const [canvasSize, setCanvasSize] = React.useState(1.5); // size multiplication factor for canvas

  const changeTextString = event => {
    setString(event.target.value);
  }

  const changeCanvasSize = event => {
    setCanvasSize(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Wireoglyph string={wireoglyph} size={1.5} />
        <textarea type="textarea"
          name="textValue"
          onChange={changeTextString}
          value={string}
        />
        <div className="Buttons">
          <button name="Moby Dick" onClick={() => setString(mobyDick)}>Moby Dick</button>
          <button name="Geometry" onClick={() => setString(shapes)}>Geometry</button>
          <button name="Long words" onClick={() => setString(funWords)}>Fun words</button>
        </div>
        <div>
          <text>size</text>
          <input
            type="range"
            min="0.5"
            max="5"
            value={canvasSize}
            step="0.1"
            class="slider"
            id="sizeRange"
            onChange={changeCanvasSize}
          />
        <text>{canvasSize}x</text>
        </div>
        <Wireoglyph string={string} size={canvasSize} />
      </header>
      <footer className="App-footer">
        <div className="attribution" title="Copyright 2021 Joh Yoshida">
          <Wireoglyph string="Copyright 2021 Joh Yoshida" size={0.7} />
        </div>
      </footer>
    </div>
  );
}

export default App;