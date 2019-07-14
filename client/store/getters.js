export default {
  isAuthenticated(state) {
    return state.isAuthenticated
  },
  getClosets(state) {
    return [...state.closets]
  }
}
