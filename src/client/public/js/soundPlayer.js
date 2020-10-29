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
    this.ui.playButton.addEventListener("click", async () => {
      await this.play();
      this.ui.playButton.innerHTML = this.playing ? "Stop" : "Play";
    });
  }

  playNextNote() {
    const currentNote = this.state.mainMelody[this.state.currentItem];

    this.synth.triggerAttackRelease(
      currentNote.note,
      currentNote.duration,
      currentNote.time,
    );

    const nextNote = this.state.currentItem + 1;
    if (nextNote < this.state.mainMelody.length) {
      this.setStateCallback("currentItem", nextNote);
    } else {
      this.setStateCallback("currentItem", 0);
    }
  }

  async play() {
    await Tone.start();
    if (this.playing) {
      clearInterval(this.timer);
      this.playing = false;
      return this.playing;
    }
    this.playNextNote();
    const tempo = 60000 / this.state.tempo;
    this.timer = setInterval(this.playNextNote.bind(this), tempo); //applyToAllNotes gets executed from Window context, bind this so that we have to instance properties.
    this.playing = true;
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.playing) {
      clearInterval(this.timer);
      const tempo = 60000 / this.state.tempo;
      this.timer = setInterval(this.playNextNote.bind(this), tempo);
    }
  }
}

export { SoundPlayer };
