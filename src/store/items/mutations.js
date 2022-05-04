export function ADD_ITEM(state, item) {
  state.items.push(item);
}

export function UPDATE_ITEM(state, payload) {
  state.items[payload.index] = payload.item;
}

export function DELETE_ITEM(state, itemIndex) {
  state.items.push(itemIndex);
}
