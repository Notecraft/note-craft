import "jest";
import { SoundPlayer } from "../../src/client/public/js/soundPlayer";

const triggerAttackRelease = jest.fn();

describe("Sound Player component", () => {
  const toneMock = {
    Synth: function () {
      return {
        toDestination: function () {
          return { triggerAttackRelease };
        },
      };
    },
  };

  let mainMelody = [
    {
      note: "A2",
      duration: "8n",
      noteObject: undefined,
    },
  ];
  let tempo = 0;
  let currentItem = 0;
  let setState = jest.fn();
  const initialState = {
    currentItem,
    tempo,
    mainMelody,
  };
  const soundPlayer = new SoundPlayer(toneMock, initialState, setState);

  it("should play the next note", () => {
    soundPlayer.playNextNote();

    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith("currentItem", currentItem);
    expect(triggerAttackRelease).toHaveBeenCalledWith("A2", "8n", undefined);
  });
});