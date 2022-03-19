import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        _cartItems: [],
        _user: [],
        _userList: [{ username: "user1" }, { username: "user2" }]
    },
    mutations: {
        UPDATE_CART(state, payload) {
            state._cartItems = payload
        },
        UPDATE_USER(state, payload) {
            state._user = payload
        },
        UPDATE_USERLIST(state, payload) {
            state._userList = payload;
        }
    },
    actions: {
        registerUser(context, payload) {
            const user = context.state._userList;
            user.push(payload);
            context.commit('UPDATE_USERLIST', user);
        },
        addToCart(context, payload) {
            const cart = context.state._cartItems;
            var found = false;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].id === payload.id) {
                    let count = cart[i].qty += 1;
                    payload.qty = count;
                    Vue.set(cart, i, payload);
                    found = true;
                }
            }
            if (!found) {
                payload.qty = 1;
                cart.push(payload);
            }
            console.log(cart);
            context.commit('UPDATE_CART', cart);
        },
        setCurrentUser(context, payload) {
            context.commit('UPDATE_USER', payload);
        }
    },
    getters: {
        cartItems: function (state) {
            return state._cartItems;
        },
        currentUser: function (state) {
            return state._user;
        },
        userList: function (state) {
            return state._userList;
        }
    },
    modules: {
    }
})
