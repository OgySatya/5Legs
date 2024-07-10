import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({
    users: useLocalStorage("users", {}),
  }),
  getters: {},
  actions: {
    addUser(user) {
      this.users = user;
    },
    logout() {
      this.users = null;
    },
  },
});

export default useUserStore;
