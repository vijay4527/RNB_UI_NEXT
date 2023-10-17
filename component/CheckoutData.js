import { create } from "zustand";

export const useProductStore = create((set) => ({
  selectedProduct: [],
  addSelectedProduct: (product) =>
    set((state) => ({
      selectedProduct: [...state.selectedProduct, product],
    })),

  removeSelectedProduct: (productId) =>
    set((state) => ({
      selectedProduct: state.selectedProduct.filter(
        (product) => product.cp_id !== productId
      ),
    })),
}));
