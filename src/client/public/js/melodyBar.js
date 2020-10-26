import Component from "./component";

class MelodyBar extends Component {
  constructor(setStateCallback) {
    super({
      state: {
        currentItem: 0,
      },
      ui: {
        noteObjects: document.querySelectorAll(".note-item"),
      },
      setStateCallback,
    });
  }

  render() {
    this.ui.noteObjects[this.ui.noteObjects.length - 1].classList.remove(
      "playing",
    );
    this.ui.noteObjects[this.state.currentItem].classList.add("playing");
    if (this.state.currentItem > 0) {
      this.ui.noteObjects[this.state.currentItem - 1].classList.remove(
        "playing",
      );
    }
  }
}

export default MelodyBar;
