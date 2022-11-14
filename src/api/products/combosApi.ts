import type {ComboApiType, ComboCategoryType, ComboDetailType} from 'src/@types/combos';
import type {ProductType} from 'src/@types/product';
import COMBOS from 'src/data/combos';
import PRODUCTS from 'src/data/products';

const findProductInListById = (
  productList: ProductType[],
  productId: string,
): ProductType | undefined => {
  return productList.find((product) => product.id === productId);
};

const productById = (productId: string): ProductType => {
  let product;
  PRODUCTS.forEach((category) => {
    const result = findProductInListById(category.items, productId);
    if (result) product = result;
  });
  if (!product) throw new Error('Product not found');
  return product;
};

const transformComboApiToComboDetail = (comboApi: ComboApiType): ComboDetailType => {
  const comboDetail: ComboDetailType = {
    id: comboApi.id,
    title: comboApi.title,
    img: comboApi.img,
    price: comboApi.price,
    mainProduct: productById(comboApi.principalId),
  };
  return comboDetail;
};

const findComboInListById = (
  comboList: ComboApiType[],
  comboId: string,
): ComboApiType | undefined => {
  return comboList.find((combo) => combo.id === comboId);
};

const comboById = (comboId: string): ComboDetailType => {
  let combo;
  COMBOS.forEach((category) => {
    const result = findComboInListById(category.items, comboId);
    if (result) combo = result;
  });
  if (!combo) throw new Error('Combo not found');
  return transformComboApiToComboDetail(combo);
};

const getAllCombosFromApi = async (): Promise<ComboCategoryType[]> => {
  return Promise.resolve(COMBOS);
};

const getComboDetailByIdFromApi = async (comboId: string): Promise<ComboDetailType> => {
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
