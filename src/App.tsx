import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/* VIEWS */
import Catalogue from "./components/views/catalogue/Catalogue";
import ProductList from "./components/views/catalogue/ProductList";
import Coupon from "./components/views/coupons/Coupon";
import ViewCoupon from "./components/views/coupons/ViewCoupon";
import AddCoupon from "./components/views/discounts/AddCoupon";
import Discount from "./components/views/discounts/Discount";
import Home from "./components/views/home/Home";
import AddItem from "./components/views/orders/AddItem";
import Cart from "./components/views/orders/Cart";
import Checkout from "./components/views/orders/Checkout";
import ComboList from "./components/views/orders/ComboList";
import CurrentOrder from "./components/views/orders/CurrentOrder";
import Order from "./components/views/orders/Order";
/* COMMON COMPONENTS */
import Scroll from "./components/common/Scroll";
import Header from "./components/header/Header";
import InfoModal from "./components/modal/InfoModal";
import Navigation from "./components/navbar/Navigation";
import { OrderProvider } from "./context/OrderContext";

import { URLS } from "./config";

const App = () => {
  // Order warning
  const [showOrderModal, setShowOrderModal] = useState(false);

  const toggleOrderModal = () => setShowOrderModal(!showOrderModal);

  return (
    <div className="App">
      <OrderProvider>
        <Router>
          <Scroll>
            <Header />
            <Routes>
              <Route path={URLS.ROOT} element={<Home />} />
              <Route path={URLS.ORDERS}>
                <Route
                  index
                  element={<Order toggleOrderModal={toggleOrderModal} />}
                />
                <Route path={URLS.ORDERS_CART} element={<Cart />} />
                <Route path={URLS.ORDERS_CHECKOUT} element={<Checkout />} />
                <Route path={URLS.ORDERS_CURRENT} element={<CurrentOrder />} />
                <Route path={URLS.ORDERS_ADD} element={<ComboList />} />
                <Route
                  path={URLS.ORDERS_ADD + ":category/:id"}
                  element={<AddItem />}
                />
              </Route>
              <Route path={URLS.DISCOUNTS}>
                <Route index element={<Discount />} />
                <Route path=":category/:id" element={<AddCoupon />} />
              </Route>
              <Route path={URLS.COUPONS}>
                <Route index element={<Coupon />} />
                <Route path=":id" element={<ViewCoupon />} />
              </Route>
              <Route path={URLS.CATALOGUE}>
                <Route index element={<Catalogue />} />
                <Route path=":category" element={<ProductList />} />
              </Route>
            </Routes>
            <Navigation />
            <InfoModal
              toggle={toggleOrderModal}
              isOpen={showOrderModal}
              title="Atención"
              message="Ya existe un pedido en curso. Pulsa 'Ver' para ver tu pedido actual."
              link={URLS.ORDERS_CURRENT}
            />
          </Scroll>
        </Router>
      </OrderProvider>
    </div>
  );
};

export default App;
