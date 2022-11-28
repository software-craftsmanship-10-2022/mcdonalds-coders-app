import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import type {CategoryIds, MenuType, ProductType} from 'src/@types/product';
import Order from 'src/api/orders/Order';
import {MenuBuilder} from 'src/api/products/builder';
import InfoModal from 'src/components/modal/InfoModal';
import ProductSelector from 'src/components/product-selector/ProductSelector';
import IngredientList from 'src/components/product/IngredientList/IngredientList';
import useCombos from 'src/hooks/useCombos';
import {useProducts} from 'src/hooks/useProducts';
import {IMG_PATH} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import useFormat from '../../../hooks/useFormat';
import McButton from '../../buttons/McButton';
import './AddItem.css';

const CATEGORIES: CategoryIds[] = ['drinks', 'complements', 'desserts', 'chicken'];
const MODAL_TITLE = 'Ups, aún tienes cosas por elegir';
const MODAL_TEXT_NO_COMPLEMENT =
  'No has seleccionado un acompañamiento, pero no te preocupes estas a tiempo de mejorar tu combo';
const MODAL_TEXT_NO_DRINK = 'No has seleccionado una bebida, no queremos que te deshidrates';
const menuBuilder = new MenuBuilder();

const AddItem = () => {
  const {multipleProductsByCategory, getMultipleProductsByCategory} = useProducts();

  const {getComboById} = useCombos();
  const {id} = useParams<{category: string; id: string}>();
  const navigate = useNavigate();

  const [count, setCount] = useState(1);
  const [combo, setCombo] = useState<undefined | MenuType>();

  const {order, updateOrder} = useOrderContext() || {};
  const [currencyFormatter] = useFormat();
  const priceTag = combo ? currencyFormatter().format(combo.price) : '';
  const [selectedComplement, setSelectedComplement] = useState<ProductType | undefined>(undefined);
  const [selectedDrink, setSelectedDrink] = useState<ProductType | undefined>(undefined);
  const [selectedExtra, setSelectedExtra] = useState<ProductType | undefined>(undefined);
  const [modalConfig, setModalConfig] = useState({visible: false, title: MODAL_TITLE, message: ''});

  useEffect(() => {
    getMultipleProductsByCategory(CATEGORIES);
    if (id) {
      getComboById(id)
        .then((combo: MenuType) => {
          setCombo(combo);
          menuBuilder.withMainMenu(combo).withMainProduct(combo.mainProduct);
        })
        .catch(console.error);
    }
  }, [id]);

  if (!combo) {
    return null;
  }

  const onSelectComplement = (product: ProductType) => {
    const newProduct = product.title === selectedComplement?.title ? undefined : product;
    menuBuilder.withComplement(newProduct);
    setSelectedComplement(newProduct);
  };

  const onSelectDrink = (product: ProductType) => {
    const newProduct = product.title === selectedDrink?.title ? undefined : product;
    menuBuilder.withDrink(newProduct);
    setSelectedDrink(newProduct);
  };

  const onSelectExtra = (product: ProductType) => {
    const newProduct = product.title === selectedExtra?.title ? undefined : product;
    menuBuilder.withExtra(newProduct);
    setSelectedExtra(newProduct);
  };

  const showModal = (message: string) => {
    setModalConfig({
      ...modalConfig,
      visible: true,
      message,
    });
  };

  const closeModal = () => {
    setModalConfig({
      ...modalConfig,
      visible: false,
    });
  };

  // Add selected qty of this item and adds them to the order
  const handleClick = () => {
    if (!selectedComplement) {
      showModal(MODAL_TEXT_NO_COMPLEMENT);
      return;
    }

    if (!selectedDrink) {
      showModal(MODAL_TEXT_NO_DRINK);
      return;
    }

    const menu: MenuType = menuBuilder.getMenu();

    const newOrder = new Order({
      id: order.getId(),
      details: order.getDetails(),
      items: order.getItems(),
      total: order.getTotalPrice(),
      payment: order.getPayment(),
      paymentAmount: order.getPaymentAmount(),
    });

    Array.from({length: count}, (_, index) => index).forEach(() => {
      newOrder.addItem(menu);
    });

    updateOrder(newOrder);
    navigate(-1);
  };

  return (
    <div className="AddItem">
      <p className="title">{combo?.name}</p>
      <div className="ImageItem">
        <img src={`${IMG_PATH}${combo.image}`} alt="Combo" />
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
      <h2>Amplia con complementos extras</h2>

      <ProductSelector
        productCategory={multipleProductsByCategory.find((category) => category.id === 'desserts')}
        onSelectProduct={onSelectExtra}
        selectedProductId={selectedExtra?.id}
      />
      <McButton
        text={'Agregar al pedido'}
        onClick={() => {
          handleClick();
        }}
        fixed
      />
      <InfoModal
        isOpen={modalConfig.visible}
        toggle={closeModal}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </div>
  );
};

export default AddItem;
