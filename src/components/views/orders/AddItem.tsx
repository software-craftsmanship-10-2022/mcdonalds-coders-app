import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import type {ComboType} from 'src/@types/combos';
import type {MenuType, ProductType} from 'src/@types/product';
import ProductSelector from 'src/components/product-selector/ProductSelector';
import IngredientList from 'src/components/product/IngredientList/IngredientList';
import useCombos from 'src/hooks/useCombos';
import {useProducts} from 'src/hooks/useProducts';
import {IMG_PATH} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import useFormat from '../../../hooks/useFormat';
import McButton from '../../buttons/McButton';
import './AddItem.css';

const AddItem = () => {
  const {multipleProductsByCategory, getMultipleProductsByCategory} = useProducts();
  const {getComboById} = useCombos();
  const {id} = useParams<{category: string; id: string}>();
  const navigate = useNavigate();

  const [count, setCount] = useState(1);
  const [combo, setCombo] = useState<undefined | ComboType>();

  const {order, updateOrder} = useOrderContext() || {};
  const [currencyFormatter] = useFormat();
  const priceTag = combo ? currencyFormatter().format(combo.price) : '';
  const [selectedComplement, setSelectedComplement] = useState<ProductType | undefined>(undefined);
  const [selectedDrink, setSelectedDrink] = useState<ProductType | undefined>(undefined);

  useEffect(() => {
    getMultipleProductsByCategory(['drinks', 'complements']);
    if (id) {
      getComboById(id)
        .then((combo) => {
          setCombo(combo);
        })
        .catch(console.error);
    }
  }, [id]);

  if (!combo) {
    return null;
  }

  const onSelectComplement = (product: ProductType) => {
    const newProduct = product.title === selectedComplement?.title ? undefined : product;
    setSelectedComplement(newProduct);
  };

  const onSelectDrink = (product: ProductType) => {
    const newProduct = product.title === selectedDrink?.title ? undefined : product;
    setSelectedDrink(newProduct);
  };

  const getSelectedProducts = () => {
    const products: ProductType[] = [];
    if (selectedComplement) products.push(selectedComplement);
    if (selectedDrink) products.push(selectedDrink);
    return products;
  };

  // Add selected qty of this item and adds them to the order
  const handleClick = () => {
    const menu: MenuType = {
      id: combo.id,
      image: combo.img,
      name: combo.title,
      price: combo.price,
      products: getSelectedProducts(),
    };

    Array.from({length: count}, (_, index) => index).forEach(() => {
      order.addItem(menu);
    });

    updateOrder(order);
    navigate(-1);
  };

  return (
    <div className="AddItem">
      <p className="title">{combo?.title}</p>
      <div className="ImageItem">
        <img src={`${IMG_PATH}${combo.img}`} alt="Combo" />
        {combo.mainProduct.ingredients && combo.mainProduct.ingredients.length > 0 && (
          <div className="IngredientList">
            <IngredientList ingredients={combo.mainProduct.ingredients} />
          </div>
        )}
      </div>

      <p className="price">{priceTag}</p>
      <div className="counter-container">
        <button
          onClick={() => {
            setCount(count === 1 ? count : count - 1);
          }}
        >
          <img src={IMG_PATH + 'minus.png'} alt="Quitar" />
        </button>
        <p>{count}</p>
        <button
          onClick={() => {
            setCount(count >= 5 ? count : count + 1);
          }}
        >
          <img src={IMG_PATH + 'plus.png'} alt="Añadir" />
        </button>
      </div>

      <ProductSelector
        productCategory={multipleProductsByCategory.find(
          (category) => category.id === 'complements',
        )}
        onSelectProduct={onSelectComplement}
        selectedProductId={selectedComplement?.id}
      />

      <ProductSelector
        productCategory={multipleProductsByCategory.find((category) => category.id === 'drinks')}
        onSelectProduct={onSelectDrink}
        selectedProductId={selectedDrink?.id}
      />

      <McButton
        text={'Agregar al pedido'}
        onClick={() => {
          handleClick();
        }}
        fixed
      />
    </div>
  );
};

export default AddItem;
