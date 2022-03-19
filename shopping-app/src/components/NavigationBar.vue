<template>
  <div>
    <v-app-bar color="deep-purple  accent-4" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Fake Store </v-toolbar-title>
      <v-spacer />
      <v-btn icon :to="'/cart'">
        <v-badge :content="getCartCount" :value="getCartCount" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"
            >Hello
            {{
              getCurrentUser.username ? getCurrentUser.username : "Stranger"
            }}!</v-list-item-title
          >
          <!-- <v-list-item-subtitle v-if="getCurrentUser.username != null">
            Welcome {{ getCurrentUser.username }}
          </v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item :to="'/'">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'/login'" v-if="getCurrentUser.username == null">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item :to="'/items'">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>View Products</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "NavigationBar",
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    getCartCount(newVal) {
      console.log("changed: " + newVal);
    },
  },
  computed: {
    getCartCount() {
      let sum = 0;
      this.$store.getters.cartItems.forEach((element) => {
        sum += element.qty;
      });
      return sum;
    },
    getCurrentUser() {
      let user = this.$store.getters.currentUser;
      return user;
    },
  },
};
</script>
