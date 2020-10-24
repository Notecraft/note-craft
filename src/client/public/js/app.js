/* eslint-disable no-undef */
import {
    setUrl,
    createSharableUrl,
    removeUrlParameter,
    copyStringToClipboard,
} from "./utils.js";
import { SoundPlayer } from "./soundPlayer.js";

/**
 * The melody player app.
 * 
 * This class is the main melody player app that is on the home page, 
 * it binds to the UI and handles the soundPlayer to play strings of notes.
 */
class App {
    /**
     * The state of the app.
     * 
     * @access private
     * @type {*}
     * @property {number} currentItem The currently playing musical note index.
     * @property {string} tempo The tempo that the melody should be playing at.
     * @property {array} mainMelody The list of notes that make up the melody currently playing.
     */
    state = {
        currentItem: 0,
        tempo: "240",
        mainMelody: [],
    };

    /**
     * The elements of the Html that comprise this app.
     * 
     * @access private
     * @type {*}
     * @property {element} playButton The button to start playing the melody.
     * @property {element} shareButton The button to generate the share 
     * @property {element} refreshButton The button to get new notes.
     * @property {element} tempoSlide The range slider to change tempo.
     * @property {element} tempoTextbox The adjustable text box to change tempo.
     * @property {element} selectedNumberOfNotes The dropdown to select number of notes.
     * @property {element} selectedEmptyNotes The dropdown to select None, Low, High of empty notes.
     * @property {element} selectedKey The dropdown for selecting which musical key to use.
     * @property {element} selectedScale The dropdown for selecting which musical scale to use.
     * @property {element} currentPattern The widgets indicating the current note pattern and current note.
     * @property {element} sharePanel The panel that pops up to display the share url.
     */
    ui = {
        playButton: document.getElementById("play-button"),
        shareButton: document.getElementById("note-share-button"),
        refreshButton: document.getElementById("refresh-button"),
        tempoSlider: document.getElementById("tempo-range"),
        tempoTextbox: document.getElementById("tempo-text"),
        selectedNumberOfNotes: document.getElementById("notes"),
        selectedEmptyNotes: document.getElementById("empty-notes"),
        selectedKey: document.getElementById("key"),
        selectedScale: document.getElementById("scale"),
        noteObjects: document.querySelectorAll(".note-item"),
        currentPattern: document.getElementById("current-pattern").innerText,
        sharePanel: document.getElementById("share-url"),
    };

    /**
     * The sound player instance.
     * 
     * Plays a given list of notes at a given tempo.
     * @access private
     * 
     * @type {SoundPlayer}
     */
    soundPlayer = undefined;

    /**
     * App constructor 
     * 
     * @constructs App
     * 
     * @param {*} settings A list of settings for setting the initial state of the App.
     */
    constructor(settings) {
        /*Init soundPlayer component with notes from server hydrated view */
        this.ui.noteObjects.forEach((element) => {
            this.state.mainMelody.push({
                note: element.innerHTML + "2",
                duration: "8n",
                noteObject: element,
            });
        });
        this.soundPlayer = new SoundPlayer(Tone, this.state.mainMelody, this.state.tempo, this.setState.bind(this))
        this.init(settings);
    }

    /**
     * Initialise app. 
     * 
     * This method initialises the apps state and applies event handlers to the various ui elements.
     * 
     * @access private
     * 
     * @param {*} settings A list of settings for setting the initial state of the App.
     */
    init(settings) {
        this.setInitialState();
        this.bindUI();
        this.setInitialUI();

    };

    /**
     * Sets the Apps initial state from settings and storage.
     * 
     * @access private
     * 
     * @param {*} settings A list of settings for setting the initial state of the App.
     */
    setInitialState(settings) {
        this.state.tempo = window.localStorage.getItem("tempo");
        if (settings) {
            this.state.currentItem = settings.currentItem;
            this.state.tempo = settings.tempo;
        }
    };

    /**
     * Set the inital ui values
     * 
     * @access private
     */
    setInitialUI() {
        /* Set initial UI values */
        this.ui.tempoSlider.value = this.state.tempo;
        this.ui.tempoTextbox.value = this.state.tempo;
    };

