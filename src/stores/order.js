import { defineStore } from "pinia";
import { service } from "@/utils/service";

const useOrderStore = defineStore("order", {
  state: () => ({
    products: [],
  }),
  getters: {
    totalPrice: (state) =>
      state.products.reduce(
        (acc, product) => (acc = acc + product.price * product.quantity),
        0
      ),
    totalQuantity: (state) =>
      state.products.reduce(
        (acc, product) => (acc = acc + product.quantity),
        0
      ),
  },
  actions: {
    add(selectedProduct, quantity = 1) {
      const productFoundIndex = this.products.findIndex(
        (product) => product.id === selectedProduct.id
      );
      if (productFoundIndex > -1) {
        this.products[productFoundIndex].quantity += quantity;
      } else {
        this.products.push({ ...selectedProduct, quantity });
      }
    },
    subtract(selectedProduct) {
      const productFoundIndex = this.products.findIndex(
        (product) => product.id === selectedProduct.id
      );
      if (
        productFoundIndex > -1 &&
        this.products[productFoundIndex].quantity > 0
      ) {
        this.products[productFoundIndex].quantity -= 1;
      }
      // if (this.products[productFoundIndex].quantity <= 0) {
      //   this.remove(selectedProduct.id);
      // }
    },
    remove(productId) {
      this.products = this.products.filter(
        (product) => product.id !== productId
      );
    },
    proses(name, table) {
      let itemsId = [];
      this.products.forEach((element) => {
        itemsId.push({ id: element.id, quantity: element.quantity });
      });
      const order = {
        costomer_name: name,
        table_number: table,
        items: itemsId,
      };
      service().post("/order", order);
      this.products = [];
    },
  },
});

export default useOrderStore;
