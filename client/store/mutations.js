export default {
  SET_AUTHENTICATED(state, payload) {
    state.isAuthenticated = payload
  },
  SET_CLOSETS(state, payload) {
    state.closets = payload
  }
}
