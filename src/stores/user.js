import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({
    users: useLocalStorage("users", {}),
    isLoggedIn: useLocalStorage("isLoggedIn", false),
  }),
  getters: {},
  actions: {
    addUser(user) {
      this.isLoggedIn = true;
      this.users = user;
    },
    logout() {
      this.users = {};
      this.isLoggedIn = false;
    },
  },
});

export default useUserStore;
