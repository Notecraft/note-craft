/* eslint-disable no-undef */
import {
  setUrl,
  createSharableUrl,
  removeUrlParameter,
  copyStringToClipboard,
} from "./utils.js";

/**
 * The melody player app.
 */
class App {
  /**
   * The state of the app.
   *
   * @access private
   */
  state = {};

  /**
   * The elements of the Html that comprise this app.
   *
   * @access private
   * @type {*}
   * @property {element} shareButton The button to generate the share
   * @property {element} refreshButton The button to get new notes.
   * @property {element} selectedNumberOfNotes The dropdown to select number of notes.
   * @property {element} selectedEmptyNotes The dropdown to select None, Low, High of empty notes.
   * @property {element} selectedKey The dropdown for selecting which musical key to use.
   * @property {element} selectedScale The dropdown for selecting which musical scale to use.
   * @property {element} currentPattern The widgets indicating the current note pattern and current note.
   * @property {element} sharePanel The panel that pops up to display the share url.
   * @property {element} tempoSlide The slider that controls the tempo
   */
  ui = {
    shareButton: document.getElementById("note-share-button"),
    refreshButton: document.getElementById("refresh-button"),
    selectedNumberOfNotes: document.getElementById("notes"),
    selectedEmptyNotes: document.getElementById("empty-notes"),
    selectedKey: document.getElementById("key"),
    selectedScale: document.getElementById("scale"),
    currentPattern: document.getElementById("current-pattern").innerText,
    sharePanel: document.getElementById("share-url"),
    tempoSlider: document.getElementById("tempo-range"),
  };

  /**
   * A list of child components that will be updated on state change
   * 
   * @type {Component[]}
   */
  components = [];

  /**
   * App constructor
   *
   * @constructor
   * @constructs App
   */
  constructor() { }

  /**
   * Add a component to the list of child components
   * 
   * @param {Component} component 
   */
  attachComponent(component) {
    this.components.push(component);
  }

  /**
   * Initialise app.
   *
   * This method initialises the apps state and applies event handlers to the various ui elements.
   *
   * @access public
   *
   * @param {*} initialState A list of settings for setting the initial state of the App.
   */
  init(initialState) {
    this.setInitialState(initialState);
    this.bindUI();
  }

  /**
   * Sets the Apps initial state from settings and storage.
   *
   * @access private
   *
   * @param {*} state A list of settings for setting the initial state of the App.
   */
  setInitialState(state) {
    if (state) {
      this.state = state;
    }
    this.stateChanged(this.state, {});
  }

  /**
   * Bind event handlers to UI
   *
   * @acess private
   */
  bindUI() {
    this.ui.refreshButton.addEventListener("click", async () => {
      document.location = removeUrlParameter(document.location + "", "pattern");
    });
    this.ui.shareButton.addEventListener("click", async () =>
      this.generateSharableUrl(),
    );
    this.ui.selectedNumberOfNotes.onchange = this.setUrlQueryParam(
      "notes",
    ).bind(this);
    this.ui.selectedEmptyNotes.onchange = this.setUrlQueryParam("empty").bind(
      this,
    );
    this.ui.selectedKey.onchange = this.setUrlQueryParam("key").bind(this);
    this.ui.selectedScale.onchange = this.setUrlQueryParam("scale").bind(this);

    this.components.forEach(component => {
      if (component.bindUI) {
        component.bindUI();
      }
    });
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
    shareParameterArray.add(
      new shareParameter("key", this.ui.selectedKey.value),
    );
    shareParameterArray.add(
      new shareParameter("scale", this.ui.selectedScale.value),
    );

    shareParameterArray.add(
      new shareParameter("notes", this.ui.selectedNumberOfNotes.value),
    );
    shareParameterArray.add(
      new shareParameter("empty", this.ui.selectedEmptyNotes.value),
    );
    shareParameterArray.add(
      new shareParameter("tempo", this.ui.tempoSlider.value),
    );
    shareParameterArray.add(
      new shareParameter("pattern", this.ui.currentPattern),
    );

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
    };
  }

  /**
   * Change the value of the state of the app, causes a UI update.
   *
   * @access public
   *
   * @param {*} name The name of the state key to change.
   * @param {*} value The new value to change the state to.
   */
  setState(name, value) {
    this.state[name] = value;
    this.stateChanged();
  }

  /**
   * Notifies various components that the state has changed and they should re-renders UI.
   *
   * @access private
   *
   */
  stateChanged() {
    this.components.forEach(component => {
      if (component.stateChanged) {
        component.stateChanged(this.state);
      }
    });
  }
}

export default App;
