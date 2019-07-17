export default {
  isAuthenticated(state) {
    return state.isAuthenticated
  },
  getClosets(state) {
    return [...state.closets]
  },
  getCollections(state) {
    return [...state.collections]
  },
  getClothes(state) {
    return [...state.clothes]
  },
  getLooks(state) {
    return [...state.looks]
  },
  getRelationalLooks(state) {
    return collectionId => {
      let looks = []
      if (state.relationalLooks[collectionId] instanceof Array)
        looks = [...state.relationalLooks[collectionId]]
      return looks
    }
  },
  getRelationalClothes(state) {
    return closetId => {
      let clothes = []
      if (state.relationalClothes[closetId] instanceof Array)
        clothes = [...state.relationalClothes[closetId]]
      return clothes
    }
  }
}
