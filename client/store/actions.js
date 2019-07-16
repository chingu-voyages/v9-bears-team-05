export default {
  initAuth(context) {
    if (!context.getters.isAuthenticated) {
      return this.$axios.$get('auth/yahallo', { withCredentials: true })
    }
    return Promise.resolve()
  },
  fetchUserData(context) {
    this.$axios.$get('/users', { withCredentials: true }).then(res => {
      if (res.error === false) {
        context.commit('SET_USER_DATA', res.payload)
      }
    })
  },
  fetchClosets(context) {
    this.$axios
      .$get('/closets', { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          const closets = res.payload.closets.filter(
            closet => !closet.parent_closet
          )

          res.payload.closets.forEach(closet => {
            if (closet.parent_closet) {
              const parentCloset = closets.find(
                clos => clos.closet_id === closet.parent_closet
              )
              if (!(parentCloset.children instanceof Array)) {
                parentCloset.children = []
              }
              parentCloset.children.push(closet)
            }
          })

          context.commit('SET_CLOSETS', closets)
        }
      })
      .catch(() => {})
  },
  createCloset(context, payload) {
    this.$axios
      .$post('/closets', payload, { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchClosets')
        }
      })
  },
  editCloset(context, payload) {
    this.$axios
      .$patch(
        `/closets/${payload.id}`,
        { name: payload.name },
        { withCredentials: true }
      )
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchClosets')
        }
      })
  },
  deleteCloset(context, id) {
    this.$axios
      .$delete(`/closets/${id}`, { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchClosets')
        }
      })
  },
  fetchCollections(context) {
    this.$axios
      .$get('/collections', { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          context.commit('SET_COLLECTIONS', res.payload.collections)
        }
      })
      .catch(() => {})
  },
  createCollection(context, name) {
    this.$axios
      .$post('/collections', { name }, { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchCollections')
        }
      })
  },
  editCollection(context, payload) {
    this.$axios
      .$patch(
        `/collections/${payload.id}`,
        { name: payload.name },
        { withCredentials: true }
      )
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchCollections')
        }
      })
  },
  deleteCollection(context, id) {
    this.$axios
      .$delete(`/collections/${id}`, { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchCollections')
        }
      })
  },
  fetchClothes(context) {
    this.$axios
      .$get('/clothes', { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          context.commit('SET_CLOTHES', res.payload.clothes)
        }
      })
      .catch(() => {})
  },
  async createCloth(context, { name, imageFile }) {
    const uploadConfig = await this.$axios.$get('/upload', {
      withCredentials: true
    })
    await this.$axios.$put(uploadConfig.payload.url, imageFile, {
      headers: {
        'Content-Type': imageFile.type
      }
    })
    this.$axios
      .$post(
        '/clothes',
        { name, imageUrl: uploadConfig.payload.key },
        { withCredentials: true }
      )
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchClothes')
        }
      })
  },
  editCloth(context, payload) {
    this.$axios
      .$patch(
        `/clothes/${payload.id}`,
        { name: payload.name },
        { withCredentials: true }
      )
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchClothes')
        }
      })
  },
  deleteCloth(context, id) {
    this.$axios
      .$delete(`/clothes/${id}`, { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchClothes')
        }
      })
  },
  fetchLooks(context) {
    this.$axios
      .$get('/looks', { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          context.commit('SET_LOOKS', res.payload.looks)
        }
      })
      .catch(() => {})
  },
  async createLook(context, { name, imageFile }) {
    const uploadConfig = await this.$axios.$get('/upload', {
      withCredentials: true
    })
    const imageBuf = Buffer.from(
      imageFile.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    )
    await this.$axios.$put(uploadConfig.payload.url, imageBuf, {
      headers: {
        'Content-Type': 'image/png'
      }
    })
    this.$axios
      .$post(
        '/looks',
        { name, imageUrl: uploadConfig.payload.key },
        { withCredentials: true }
      )
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchLooks')
        }
      })
  },
  async editLook(context, payload) {
    const uploadConfig = await this.$axios.$get('/upload', {
      withCredentials: true
    })
    const imageBuf = Buffer.from(
      payload.imageFile.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    )
    await this.$axios.$put(uploadConfig.payload.url, imageBuf, {
      headers: {
        'Content-Type': 'image/png'
      }
    })
    this.$axios
      .$patch(
        `/looks/${payload.id}`,
        { name: payload.name, imageUrl: uploadConfig.payload.key },
        { withCredentials: true }
      )
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchLooks')
        }
      })
  },
  deleteLook(context, id) {
    this.$axios.$delete(`/looks/${id}`, { withCredentials: true }).then(res => {
      if (res.error === false) {
        context.dispatch('fetchLooks')
      }
    })
  },
  logout() {
    return this.$axios.$get('auth/logout', { withCredentials: true })
  }
}
