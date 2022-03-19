<template>
  <v-row>
    <v-col>
      <v-data-table :items="getAllCartItems" :headers="headers"> </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    headers: [
      { text: "Title", value: "title" },
      { text: "Price", value: "price" },
      { text: "Quantity", value: "qty" },
    ],
  }),
  computed: {
    getAllCartItems() {
      let cartItems = this.$store.getters.cartItems;
      console.log(cartItems);
      return cartItems;
    },
  },
};
</script>
