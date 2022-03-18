import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        _cartItems: [],
        _user: []
    },
    mutations: {
        UPDATE_CART(state, payload) {
            state._cartItems = payload
        },
        UPDATE_USER(state, payload) {
            state._user = payload
        }
    },
    actions: {
        addToCart(context, payload) {
            const cart = context.state._cartItems;
            cart.push(payload);
            console.log(cart);
            context.commit('UPDATE_CART', cart);
        },
        setCurrentUser(context, payload) {
            context.commit('UPDATE_USER', payload);
        }
    },
    getters: {
        cartCount: function (state) {
            console.log("count: " + state._cartItems.length);
            return state._cartItems.length;
        },
        cartItems: function (state) {
            let data = state._cartItems;
            console.log(data);
            return data;
        },
        currentUser: function (state) {
            return state._user;
        }
    },
    modules: {
    }
})
