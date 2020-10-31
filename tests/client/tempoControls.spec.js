import TempoControls from "../../src/client/public/js/tempoControls";

describe("Tempo controls component", () => {
  const tempo = 250;
  document.body.innerHTML = `<input id='tempo-text'/><input type='range' min='30' max='600' id='tempo-range' class='slider'/>`;

  const mockCallback = jest.fn();
  const tempoControls = new TempoControls({ tempo }, mockCallback);
  beforeAll(() => {
    tempoControls.bindUI();
  });

  it("should display the current tempo on the inputs", () => {
    const tempoInputBox = document.getElementById("tempo-text");
    const tempoRangeSlider = document.getElementById("tempo-range");
    expect(tempoInputBox.value).toEqual(tempo.toString());
    expect(tempoRangeSlider.value).toEqual(tempo.toString());
  });

  it("should update the tempo when the input is changed", () => {
    const newTempo = 300;
    const tempoInputBox = document.getElementById("tempo-text");

    tempoInputBox.value = newTempo;
    tempoInputBox.dispatchEvent(new KeyboardEvent("keypress", { key: "9" }));

    expect(mockCallback).toHaveBeenCalledWith("tempo", newTempo.toString());
  });
});
