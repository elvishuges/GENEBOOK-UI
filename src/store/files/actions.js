export function register_audio({ commit, dispatch }, payload) {
  commit("REGISTER_AUDIO", payload);
}

export function register_image({ commit, dispatch }, payload) {
  commit("REGISTER_IMAGE", payload);
}

export function clean_files({ commit, dispatch }, payload) {
  commit("CLEAN_FILES");
}
