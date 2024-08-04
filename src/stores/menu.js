import { service } from "@/utils/service";
import { defineStore } from "pinia";

const useMenuStore = defineStore("menu", {
  state: () => ({
    allMenu : [],
    editMenu : [],
  }),
  getters: {
    
  },
  actions: {
    async getData() {
      const response = await service().get("/item");
      this.allMenu = response.data;
    },
    async editData(id) {
      const response = await service().get(`/item/${id}/edit`)
      this.editMenu = response.data;
    },
    async removeData(id) {
      await service().delete(`/item/${id}`);
    }
  },
});

export default useMenuStore;