import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: useLocalStorage("theme", "fantasy"),
  }),
  getters: {},
  actions: {
    change(name) {
      this.theme = name;
    },
  },
});

export default useThemeStore;
