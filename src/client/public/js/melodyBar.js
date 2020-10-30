import Component from "./component";

class MelodyBar extends Component {
  constructor(setStateCallback) {
    super({
      state: {
        currentItem: -1,
      },
      ui: {
        noteObjects: document.querySelectorAll(".note-item"),
      },
      setStateCallback,
    });
  }

  _render() {
    console.log("render");
    this._ui.noteObjects[this._ui.noteObjects.length - 1].classList.remove(
      "playing",
    );
    this._ui.noteObjects[this._state.currentItem].classList.add("playing");
    if (this._state.currentItem > 0) {
      this._ui.noteObjects[this._state.currentItem - 1].classList.remove(
        "playing",
      );
    }
  }
}

export default MelodyBar;
