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
    errorMsg: null,
  }),
  created() {
    // this.userList = userFile;
  },
  methods: {
    // saveFile() {
    //   const data = JSON.stringify(this.arr);
    //   const fs = require("fs");
    //   try {
    //     fs.writeFileSync("myfile.txt", data, "utf-8");
    //   } catch (e) {
    //     console.log(e);
    //     alert("Failed to save the file !");
    //   }
    // },
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

      //log in page
      if (this.isSignIn) {
        if (isUserExist > 0) {
          this.$store.dispatch("setCurrentUser", existingUser);
          this.$router.push("Items");
        } else {
          this.errorMsg = "No such user exist! Register an account?";
        }
      }

      //registration page
      else {
        if (isUserExist) this.errorMsg = "Username exist!";
        else {
          let newUser = { username: this.username };
          this.userList.push(newUser);
          this.$store.dispatch("registerUser", newUser);
          this.$store.dispatch("setCurrentUser", newUser);
          this.$router.push("Items");
          // this.saveFile();
        }
      }
    },

    addUserIntoJSON() {
      const fs = require("fs");
      fs.writeFileSync(userFile, this.userList);
    },
  },
  computed: {
    userList() {
      return this.$store.getters.userList;
    },
    loginOrRegister() {
      return this.isSignIn ? "Login" : "Register";
    },
  },
};
</script>
