/**
 * This class plays notes.
 *
 * This class uses Tone js to play a sequence of notes at a given tempo and notify
 * via callback what the current playing note is.
 */
class SoundPlayer {
  /**
   * SoundPlayer constructor
   *
   * @constructs SoundPlayer
   *
   * @param {Tone} Tone The Tone js instance.
   * @param {array} mainMelody The list of notes that will be played in sequence.
   * @param {string} tempo The tempo to play the notes at.
   * @param {Function} setState The callback to change the App state.
   */
  constructor(Tone, mainMelody, tempo, setState) {
    this.currentItem = 0;
    this.timer = 0;
    this.tempo = tempo;
    this.mainMelody = mainMelody;
    this.playing = false;
    this.setState = setState;
    this.synth = new Tone.Synth({
      oscillator: {
        count: 4,
        // type: "fatsawtooth",
      },
    }).toDestination();
  }

  /**
   * Plays the sound for the next note.
   *
   * @access private
   */
  playNextNote() {
    const currentNote = this.mainMelody[this.currentItem];

    //play the sound for this item
    this.synth.triggerAttackRelease(
      currentNote.note,
      currentNote.duration,
      currentNote.time,
    );

    this.setState("currentItem", this.currentItem);

    this.currentItem++;

    if (this.currentItem === this.mainMelody.length) this.currentItem = 0;
  }

  /**
   * Start playing the notes in the mainMelody at the tempo.
   *
   * @access public
   */
  async play() {
    await Tone.start();
    if (this.playing) {
      clearInterval(this.timer);
      this.playing = false;
      return this.playing;
    }
    this.playNextNote();
    const tempo = 60000 / this.tempo;
    this.timer = setInterval(this.playNextNote.bind(this), tempo); //applyToAllNotes gets executed from Window context, bind this so that we have to instance properties.
    this.playing = true;
    return this.playing;
  }

  /**
   * Call this to notify this component when the state of the App updates.
   *
   * @access public
   *
   * @param {*} state The new App state
   */
  stateChanged(state) {
    if (state.tempo) {
      this.updateTempo(state.tempo);
    }
  }

  /**
   * Change the tempo.
   *
   * This method updates the tempo of the SoundPlayer and handles playing at new tempo.
   *
   * @acess public
   *
   * @param {*} tempo The new tempo to play at
   */
  updateTempo(tempo) {
    this.tempo = tempo;
    if (this.playing) {
      clearInterval(this.timer);
      const tempo = 60000 / this.tempo;
      this.timer = setInterval(this.playNextNote.bind(this), tempo);
    }
  }
}

export { SoundPlayer };
