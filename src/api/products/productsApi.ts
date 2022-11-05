import PRODUCTS from "src/data/products";

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(PRODUCTS);
    }, 100);
  });
};

export { getAllProducts };

