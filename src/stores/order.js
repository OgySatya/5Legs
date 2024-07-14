import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

const useOrderStore = defineStore("order", {
  state: () => ({
    products: useLocalStorage("order", []),
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
    proses() {
      let itemsId = [];
      this.products.forEach((element, index) => {
        // itemsId.push(element[index].id);
        // console.log(`a[${index}] = ${element.id}`);
        console.log(([index] = element.id));
      });
      console.log(itemsId);
    },
  },
});

export default useOrderStore;
