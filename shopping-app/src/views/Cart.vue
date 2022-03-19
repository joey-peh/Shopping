<template>
  <v-row>
    <v-col>
      <div v-if="getCartQty > 0" class="text-value-h1">
        You have {{ getCartQty }} items in cart!
      </div>
      <div v-else class="text-value-h1">There are no items in cart!</div>
      <v-data-table
        :items="getAllCartItems"
        :headers="headers"
        :items-per-page="-1"
        :hide-default-footer="true"
        v-if="getCartQty > 0"
      >
        <template v-slot:no-data> No items in cart </template>
      </v-data-table>
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
    getCartQty() {
      let sum = 0;
      this.getAllCartItems.forEach((element) => {
        sum += element.qty;
      });
      return sum;
    },
  },
};
</script>
