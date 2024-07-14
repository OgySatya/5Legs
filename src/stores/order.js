import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

const useOrderStore = defineStore('order', {
  state: () => ({
    products: useLocalStorage('order', []),
  }),
  getters: {
    totalPrice: (state) => (state.products.reduce((acc, product) =>
      acc = acc + (product.price * product.quantity)
    , 0)).toFixed(2),
    totalQuantity: (state) => (state.products.reduce((acc, product) =>
      acc = acc + product.quantity
    , 0))
  },
  actions: {
    add(selectedProduct, quantity = 1) {
      const productFoundIndex = this.products.findIndex(product => product.id === selectedProduct.id);
      if (productFoundIndex > -1) {
        this.products[productFoundIndex].quantity += quantity;
      } else {
        this.products.push({...selectedProduct, quantity});
      }
    },
    subtract(selectedProduct) {
      const productFoundIndex = this.products.findIndex(product => product.id === selectedProduct.id);
      if (productFoundIndex > -1 && this.products[productFoundIndex].quantity > 0) {
        this.products[productFoundIndex].quantity -= 1;
      }
      // if (this.products[productFoundIndex].quantity <= 0) {
      //   this.remove(selectedProduct.id);
      // }
    },
    remove(productId) {
      this.products = this.products.filter(product => product.id !== productId)
    },
  }
})

export default useOrderStore;