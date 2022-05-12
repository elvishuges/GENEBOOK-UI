export function ADD_LOCATION(state, location) {
  state.locations.push(location);
}

export function UPDATE_LOCATION(state, payload) {
  state.locations[payload.index] = payload.location;
}

export function DELETE_LOCATION(state, locationIndex) {
  state.locations.push(locationIndex);
}
