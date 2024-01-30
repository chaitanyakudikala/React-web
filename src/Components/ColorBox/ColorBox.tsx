import { useState } from "react";
import "./styles.css";

const ColorBox = () => {
  const [input, setInput] = useState("");

  return (
    <div className="container">
      <div className="box" style={{ backgroundColor: input }}>
        {input}
      </div>
      <input
        autoFocus
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default ColorBox;
