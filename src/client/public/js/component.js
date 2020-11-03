export default class Component {
  _state = {};

  _ui = {};

  _setStateCallback = null;

  constructor({ state, ui, setStateCallback }) {
    this._setStateCallback = setStateCallback;
    this._ui = ui;
    this._state = state;
  }

  bindUI() {}

  stateChanged(state) {
    let updated = false;
    for (const key in state) {
      if (key in this._state) {
        if (this._state[key] !== state[key]) {
          this._state[key] = state[key];
          updated = true;
        }
      }
    }
    if (updated) {
      this._render();
    }
  }

  _render() {}
}
