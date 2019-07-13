export default {
  initAuth(context) {
    if (!context.getters.isAuthenticated) {
      return this.$axios.$get('auth/yahallo', { withCredentials: true })
    }
    return Promise.resolve()
  },
  logout(context) {
    return this.$axios.$get('auth/logout', { withCredentials: true })
  }
}
