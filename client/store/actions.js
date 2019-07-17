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
          context.commit('SET_CLOSETS', res.payload.closets)
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
  fetchRelationalLooks(context, id) {
    this.$axios
      .$get(`/collections/${id}/looks`, { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          context.commit('SET_RELATIONAL_LOOKS', {
            looks: res.payload.looks,
            collectionId: id
          })
        }
      })
  },
  addRelationalLook(context, payload) {
    this.$axios
      .$post(
        `/collections/${payload.collectionId}/looks`,
        {
          lookIds: payload.lookIds
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchRelationalLooks', payload.collectionId)
        }
      })
      .catch(() => {
        context.dispatch('fetchRelationalLooks', payload.collectionId)
      })
  },
  removeRelationalLook(context, payload) {
    this.$axios
      .$delete(`/collections/${payload.collectionId}/looks/${payload.lookId}`, {
        withCredentials: true
      })
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchRelationalLooks', payload.collectionId)
        }
      })
  },
  fetchRelationalClothes(context, id) {
    this.$axios
      .$get(`/closets/${id}/clothes`, { withCredentials: true })
      .then(res => {
        if (res.error === false) {
          context.commit('SET_RELATIONAL_CLOTHES', {
            clothes: res.payload.clothes,
            closetId: id
          })
        }
      })
  },
  addRelationalCloth(context, payload) {
    this.$axios
      .$post(
        `/closets/${payload.closetId}/clothes`,
        {
          clothIds: payload.clothIds
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchRelationalClothes', payload.closetId)
        }
      })
      .catch(() => {
        context.dispatch('fetchRelationalClothes', payload.closetId)
      })
  },
  removeRelationalCloth(context, payload) {
    this.$axios
      .$delete(`/closets/${payload.closetId}/clothes/${payload.clothId}`, {
        withCredentials: true
      })
      .then(res => {
        if (res.error === false) {
          context.dispatch('fetchRelationalClothes', payload.closetId)
        }
      })
  },
  logout() {
    return this.$axios.$get('auth/logout', { withCredentials: true })
  }
}
