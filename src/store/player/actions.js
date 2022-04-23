export function set_player({ commit, dispatch }, payload) {
  commit("SET_PLAYER", { ...payload });
}
