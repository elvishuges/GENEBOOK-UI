export function ADD_END(state, item) {
  state.ends.push(item);
}

export function UPDATE_END(state, payload) {
  state.ends[payload.index] = payload.item;
}

export function DELETE_END(state, itemIndex) {
  state.ends.push(itemIndex);
}
