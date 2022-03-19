<template>
  <v-row>
    <v-col>
      <div class="text-center" v-if="!products.length">
        <v-progress-circular
          :size="100"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div v-else>
        <h4 class="justify-left">Showing all categories</h4>
        <v-data-table
          :items="products"
          :items-per-page="-1"
          :hide-default-footer="true"
        >
          <!-- <template v-slot:top>
          <v-text-field label="Search Product"></v-text-field>
        </template> -->
          <template v-slot:body="{ items }">
            <v-container>
              <v-row>
                <v-col cols="4" v-for="item in items" :key="item.title">
                  <v-card
                    height="100%"
                    class="d-flex align-center justify-center pa-5"
                  >
                    <v-container>
                      <img :src="item.image" height="100px" />
                      <v-card-title
                        style="
                          word-break: break-word;
                          text-align: center;
                          justify-content: center;
                        "
                      >
                        <h3>
                          {{ item.title }}
                          <v-tooltip bottom max-width="20vw">
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon
                                small
                                color="black"
                                dark
                                v-bind="attrs"
                                v-on="on"
                              >
                                mdi-information
                              </v-icon>
                            </template>
                            <span>{{ item.description }}</span>
                          </v-tooltip>
                        </h3>
                        <h4>{{ item.price }}</h4>
                      </v-card-title>
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
            </v-container>
          </template>
        </v-data-table>
      </div>
      <v-snackbar
        v-model="addedToCartAlert"
        color="success"
        style="font-weight: 500"
      >
        Added "{{ selectedProducts }} to cart"
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="addedToCartAlert = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
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
    addedToCartAlert: false,
    selectedProducts: "",
  }),
  created() {
    this.getAllProducts().then((res) => (this.products = res.data));
  },
  methods: {
    addToCart(item) {
      this.selectedProducts = item.title;
      this.$store.dispatch("addToCart", item);
      this.addedToCartAlert = true;
      setTimeout(() => {
        this.addedToCartAlert = false;
      }, 3000);
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
