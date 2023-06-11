import React from "react";
import PianoOctave from "./PianoOctave";
import { useSynth } from "./SynthContext";

const Piano = () => {
  const {
    oscillatorType,
    setOscillatorType,
    attack,
    setAttack,
    decay,
    setDecay,
    sustain,
    setSustain,
    release,
    setRelease,
    octave,
    setOctave,
  } = useSynth();

  const changeOctave = (direction) => {
    setOctave((prevOctaveValue) => prevOctaveValue + direction);
  };

  const handleOscillatorTypeChange = (type) => {
    setOscillatorType(type);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center my-4">
        <h2>Oscillator Type</h2>
        <div className="flex space-x-4">
          <button
            className={`${
              oscillatorType === "sine" ? "bg-blue-500" : "bg-blue-200"
            } px-4 py-2 rounded-md text-white`}
            onClick={() => handleOscillatorTypeChange("sine")}
          >
            Sine
          </button>
          <button
            className={`${
              oscillatorType === "square" ? "bg-blue-500" : "bg-blue-200"
            } px-4 py-2 rounded-md text-white`}
            onClick={() => handleOscillatorTypeChange("square")}
          >
            Square
          </button>
          <button
            className={`${
              oscillatorType === "sawtooth" ? "bg-blue-500" : "bg-blue-200"
            } px-4 py-2 rounded-md text-white`}
            onClick={() => handleOscillatorTypeChange("sawtooth")}
          >
            Sawtooth
          </button>
          <button
            className={`${
              oscillatorType === "triangle" ? "bg-blue-500" : "bg-blue-200"
            } px-4 py-2 rounded-md text-white`}
            onClick={() => handleOscillatorTypeChange("triangle")}
          >
            Triangle
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center my-4">
        <h2>ADSR</h2>
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <label htmlFor="attack">Attack</label>
            <input
              type="range"
              id="attack"
              min="0"
              max="1"
              step="0.01"
              value={attack}
              onChange={(e) => setAttack(parseFloat(e.target.value))}
            />
            <span>{attack.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="decay">Decay</label>
            <input
              type="range"
              id="decay"
              min="0"
              max="1"
              step="0.01"
              value={decay}
              onChange={(e) => setDecay(parseFloat(e.target.value))}
            />
            <span>{decay.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="sustain">Sustain</label>
            <input
              type="range"
              id="sustain"
              min="0"
              max="1"
              step="0.01"
              value={sustain}
              onChange={(e) => setSustain(parseFloat(e.target.value))}
            />
            <span>{sustain.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="release">Release</label>
            <input
              type="range"
              id="release"
              min="0"
              max="1"
              step="0.01"
              value={release}
              onChange={(e) => setRelease(parseFloat(e.target.value))}
            />
            <span>{release.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <PianoOctave />
        <div className="flex flex-col justify-center items-center">
          <button
            className="p-1 text-base font-semibold bg-slate-800 text-slate-50"
            disabled={octave < 1}
            onClick={() => changeOctave(-1)}
          >
            {"<"}
          </button>
          <div className="p-1 text-base font-normal text-slate-800">
            {octave}
          </div>
          <button
            className="p-1 text-base font-semibold bg-slate-800 text-slate-50"
            disabled={octave > 7}
            onClick={() => changeOctave(1)}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-center"></div>
    </div>
  );
};

export default Piano;
