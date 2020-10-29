/* eslint-disable no-undef */
import {
  setUrl,
  createSharableUrl,
  removeUrlParameter,
  copyStringToClipboard,
} from "./utils.js";

class App {
  state = {};

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

  components = [];

  constructor() {}

  attachComponent(component) {
    this.components.push(component);
  }

  init(initialState) {
    this.setInitialState(initialState);
    this.bindUI();
  }

  setInitialState(state) {
    if (state) {
      this.state = state;
    }
    this.stateChanged(this.state, {});
  }

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

    this.components.forEach((component) => {
      if (component.bindUI) {
        component.bindUI();
      }
    });
  }

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

  setUrlQueryParam(key) {
    return function (sender) {
      setUrl(key, sender.target);
    };
  }

  setState = (name, value) => {
    this.state[name] = value;
    this.stateChanged();
  };

  stateChanged() {
    this.components.forEach((component) => {
      if (component.stateChanged) {
        component.stateChanged(this.state);
      }
    });
  }
}

export default App;
