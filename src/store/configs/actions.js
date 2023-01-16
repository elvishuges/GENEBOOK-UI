export function set_configs({ commit, dispatch }, payload) {
  commit("SET_CONFIGS", { ...payload });
}

export function clean_configs({ commit, dispatch }, payload) {
  commit("CLEAN_CONFIGS", { ...payload });
}
