import { Scale, Mode } from "@tonaljs/tonal";
import { EmptyMode, Settings } from "../../models/Settings";
import { Melody } from "../../models/Melody";
import MelodyService from "./MelodyService";

class ToneMelodyService implements MelodyService {
  public buildRandomResult(settings: Settings): Melody {
    const {
      selectedEmptyMode,
      selectedKey,
      selectedNumberOfNotes,
      selectedScale,
      pattern,
    } = settings;

    const allEmptyModes = ["None", "Low", "High"];
    const allScales = Mode.names();
    const allNotes = Scale.get(selectedKey + " " + selectedScale).notes;

    if (selectedEmptyMode === EmptyMode.Low) {
      allNotes.push(" ");
    }

    if (selectedEmptyMode === EmptyMode.High) {
      allNotes.push(" ");
      allNotes.push(" ");
    }

    if (pattern) {
      console.log("Woah! You already have a pattern -> " + pattern);
      return {
        pattern,
        allNotes,
        allScales,
        allEmptyModes,
      };
    }

    const randomNotes: string[] = this.getRandomNotes(
      selectedNumberOfNotes,
      allNotes,
    );

    return {
      pattern: randomNotes,
      allNotes,
      allScales,
      allEmptyModes,
    };
  }

  private getRandomNotes(
    numberOfNotes: number,
    withinRange: string[] = [],
  ): any[] {
    let result = [];
    for (let item = 0; item < numberOfNotes; item++) {
      const element =
        withinRange[Math.floor(Math.random() * withinRange.length)];
      result.push(element);
    }

    return result;
  }
}

export default ToneMelodyService;
