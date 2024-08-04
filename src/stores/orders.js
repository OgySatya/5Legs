import { service } from "@/utils/service";
import { defineStore } from "pinia";

const useOrderListStore = defineStore("OrderList", {
  state: () => ({
    allOrder : [],
    showOrder : []
  }),
  getters: {
  
  },
  actions: {
    async getData() {
      const response = await service().get("/order");
      this.allOrder = response.data;

    },
    async showData(id) {
      const response = await service().get(`order/${id}`);
      this.showOrder = response.data;
    },
    async ready(id) {
      await service().get(`/order/${id}/kitchen`);
    },
    async serve(id) {
      await service().get(`order/${id}/waiter`);
    },
    async bayar(id) {
      await service().get(`/order/${id}/payment`);;
    },
    async removeData(id) {
      await service().delete(`order/${id}`);
    }
  },
});

export default useOrderListStore;
