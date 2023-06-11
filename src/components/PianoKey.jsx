import React, { useEffect, useRef } from "react";
import { useSynth } from "./SynthContext";

const PianoKey = ({ isBlack, halfSteps, note }) => {
  const { oscillatorType, attack, decay, sustain, release, octave } =
    useSynth();

  const pianoKeyRef = useRef(null);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const baseFrequency = 440 * Math.pow(2, octave - 4);

  const startSineWaveAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    if (!oscillatorRef.current) {
      oscillatorRef.current = audioContextRef.current.createOscillator();
      oscillatorRef.current.type = oscillatorType;
      oscillatorRef.current.frequency.setValueAtTime(
        baseFrequency,
        audioContextRef.current.currentTime
      );

      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.setValueAtTime(
        0,
        audioContextRef.current.currentTime
      );

      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);

      oscillatorRef.current.start();
    }

    const frequency = baseFrequency * Math.pow(2, halfSteps / 12);
    oscillatorRef.current.frequency.setValueAtTime(
      frequency,
      audioContextRef.current.currentTime
    );

    gainNodeRef.current.gain.cancelScheduledValues(
      audioContextRef.current.currentTime
    );
    gainNodeRef.current.gain.setValueAtTime(
      0,
      audioContextRef.current.currentTime
    );
    gainNodeRef.current.gain.linearRampToValueAtTime(
      1,
      audioContextRef.current.currentTime + attack
    );
    gainNodeRef.current.gain.linearRampToValueAtTime(
      sustain,
      audioContextRef.current.currentTime + attack + decay
    );
  };

  const stopSineWaveAudio = () => {
    if (oscillatorRef.current) {
      gainNodeRef.current.gain.cancelScheduledValues(
        audioContextRef.current.currentTime
      );
      gainNodeRef.current.gain.setValueAtTime(
        gainNodeRef.current.gain.value,
        audioContextRef.current.currentTime
      );
      gainNodeRef.current.gain.linearRampToValueAtTime(
        0,
        audioContextRef.current.currentTime + release
      );
    }
  };

  useEffect(() => {
    const handleMouseDown = () => {
      startSineWaveAudio();
    };

    const handleMouseLeave = () => {
      stopSineWaveAudio();
    };

    pianoKeyRef.current.addEventListener("mousedown", handleMouseDown);
    pianoKeyRef.current.addEventListener("mouseup", handleMouseLeave);
    pianoKeyRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      pianoKeyRef.current.removeEventListener("mousedown", handleMouseDown);
      pianoKeyRef.current.removeEventListener("mouseup", handleMouseLeave);
      pianoKeyRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.type = oscillatorType;
    }
  }, [oscillatorType]);

  return isBlack ? (
    <div
      ref={pianoKeyRef}
      className="piano-key black bg-black text-white h-40 w-12"
      onMouseDown={startSineWaveAudio}
      onMouseUp={stopSineWaveAudio}
      onMouseLeave={stopSineWaveAudio}
    >
      {note + octave}
    </div>
  ) : (
    <div
      ref={pianoKeyRef}
      className="piano-key white bg-white text-black h-40 w-12"
      onMouseDown={startSineWaveAudio}
      onMouseUp={stopSineWaveAudio}
      onMouseLeave={stopSineWaveAudio}
    >
      {note + octave}
    </div>
  );
};

export default PianoKey;
