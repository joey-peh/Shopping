<template>
  <v-row>
    <v-col>
      <v-data-table></v-data-table>
    </v-col>
  </v-row>
</template>
<script>
export default {
  computed: {
    getAllCartItems() {
      return this.$store.getters.cartItems;
    },
  },
};
</script>
