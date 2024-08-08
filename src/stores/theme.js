import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: useLocalStorage("theme", "fantasy"),
  }),
  getters: {},
  actions: {
    changeQ(name) {
      this.theme = name;
    },
    changeDark(name) {
      this.theme = name;
    },
  },
});

export default useThemeStore;