    /**
     * Bind event handlers to UI
     * 
     * @acess private
     */
    bindUI() {
        /*Bind UI event handlers */
        this.ui.playButton.addEventListener("click", async () => {
            const playing = await this.soundPlayer.play();
            this.ui.playButton.innerHTML = playing ? "Stop" : "Play";
        });

        this.ui.refreshButton.addEventListener("click", async () => {
            document.location = removeUrlParameter(document.location + "", "pattern");
        });

        this.ui.shareButton.addEventListener("click", async () => this.generateSharableUrl());

        this.ui.tempoSlider.onchange = this.tempoOnChange.bind(this);
        this.ui.tempoTextbox.onchange = this.tempoOnChange.bind(this);
        this.ui.tempoTextbox.onkeypress = this.tempoOnChange.bind(this);
        this.ui.tempoTextbox.onpaste = this.tempoOnChange.bind(this);
        this.ui.tempoTextbox.oninput = this.tempoOnChange.bind(this);

        this.ui.selectedNumberOfNotes.onchange = this.setUrlQueryParam("notes").bind(this);
        this.ui.selectedEmptyNotes.onchange = this.setUrlQueryParam("empty").bind(this);
        this.ui.selectedKey.onchange = this.setUrlQueryParam("key").bind(this);
        this.ui.selectedScale.onchange = this.setUrlQueryParam("scale").bind(this);
    }

    /**
     * Generates the URL string with query parameters for the current app state.
     * 
     * @access private
     */
    generateSharableUrl() {
        function shareParameter(name, value) {
            this.name = name;
            this.value = value;
        }

        const shareParameterArray = new Set();
        shareParameterArray.add(new shareParameter("key", this.ui.selectedKey.value));
        shareParameterArray.add(new shareParameter("scale", this.ui.selectedScale.value));

        shareParameterArray.add(
            new shareParameter("notes", this.ui.selectedNumberOfNotes.value),
        );
        shareParameterArray.add(
            new shareParameter("empty", this.ui.selectedEmptyNotes.value),
        );
        shareParameterArray.add(new shareParameter("tempo", this.ui.tempoSlider.value));
        shareParameterArray.add(new shareParameter("pattern", this.ui.currentPattern));

        const shareableUrl = createSharableUrl(shareParameterArray);
        this.ui.sharePanel.innerText = shareableUrl;

        const copiedNotification = document.createElement("div");
        const copiedTextElement = document.createTextNode(
            "Copied to your clipboard!",
        );
        copiedNotification.appendChild(copiedTextElement);
        this.ui.sharePanel.append(copiedNotification);

        copyStringToClipboard(shareableUrl);
        console.log("shareableUrl", shareableUrl);
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
        this.setState("tempo", tempo);
    };

    /**
     * Update the URL with a query parameter key.
     * 
     * Returns a function that is used to determine query param value from
     * a UI sender target that this function is bound to.
     * 
     * @access private
     * 
     * @param {*} key The key for the query param.
     * 
     * @returns function that sets URL params using given key and sender value.
     */
    setUrlQueryParam(key) {
        return function (sender) {
            setUrl(key, sender.target);
        }
    };

    /**
     * Change the value of the state of the app, causes a UI update. 
     * 
     * @access public 
     * 
     * @param {*} name The name of the state key to change.
     * @param {*} value The new value to change the state to.
     */
    setState(name, value) {
        const oldState = Object.assign({
        }, this.state); //Used to determine UI update
        this.state[name] = value;
        this.stateChanged(this.state, oldState);
    };

    /**
     * Notifies various components that the state has changed and re-renders UI.
     * 
     * @access private
     * 
     * @param {*} newState The state with the new changes.
     * @param {*} oldState The previous state with no new changes.
     */
    stateChanged(newState, oldState) {
        this.soundPlayer.stateChanged(newState);

        this.render(newState, oldState);
    };

    /**
     * Update the UI elements that need updating.
     * 
     * @access private
     * 
     * @param {*} newState The state with the new changes.
     * @param {*} oldState The previous state with no new changes.
     */
    render(newState, oldState) {
        if (newState.currentItem !== oldState.currentItem) {
            this.ui.noteObjects[this.ui.noteObjects.length - 1].classList.remove("playing");
            this.ui.noteObjects[newState.currentItem].classList.add("playing");
            if (newState.currentItem > 0) {
                this.ui.noteObjects[newState.currentItem - 1].classList.remove("playing");
            }
        }
        if (newState.tempo !== oldState.tempo) {
            this.ui.tempoSlider.value = newState.tempo;
            this.ui.tempoTextbox.value = newState.tempo;
        }
    };
}

export default App;