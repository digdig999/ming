export default {
  namespaced: true,
  state: {
    cartList:{}
  },
  getters: {
    getShopCart(state) {
      return state.cartList;
    },
    total({
      cartList
    }) {
      let res = {};
      Object.keys(cartList).forEach((el) => {
        if (!res[el]) {
          res[el] = 0;
        }
        cartList[el].forEach(o => {
          res[el] += o.num * o.price;
        })
        res[el] = res[el].toFixed(2);
      })
      return res;
    },
    detail({
      shopCart
    }) {
      let num = {};
      Object.keys(shopCart).forEach((el) => {
        if (!num[el]) {
          num[el] = 0;
        }
        shopCart[el].forEach(o => {
          num[el] += o.num;
        })
      })
      return num;
    },
    discount({
      shopCart
    }) {
      let mPrice = {};
      Object.keys(shopCart).forEach((el) => {
        if (!mPrice[el]) {
          mPrice[el] = 0;
        }
        shopCart[el].forEach(o => {
          mPrice[el] += ((o.price * 10 / o.skill) - o.price) * o.num;
        })
        mPrice[el] = mPrice[el].toFixed(2);
      })
      return mPrice;
    },
  },
  mutations: {
    empty(state, id) {
      state.shopCart[id].forEach((el) => {
        el.num = 0;
      })
      state.shopCart[id] = [];
    },
    reduce(state, {
      id,
      data
    }) {
      const index = state.shopCart[id].indexOf(data);
      state.shopCart[id][index].num -= 1;
      if (state.shopCart[id][index].num === 0) {
        state.shopCart[id].splice(index, 1);
      }
    },
    add(state, {
      id,
      data
    }) {
      const {
        _vm: vm
      } = this;
      if (!state.shopCart[id]) {
        vm.$set(state.shopCart, id, []);

      }

      const record = state.shopCart[id].find((el) => {
        return el.id === data.id;
      });

      if (record) {
        if (record.num < record.stock) {
          record.num += 1;
        }
      } else {
        vm.$set(data, 'num', 1);
        state.shopCart[id].push(data);
      }
    },
  },
  actions: {

    add({
      commit
    }, data) {
      commit('add', data);
    },
    reduce({
      commit
    }, data) {
      commit('reduce', data);
    },
    empty({
      commit
    }, data) {
      commit('empty', data);
    },
  }
}
