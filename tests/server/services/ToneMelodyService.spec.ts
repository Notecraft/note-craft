import { Melody } from "../../../src/server/models/Melody";
import { EmptyMode, Settings } from "../../../src/server/models/Settings";
import ToneMelodyService from "../../../src/server/services/melody/ToneMelodyService";

describe("ToneMelodyService", () => {
  let service: ToneMelodyService;
  beforeAll(() => {
    service = new ToneMelodyService();
  });
  it("should build random pattern if none present", () => {
    const settings: Settings = {
      selectedEmptyMode: EmptyMode.None,
      selectedKey: "C",
      selectedNumberOfNotes: 8,
      selectedTempo: 240,
      selectedScale: "lydian",
      pattern: null,
    };

    const result = service.buildRandomResult(settings);

    const expectedResult: Melody = {
      pattern: ["B", "D", "B", "C", "G", "F#", "C", "G"],
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
    };
    expect(result.allNotes).toEqual(expectedResult.allNotes);
    expect(result.allScales).toEqual(expectedResult.allScales);
    expect(result.allEmptyModes).toEqual(expectedResult.allEmptyModes);
    expect(result.pattern.length).toBeGreaterThan(0);
    expect(result.pattern).not.toEqual(expectedResult.pattern);
  });

  it("should use given pattern if one is present", () => {
    const settings: Settings = {
      selectedEmptyMode: EmptyMode.None,
      selectedKey: "C",
      selectedNumberOfNotes: 8,
      selectedTempo: 240,
      selectedScale: "lydian",
      pattern: ["B", "D", "B", "C", "G", "F#", "C", "G"],
    };

    const result = service.buildRandomResult(settings);

    const expectedResult: Melody = {
      pattern: ["B", "D", "B", "C", "G", "F#", "C", "G"],
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
    };
    expect(result).toEqual(expectedResult);
  });

  it("should add blank notes in pattern but not in allNotes returned", () => {
    const settings: Settings = {
      selectedEmptyMode: EmptyMode.High,
      selectedKey: "C",
      selectedNumberOfNotes: 8,
      selectedTempo: 240,
      selectedScale: "lydian",
      pattern: null,
    };

    const result = service.buildRandomResult(settings);

    expect(result.pattern).toContain(" ");
    expect(result.allNotes).not.toContain(" ");
  });
});
