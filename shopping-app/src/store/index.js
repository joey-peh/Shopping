import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        _cartItems: []
    },
    mutations: {
        UPDATE_CART(state, payload) {
            state._cartItems = payload
        }
    },
    actions: {
        addToCart(context, payload) {
            const cart = context.state._cartItems;
            cart.push(payload);
            context.commit('UPDATE_CART', cart);
        }
    },
    getters: {
        cartItems: function (state) {
            return state._cartItems;
        }
    },
    modules: {
    }
})
