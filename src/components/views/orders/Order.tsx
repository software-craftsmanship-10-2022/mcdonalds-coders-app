import {useEffect, useMemo, useState} from 'react';
import {Navigate, NavLink, useNavigate} from 'react-router-dom';
import {IMG_PATH, URLS} from '../../../config';
import {useOrderContext} from '../../../context/OrderContext';
import MARKERS from '../../../data/markers';
import McButton from '../../buttons/McButton';
import Searchbar from '../../input/Searchbar';
import Map from '../../map/Map';
import InfoModal from '../../modal/InfoModal';
import './Order.css';

type HandleStoreSelectType = {
  title: string;
  address: string;
  image: string;
  isDelivery: boolean;
};
type PickupProps = {
  query: string;
  handleStoreSelect: ({title, address, image, isDelivery}: HandleStoreSelectType) => void;
};

const Pickup = ({query, handleStoreSelect}: PickupProps) => {
  const filteredMarkers = useMemo(
    () => MARKERS.filter((value) => value.location.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div className="Pickup">
      <div className="marker-list">
        <p className="title">Sucursales</p>
        {filteredMarkers.map((value, index) => (
          <NavLink
            key={index}
            className={'marker'}
            to={URLS.ordersAdd}
            onClick={() => {
              handleStoreSelect({
                title: value.title,
                address: value.location,
                image: value.img,
                isDelivery: false,
              });
            }}
          >
            <img src={IMG_PATH + value.img} alt="" />
            <div className="marker-info">
              <h6 className="title">{value.title} </h6>
              <h6 className="location">{value.location}</h6>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

type DeliveryProps = {
  location?: string;
  handleStoreSelect: ({title, address, image, isDelivery}: HandleStoreSelectType) => void;
};

const Delivery = ({location, handleStoreSelect}: DeliveryProps) => {
  // Delivery Info
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const shortLocation = location?.split(',').slice(0, 3).join(', ');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = () => {
    if (!location || location === '') {
      alert('Seleccione una dirección'); // eslint-disable-line no-alert
      return;
    }

    // HandleStoreSelect(shortLocation!, location, 'delivery.png', true);
    handleStoreSelect({
      title: shortLocation!,
      address: location,
      image: 'delivery.png',
      isDelivery: true,
    });

    navigate(URLS.ordersAdd);
  };

  return (
    <div className="Delivery">
      <McButton
        text={'Aceptar'}
        onClick={() => {
          handleSubmit();
        }}
      />
      <InfoModal
        toggle={toggleModal}
        isOpen={showModal}
        title="Localización"
        message="Presiona en el botón de búsqueda arriba a la derecha del mapa para buscar tu dirección.
         Alternativamente, puedes hacer click directamente en el mapa."
      />
    </div>
  );
};

type OrderProps = {
  toggleOrderModal: () => void;
};

const Order = ({toggleOrderModal}: OrderProps) => {
  const [activeMode, setActiveMode] = useState(true);
  const [mapMarkers, setMapMarkers] = useState(MARKERS);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const {order, updateOrder} = useOrderContext();

  // Set searchbar query from the selected marker
  useEffect(() => {
    if (activeMode) {
      setQuery(location);
    }
  }, [location, activeMode]);

  // Restrict access when an order is in place
  if (order.isConfirmed()) {
    toggleOrderModal();
    return <Navigate to={URLS.root} replace />;
  }

  const changeMode = (mode: boolean) => {
    setActiveMode(mode);
    setMapMarkers(mode ? MARKERS : []);
  };

  const handleStoreSelect = ({title, address, image, isDelivery}: HandleStoreSelectType) => {
    order.setDetails({
      id: 'a1',
      address,
      name: title,
      image,
      isDelivery,
    });

    updateOrder(order);
  };

  return (
    <div className="Order">
      <p className="title">Pedidos</p>
      <div className="mode-button-container">
        <button
          type="button"
          className={activeMode ? 'mode-button selected' : 'mode-button'}
          onClick={() => {
            changeMode(true);
          }}
        >
          Pickup
        </button>
        <button
          type="button"
          className={activeMode ? 'mode-button' : 'mode-button selected'}
          onClick={() => {
            changeMode(false);
          }}
        >
          McDelivery
        </button>
      </div>
      <Map markers={mapMarkers} locateCurrent={!activeMode} setLocation={setLocation} />
      {activeMode && (
        <>
          <Searchbar
            placeholder={'Buscar por direccion...'}
            icontype={'glyphicon-search'}
            name={'search'}
            id={'search'}
            query={query}
            setQuery={setQuery}
          />
          <Pickup query={query} handleStoreSelect={handleStoreSelect} />
        </>
      )}
      {!activeMode && <Delivery location={location} handleStoreSelect={handleStoreSelect} />}
    </div>
  );
};

export default Order;
