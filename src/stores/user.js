import { useLocalStorage } from "@vueuse/core";
import { service } from "@/utils/service";
import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({
    users: useLocalStorage("users", {}),
    isLoggedIn: useLocalStorage("isLoggedIn", false),
    allUsers: [],
    showUser : []
  }),
  getters: {},
  actions: {
    async login(param) {
      const response = await service().post("/auth/login", param)
      this.isLoggedIn = true;
      this.users = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role_id,
        token: response.data.token,
      };
    },
    async logout() {
      await service().get(`/auth/logout`);
      this.users = {};
      this.isLoggedIn = false;
    },
    async allData() {
      const response = await service().get(`/user`);
      this.allUsers = response.data;
    },
    async addData(param) {
      await service().post("/user", param)
    },
    async showData(id) {
      const response = await service().get(`/user/${id}`);
      this.showUser = response.data;
    },
    async updateData(id,param) {
      await service().post(`/user/${id}`,param);
    },
    async removeUser(id) {
      await service().delete(`/user/${id}`);
    }
  },
});

export default useUserStore;
