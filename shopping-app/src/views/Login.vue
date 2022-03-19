<template>
  <v-row>
    <v-col>
      <Login />
    </v-col>
    <!-- <v-col>
      <v-data-table
        :headers="headers"
        :items="this.$store.getters.userList"
        :hide-default-footer="true"
      >
      </v-data-table>
    </v-col> -->
  </v-row>
</template>
<script>
import Login from "@/components/Login.vue";
export default {
  data: () => ({
    headers: [
      {
        text: "Username",
        value: "username",
      },
    ],
  }),
  methods: {},
  components: {
    Login,
  },
};
</script>
