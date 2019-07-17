export default {
  SET_AUTHENTICATED(state, payload) {
    state.isAuthenticated = payload
  },
  SET_USER_DATA(state, payload) {
    state.user = payload.user
    state.closetsCount = payload.closets_count
    state.collectionsCount = payload.collections_count
    state.looksCount = payload.looks_count
    state.clothesCount = payload.clothes_count
  },
  SET_CLOSETS(state, payload) {
    state.closets = payload
  },
  SET_COLLECTIONS(state, payload) {
    state.collections = payload
  },
  SET_CLOTHES(state, payload) {
    state.clothes = payload
  },
  SET_LOOKS(state, payload) {
    state.looks = payload
  },
  SET_RELATIONAL_LOOKS(state, payload) {
    const temp = [...state.relationalLooks]
    temp[payload.collectionId] = payload.looks
    state.relationalLooks = [...temp]
  },
  SET_RELATIONAL_CLOTHES(state, payload) {
    const temp = [...state.relationalClothes]
    temp[payload.closetId] = payload.clothes
    state.relationalClothes = [...temp]
  }
}
