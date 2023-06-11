import { createContext, useContext, useState } from "react";

export const SynthContext = createContext(null);

export const SynthProvider = ({ children }) => {
  const [oscillatorType, setOscillatorType] = useState("sine");
  const [attack, setAttack] = useState(0);
  const [decay, setDecay] = useState(0.3);
  const [sustain, setSustain] = useState(0.1);
  const [release, setRelease] = useState(0.5);

  const [octave, setOctave] = useState(4);

  return (
    <SynthContext.Provider
      value={{
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
      }}
    >
      {children}
    </SynthContext.Provider>
  );
};

export const useSynth = () => {
  return useContext(SynthContext);
};
