// import { create } from "zustand";

// const useProductStore = create((set) => ({
//   selectedCartProduct: loadFromLocalStorage() || [],
//   addSelectedProduct: (product) =>
//     set((state) => {
//       const updatedSelectedProducts = [...state.selectedCartProduct, product];
//       saveToLocalStorage(updatedSelectedProducts);
//       return { selectedCartProduct: updatedSelectedProducts };
//     }),

//   removeSelectedProduct: (productId) =>
//     set((state) => {
//       const updatedSelectedProducts = state.selectedCartProduct.filter(
//         (product) => product.cp_id !== productId
//       );
//       saveToLocalStorage(updatedSelectedProducts);
//       return { selectedCartProduct: updatedSelectedProducts };
//     }),
// }));

// function loadFromLocalStorage() {
//   const data = localStorage.getItem("selectedCartProduct");
//   return data ? JSON.parse(data) : [];
// }

// function saveToLocalStorage(data) {
//   localStorage.setItem("selectedCartProduct", JSON.stringify(data));
// }

// export default useProductStore;
