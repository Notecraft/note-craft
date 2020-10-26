import { Scale, Mode } from "@tonaljs/tonal";
import defaultValues from "../defaultValues";
import Settings from "../models/Settings";

class MelodyService {
  public buildRandomResult(settings: Settings) {
    const { scale, notes, key, pattern, empty } = settings;

    const selectedKey = key || defaultValues.key;
    const selectedScale = scale || defaultValues.scale;
    const allScales = Mode.names();
    const baseNotes = Scale.get(selectedKey + " " + selectedScale).notes;
    const selectedNumberOfNotes: number = notes || defaultValues.notes;
    const allEmptyModes = ["None", "Low", "High"];
    const selectedEmptyMode = empty || defaultValues.empty;

    if (selectedEmptyMode === "Low") {
      baseNotes.push(" ");
    }

    if (selectedEmptyMode === "High") {
      baseNotes.push(" ");
      baseNotes.push(" ");
    }

    let randomNotes: string[] = [];
    if (pattern) {
      randomNotes = pattern.split(",");
      console.log("Woah! You already have a pattern -> " + pattern);
    } else {
      randomNotes = this.getRandomNotes(selectedNumberOfNotes, baseNotes);
    }

    const result = {
      pattern: randomNotes,
      selectedScale,
      selectedKey,
      selectedNumberOfNotes,
      keys: defaultValues.keys,
      allNotes: baseNotes,
      allScales,
      allEmptyModes,
      selectedEmptyMode,
    };

    return result;
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

export default MelodyService;