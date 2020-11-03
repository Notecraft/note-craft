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
      selectedEmptyMode,
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
    selectedEmptyMode: EmptyMode,
  ): string[] {
    let result = [];
    for (let item = 0; item < numberOfNotes; item++) {
      const element =
        withinRange[Math.floor(Math.random() * withinRange.length)];
      result.push(element);
    }

    if (selectedEmptyMode === EmptyMode.Low) {
      result.pop();
      result.push(" ");
      result = this.shuffle(result);
    }

    if (selectedEmptyMode === EmptyMode.High) {
      result.pop();
      result.pop();
      result.push(" ");
      result.push(" ");
      result = this.shuffle(result);
    }

    return result;
  }

  private shuffle(array: string[]): string[] {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}

export default ToneMelodyService;
