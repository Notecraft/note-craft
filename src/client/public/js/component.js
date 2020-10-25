/**
 * A Component that handles it's own state and rendering
 */
export default class Component {
  /**
   * The state of the component, used to determine a rerender.
   * 
   * @access private
   */
  state = {};

  /**
   * A list of elements that are on the page associated with this component
   * 
   * @access private
   */
  ui = {};

  /**
   * The App setState callback to change the state and notify other components.
   * 
   * @access private
   */
  setStateCallback = null;

  /**
   * @constructor
   * @constructs Component
   * 
   * @param {*} state The initial state of this component 
   */
  constructor({ state, ui, setStateCallback }) {
    this.setStateCallback = setStateCallback;
    this.ui = ui;
    this.state = state;
  }

  /**
   * Overwrite this method to bind event handlers to ui elements
   * 
   * @access public
   */
  bindUI() { }

  /**
   * Call this to notify this component when the state of the App updates.
   *
   * @access public
   *
   * @param {*} state The new App state
   */
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

  /**
   * This method causes the custom render to be called.
   * 
   * @param {*} shouldRerender Determines if a rerender should occur.
   */
  rerender(shouldRerender) {
    if (shouldRerender) {
      this.render();
    }
  }

  /**
   * Overwrite this method to add custom ui element changes.
   * 
   * @access public
   */
  render() { }
}
