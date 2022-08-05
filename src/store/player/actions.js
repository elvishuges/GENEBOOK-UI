export function set_player({ commit, dispatch }, payload) {
  commit("SET_PLAYER", { ...payload });
}

export function clean_player({ commit, dispatch }, payload) {
  commit("CLEAN_PLAYER", { ...payload });
}
