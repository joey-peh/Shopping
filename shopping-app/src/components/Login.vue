<template>
  <v-card style="width: 100%">
    <v-card-title>{{ loginOrRegister }}</v-card-title>
    <span color="red"> {{ errorMsg }}</span>
    <v-card-text>
      <v-text-field v-model="username" label="Username"></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn @click="loginOrRegisterBtn">{{ loginOrRegister }}</v-btn>
      <v-btn v-if="!isSignIn" @click="isSignIn = true">Cancel</v-btn>
      <br />
      <span v-if="isSignIn"
        >No account?
        <v-btn text @click="isSignIn = false"
          >Register an account here!</v-btn
        ></span
      >
    </v-card-text>
  </v-card>
</template>
<script>
import userFile from "@/assets/txt/user.json";
export default {
  props: {},
  data: () => ({
    isSignIn: true,
    username: null,
    password: null,
    userList: [],
    errorMsg: null,
  }),
  created() {
    this.userList = userFile;
  },
  methods: {
    retrieveUser() {
      var user = [];
      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].username == this.username) {
          user = this.userList[i];
          break;
        }
      }
      return user;
    },
    loginOrRegisterBtn() {
      //if successful login, preserve state in store
      //else prompt user to register
      this.errorMsg = null;
      let existingUser = this.retrieveUser();
      const isUserExist = existingUser.username != null;
      if (this.isSignIn) {
        if (isUserExist > 0) {
          this.$store.dispatch("setCurrentUser", existingUser);
          this.$router.push("Items");
        } else {
          this.errorMsg = "No such user exist! Register an account?";
        }
      } else {
        if (isUserExist) this.errorMsg = "Username exist!";
        else {
          this.userList.push({ username: this.username });
        }
      }
    },

    addUserIntoJSON() {
      const fs = require("fs");
      fs.writeFileSync(userFile, this.userList);
    },
  },
  computed: {
    loginOrRegister() {
      return this.isSignIn ? "Login" : "Register";
    },
  },
};
</script>
