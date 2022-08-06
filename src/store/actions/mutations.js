export function ADD_ACTION(state, action) {
  state.actions.push(action);
}

export function CLEAN_ACTIONS(state, action) {
  state.actions = [];
}
