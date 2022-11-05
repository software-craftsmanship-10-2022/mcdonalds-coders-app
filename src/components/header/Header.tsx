import './Header.css';
import {IMG_PATH, URLS} from '../../config';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  // @TODO Wtf??
  const handleNavigate = () => {location.pathname === URLS.root ? false : navigate(-1); }; // eslint-disable-line

  useEffect(() => {
    setShowButton(location.pathname !== URLS.root);
  }, [location]);

  return (
    <div className='div-header'>
      <button
        className={showButton ? 'go-back-btn' : 'go-back-btn hidden'}
        onClick={() => {
          handleNavigate();
        }}
      >
        <img src={IMG_PATH + 'left-arrow.png'} alt='' />
        Volver
      </button>
      <img className='logo' src={IMG_PATH + 'logo-plain.png'} alt='Mcdonalds main logo' />
    </div>
  );
};

export default Header;
