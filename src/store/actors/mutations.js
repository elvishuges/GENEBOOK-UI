export function CREATE_ACTOR(state, actor) {
  state.actors.push(actor);
}

export function CLEAN_ACTORS(state, actorIndex) {
  state.actors = [];
}

export function UPDATE_ACTOR(state, payload) {
  state.actors[payload.index] = payload.actor;
}
