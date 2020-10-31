import Component from "./component";

class SoundPlayer extends Component {
  constructor(Tone, initialState, setStateCallback) {
    super({
      state: {
        tempo: initialState.tempo,
        currentItem: initialState.currentItem,
        mainMelody: initialState.mainMelody,
      },
      ui: {
        playButton: document.getElementById("play-button"),
      },
      setStateCallback,
    });
    this.timer = 0;
    this.playing = false;
    this.synth = new Tone.Synth({
      oscillator: {
        count: 4,
      },
    }).toDestination();
  }

  bindUI() {
    this._ui.playButton.addEventListener("click", async () => {
      await this.play();
      this._ui.playButton.innerHTML = this.playing ? "Stop" : "Play";
    });
  }

  playNextNote() {
    let nextNote =
      (this._state.currentItem + 1) % this._state.mainMelody.length;
    const note = this._state.mainMelody[nextNote];

    this.synth.triggerAttackRelease(note.note, note.duration, note.time);

    this._setStateCallback("currentItem", nextNote);
  }

  async play() {
    await Tone.start();
    if (this.playing) {
      clearInterval(this.timer);
      this.playing = false;
      return this.playing;
    }
    this.playNextNote();
    const tempo = 60000 / this._state.tempo;
    this.timer = setInterval(this.playNextNote.bind(this), tempo); //applyToAllNotes gets executed from Window context, bind this so that we have to instance properties.
    this.playing = true;
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.playing) {
      clearInterval(this.timer);
      const tempo = 60000 / this._state.tempo;
      this.timer = setInterval(this.playNextNote.bind(this), tempo);
    }
  }
}

export { SoundPlayer };
