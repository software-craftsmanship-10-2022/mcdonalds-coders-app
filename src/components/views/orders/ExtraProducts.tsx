import React from 'react';
import type {ProductType} from 'src/@types/product.d';
import {IMG_PATH} from 'src/config';
import './Cart.css';

interface ExtraProductsProps {
  products: ProductType[];
}

export const ExtraProducts: React.FC<ExtraProductsProps> = ({products}) => {
  const hasProducts = (list: ProductType[]): boolean => list.length > 1;

  if (!hasProducts(products)) {
    return null;
  }

  return (
    <>
      {products.map((product: ProductType) => (
        <div className="item-products" key={product.id}>
          <img src={IMG_PATH + product.img} />
          <span>{product.title}</span>
        </div>
      ))}
    </>
  );
};
