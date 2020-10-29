export default class Component {
  state = {};

  ui = {};

  setStateCallback = null;

  constructor({ state, ui, setStateCallback }) {
    this.setStateCallback = setStateCallback;
    this.ui = ui;
    this.state = state;
  }

  bindUI() {}

  stateChanged(state) {
    let updated = false;
    for (const key in state) {
      if (key in this.state) {
        if (this.state[key] !== state[key]) {
          this.state[key] = state[key];
          updated = true;
        }
      }
    }
    if (updated) {
      this.rerender(updated);
    }
  }

  rerender(shouldRerender) {
    if (shouldRerender) {
      this.render();
    }
  }

  render() {}
}
