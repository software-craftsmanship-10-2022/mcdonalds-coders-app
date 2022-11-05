import './Navigation.css';
import {IMG_PATH, URLS} from '../../config';
import {useState, useEffect} from 'react';
import {NavLink, useLocation} from 'react-router-dom';

const NAV_BUTTONS = [
  {text: 'Home', img: 'logo-black.png', path: URLS.root},
  {text: 'Pedidos', img: 'fries.png', path: URLS.orders},
  {text: 'Ofertas', img: 'ticket.png', path: URLS.discounts},
  {text: 'Cupones', img: 'coupon.png', path: URLS.coupons},
  {text: 'Menú', img: 'more.png', path: URLS.catalogue},
];

const Navigation = () => {
  // Default view is home
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    // Returns the root section of a route, as route
    const toRoot = (route: string) => {
      if (route === URLS.root) {
        return URLS.root;
      }

      for (const button of NAV_BUTTONS) {
        if (button.path === URLS.root) {
          continue;
        }

        if (route.includes(button.path)) {
          return button.path;
        }
      }
    };

    setActive(toRoot(location.pathname)!);
  }, [location]);

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        {NAV_BUTTONS.map((value) => (
          // Load all buttons listed before
          <li
            className={
              // If key is the actual active key, set active class
              active === value.path ? 'nav-list-item active' : 'nav-list-item'
            }
            key={value.path}
          >
            <NavLink to={value.path} className="nav-link">
              <img src={IMG_PATH + value.img} alt="" />
              {value.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
