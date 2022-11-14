import type {
  CategoryIds,
  ProductApiType,
  ProductCategoryApiType,
  ProductCategoryType,
  ProductType,
} from 'src/@types/product';
import INGREDIENTS from 'src/data/ingredients';
import PRODUCTS from 'src/data/products';

export const transformProductApiToProduct = (productApi: ProductApiType): ProductType => {
  const product: ProductType = {...productApi, ingredients: undefined};
  if (productApi.ingredients) {
    product.ingredients = productApi.ingredients.map(
      (ingredientId) => INGREDIENTS.find((ingredient) => ingredient.id === ingredientId)!,
    );
  }

  return product;
};

export const transformCategoryApiToCategory = (
  category: ProductCategoryApiType,
): ProductCategoryType => {
  const products: ProductType[] = [];

  category.items.forEach((product) => {
    products.push(transformProductApiToProduct(product));
  });
  return {...category, items: products};
};

export const transformCategoryApiListToCategoryList = (
  categories: ProductCategoryApiType[],
): ProductCategoryType[] => {
  const result: ProductCategoryType[] = [];

  categories.forEach((category) => {
    result.push(transformCategoryApiToCategory(category));
  });
  return result;
};

const getAllProductsFromApi = async (): Promise<ProductCategoryType[]> => {
  return Promise.resolve(transformCategoryApiListToCategoryList(PRODUCTS));
};

const getProductsByCategoryFromApi = async (
  categoryId: string | undefined,
): Promise<ProductCategoryType> => {
  return new Promise((resolve) => {
    const foundProductsByCategoryId = PRODUCTS.find(
      (productCategory) => productCategory.id === categoryId,
    );

    if (foundProductsByCategoryId) {
      resolve(transformCategoryApiToCategory(foundProductsByCategoryId));
    } else {
      resolve({
        category: '',
        id: 'burgers',
        items: [],
      });
    }
  });
};

const getMultipleProductsByCategoryFromApi = async (
  categoryIds: CategoryIds[],
): Promise<ProductCategoryType[]> => {
  return new Promise((resolve) => {
    const foundProductsByCategoryIds = PRODUCTS.filter((productCategory) =>
      categoryIds.includes(productCategory.id),
    );

    resolve(transformCategoryApiListToCategoryList(foundProductsByCategoryIds));
  });
};

export {getAllProductsFromApi, getMultipleProductsByCategoryFromApi, getProductsByCategoryFromApi};
