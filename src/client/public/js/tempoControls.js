import Component from "./component";

export default class TempoControls extends Component {
  constructor(initialState, setStateCallback) {
    super({
      state: {
        tempo: initialState.tempo,
      },
      ui: {
        tempoSlider: document.getElementById("tempo-range"),
        tempoTextbox: document.getElementById("tempo-text"),
      },
      setStateCallback,
    });

    this._ui.tempoSlider.value = this._state.tempo;
    this._ui.tempoTextbox.value = this._state.tempo;
  }

  bindUI() {
    this._ui.tempoSlider.onchange = this._tempoOnChange.bind(this);
    this._ui.tempoTextbox.onchange = this._tempoOnChange.bind(this);
    this._ui.tempoTextbox.onkeypress = this._tempoOnChange.bind(this);
    this._ui.tempoTextbox.onpaste = this._tempoOnChange.bind(this);
    this._ui.tempoTextbox.oninput = this._tempoOnChange.bind(this);
  }

  _tempoOnChange(event) {
    let tempo;
    if (event.target.id === "tempo-range") {
      tempo = this._ui.tempoSlider.value;
    }

    if (event.target.id === "tempo-text") {
      tempo = this._ui.tempoTextbox.value;
    }

    window.localStorage.setItem("tempo", tempo);
    this._setStateCallback("tempo", tempo);
  }

  _render() {
    this._ui.tempoSlider.value = this._state.tempo;
    this._ui.tempoTextbox.value = this._state.tempo;
  }
}
