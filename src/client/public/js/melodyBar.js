import Component from "./component";

class MelodyBar extends Component {
  constructor(setStateCallback) {
    super({
      state: {
        currentItem: -1,
      },
      ui: {
        noteObjects: document.querySelectorAll("[id='.note-display-']"),
      },
      setStateCallback,
    });
  }

  _render() {
    const lastPlaying = document.querySelector(".playing");
    if (lastPlaying) lastPlaying.classList.remove("playing");
    const nextPlaying = document.querySelector(".note-display-" + this._state.currentItem);
    if (nextPlaying) nextPlaying.classList.add("playing");
  }
}

export default MelodyBar;
