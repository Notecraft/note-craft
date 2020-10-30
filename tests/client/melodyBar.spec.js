import MelodyBar from "../../src/client/public/js/melodyBar";

describe("Melody bar component", () => {
  const pattern = ["A", "B", "C"];
  document.body.innerHTML = `<div class='note-container'>
            ${pattern
              .map((note) => "<div class='note-item'>" + note + "</div>")
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
      const playingElement = document.querySelector(".playing");
      expect(playingElement.innerHTML).toEqual(note);
    });
  });
});
