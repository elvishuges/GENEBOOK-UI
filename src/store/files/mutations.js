export function REGISTER_AUDIO(state, video) {
  state.audios.push(video);
}

export function REGISTER_IMAGE(state, image) {
  state.images.push(image);
}

export function CLEAN_FILES(state, payload) {
  state.images = [];
  state.audios = [];
}
