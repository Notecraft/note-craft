import { EmptyMode, Settings } from "./models/Settings";

const defaultSettings: Settings = {
  selectedKey: "C",
  selectedScale: "lydian",
  selectedTempo: 240,
  selectedNumberOfNotes: 8,
  selectedEmptyMode: EmptyMode.None,
  pattern: null,
};

const keys = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"];

export default defaultSettings;
export { keys };
