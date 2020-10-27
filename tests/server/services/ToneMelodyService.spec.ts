import Settings from "../../../src/server/models/Settings";
import ToneMelodyService from "../../../src/server/services/ToneMelodyService";

describe("ToneMelodyService", () => {
  let service: ToneMelodyService;
  beforeAll(() => {
    service = new ToneMelodyService();
  });
  it("should build random pattern", () => {
    const result = service.buildRandomResult({});

    const expectedResult = {
      pattern: ["B", "D", "B", "C", "G", "F#", "C", "G"],
      selectedScale: "lydian",
      selectedKey: "C",
      selectedNumberOfNotes: 8,
      keys: ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"],
      allNotes: ["C", "D", "E", "F#", "G", "A", "B"],
      allScales: [
        "ionian",
        "dorian",
        "phrygian",
        "lydian",
        "mixolydian",
        "aeolian",
        "locrian",
      ],
      allEmptyModes: ["None", "Low", "High"],
      selectedEmptyMode: "None",
    };
    expect(result.selectedScale).toEqual(expectedResult.selectedScale);
    expect(result.selectedKey).toEqual(expectedResult.selectedKey);
    expect(result.selectedNumberOfNotes).toEqual(
      expectedResult.selectedNumberOfNotes,
    );
    expect(result.keys).toEqual(expectedResult.keys);
    expect(result.allNotes).toEqual(expectedResult.allNotes);
    expect(result.allScales).toEqual(expectedResult.allScales);
    expect(result.allEmptyModes).toEqual(expectedResult.allEmptyModes);
    expect(result.selectedEmptyMode).toEqual(expectedResult.selectedEmptyMode);
    expect(result.pattern.length).toBeGreaterThan(0);
  });
});
