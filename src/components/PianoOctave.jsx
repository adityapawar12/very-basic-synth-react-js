import React from "react";
import PianoKey from "./PianoKey";

const PianoOctave = () => {
  const keys = [
    { note: "C", isBlack: false },
    { note: "C#", isBlack: true },
    { note: "D", isBlack: false },
    { note: "D#", isBlack: true },
    { note: "E", isBlack: false },
    { note: "F", isBlack: false },
    { note: "F#", isBlack: true },
    { note: "G", isBlack: false },
    { note: "G#", isBlack: true },
    { note: "A", isBlack: false },
    { note: "A#", isBlack: true },
    { note: "B", isBlack: false },
  ];

  return (
    <div className="flex flex-row">
      {keys.map((key, index) => {
        const halfSteps = key.isBlack ? index + 1 : index;
        return (
          <PianoKey
            key={index}
            note={key.note}
            isBlack={key.isBlack}
            halfSteps={halfSteps}
          />
        );
      })}
    </div>
  );
};

export default PianoOctave;
