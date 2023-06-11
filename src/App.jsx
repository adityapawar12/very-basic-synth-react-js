import Piano from "./components/Piano";
import { SynthProvider } from "./components/SynthContext";

export default function App() {
  return (
    <SynthProvider>
      <Piano />
    </SynthProvider>
  );
}
