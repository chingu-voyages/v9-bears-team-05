export default function(context) {
  context.store
    .dispatch('initAuth', context.req)
    .then(res => {
      if (res.error === false) context.store.commit('SET_AUTHENTICATED', 'test')
    })
    .catch(() => {
      context.store.commit('SET_AUTHENTICATED', 'test2')
      context.redirect('/auth')
    })
}
