import type {
  ComboApiType,
  ComboCategoryApiType,
  ComboCategoryType,
  ComboType,
} from 'src/@types/combos';
import type {ProductApiType, ProductType} from 'src/@types/product';
import COMBOS from 'src/data/combos';
import PRODUCTS from 'src/data/products';
import {transformProductApiToProduct} from '../products/productsApi';

const findProductInListById = (
  productList: ProductApiType[],
  productId: string,
): ProductType | undefined => {
  const product = productList.find((product) => product.id === productId);
  if (!product) return undefined;
  return transformProductApiToProduct(product);
};

const productById = (productId: string): ProductType => {
  let product: ProductType | undefined;
  PRODUCTS.forEach((category) => {
    const result = findProductInListById(category.items, productId);
    if (result) {
      product = result;
    }
  });
  if (!product) throw new Error('Product not found');
  return product;
};

const transformComboApiToCombo = (comboApi: ComboApiType): ComboType => {
  const comboDetail: ComboType = {
    id: comboApi.id,
    title: comboApi.title,
    img: comboApi.img,
    price: comboApi.price,
    mainProduct: productById(comboApi.mainProductId),
  };
  return comboDetail;
};

const findComboInListById = (
  comboList: ComboApiType[],
  comboId: string,
): ComboApiType | undefined => {
  return comboList.find((combo) => combo.id === comboId);
};

const comboById = (comboId: string): ComboType => {
  let combo;
  COMBOS.forEach((category) => {
    const result = findComboInListById(category.items, comboId);
    if (result) combo = result;
  });
  if (!combo) throw new Error('Combo not found');
  return transformComboApiToCombo(combo);
};

const transformComboCategoryApiToComboCategory = (
  comboCategory: ComboCategoryApiType,
): ComboCategoryType => {
  const items = comboCategory.items.map((combo) => transformComboApiToCombo(combo));
  const combo: ComboCategoryType = {
    id: comboCategory.id,
    category: comboCategory.category,
    items,
  };
  return combo;
};

const allCombos = (): ComboCategoryType[] => {
  return COMBOS.map((category) => transformComboCategoryApiToComboCategory(category));
};

const getAllCombosFromApi = async (): Promise<ComboCategoryType[]> => {
  return Promise.resolve(allCombos());
};

const getComboDetailByIdFromApi = async (comboId: string): Promise<ComboType> => {
  return new Promise((resolve, rejects) => {
    try {
      const combo = comboById(comboId);
      resolve(combo);
    } catch (ex: unknown) {
      rejects(ex);
    }
  });
};

export {getAllCombosFromApi, getComboDetailByIdFromApi};
