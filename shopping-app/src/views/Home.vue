<template>
  <v-row>
    <v-col>
      <v-data-table
        :items="products"
        :items-per-page="-1"
        style="overflow-x: none; overflow-y: none"
        :hide-default-footer="true"
      >
        <template v-slot:top>
          <v-text-field label="Search Product"></v-text-field>
        </template>
        <template v-slot:body="{ items }">
          <v-row>
            <v-col cols="4" v-for="item in items" :key="item.title">
              <v-card
                height="100%"
                class="d-flex align-center justify-center pa-5"
              >
                <v-container>
                  <img :src="item.image" width="100px" />
                  <v-list-item-title class="text-h5 mb-1">
                    {{ item.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-h6"
                    >${{ item.price }}</v-list-item-subtitle
                  >
                  <p>{{ item.description }}</p>
                  <v-card-actions class="justify-center"
                    ><v-btn
                      text
                      color="deep-purple accent-4"
                      @click="addToCart(item)"
                      >Add to Cart</v-btn
                    ></v-card-actions
                  >
                </v-container>
              </v-card></v-col
            >
          </v-row>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  data: () => ({
    headers: [
      { text: "Title", value: "title" },
      { text: "Price", value: "price" },
      { text: "Description", value: "description" },
      { text: "Image", value: "image" },
      { text: "Rating", value: "rating.rate" },
      { text: "Stocks", value: "rating.count" },
    ],
    products: [],
  }),
  created() {
    this.getAllProducts().then((res) => (this.products = res.data));
  },
  methods: {
    addToCart(item) {
      this.$store.dispatch("addToCart", item);
    },
    getAllProducts() {
      return new Promise((resolve, reject) => {
        axios
          .get("https://fakestoreapi.com/products/")
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
  },
  components: {
    // HelloWorld,
  },
};
</script>
