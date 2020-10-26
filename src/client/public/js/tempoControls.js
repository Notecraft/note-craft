import Component from "./component"

export default class TempoControls extends Component {

    constructor(initialState, setStateCallback) {
        super({
            state: {
                tempo: initialState.tempo
            },
            ui: {
                tempoSlider: document.getElementById("tempo-range"),
                tempoTextbox: document.getElementById("tempo-text"),
            },
            setStateCallback
        });

        this.ui.tempoSlider.value = this.state.tempo;
        this.ui.tempoTextbox.value = this.state.tempo;
    }

    bindUI() {
        this.ui.tempoSlider.onchange = this.tempoOnChange.bind(this);
        this.ui.tempoTextbox.onchange = this.tempoOnChange.bind(this);
        this.ui.tempoTextbox.onkeypress = this.tempoOnChange.bind(this);
        this.ui.tempoTextbox.onpaste = this.tempoOnChange.bind(this);
        this.ui.tempoTextbox.oninput = this.tempoOnChange.bind(this);
    }

    /**
     * Update the tempo state from a UI change.
     *
     * @access private
     *
     * @param {*} event The event from the UI.
     */
    tempoOnChange(event) {
        let tempo;
        if (event.target.id === "tempo-range") {
            tempo = this.ui.tempoSlider.value;
        }

        if (event.target.id === "tempo-text") {
            tempo = this.ui.tempoTextbox.value;
        }

        window.localStorage.setItem("tempo", tempo);
        this.setStateCallback("tempo", tempo);
    }

    render() {
        this.ui.tempoSlider.value = this.state.tempo;
        this.ui.tempoTextbox.value = this.state.tempo;
    }
}