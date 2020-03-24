export default {
    namespaced:true,
  state: {
    shopGoods: [],
  },
  getters: {
    getShopGoods(state) {
      return state.shopGoods;
    }
  },
  mutations: {
    setShopGoods(state,data) {
      state.shopGoods = state.shopGoods.concat(data);
    },
    
  },
  actions: {}
}
