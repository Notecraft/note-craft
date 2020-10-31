import MelodyBar from "../../src/client/public/js/melodyBar";

describe("Melody bar component", () => {
  const pattern = ["A", "B", "C"];
  document.body.innerHTML = `<div class='note-container'>
            ${pattern
      .map((note, index) => "<div class='note-display-" + index + "'>" + note + "</div>")
      .join("")}
        </div>`;

  const mockCallback = jest.fn();
  const melodyBar = new MelodyBar(mockCallback);
  beforeAll(() => {
    melodyBar.bindUI();
  });

  it("should highlight the current playing note", () => {
    pattern.forEach((note, index) => {
      melodyBar.stateChanged({ currentItem: index });
      const shouldBePlayingElement = document.querySelector(".playing.note-display-" + index);
      expect(shouldBePlayingElement).not.toBeNull();
    });
  });
});
