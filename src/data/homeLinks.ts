import {URLS} from '../config';

const HOME_LINKS = [
  {
    title: 'Mes de La Hamburguesa',
    img: 'mesDeLaHamburgesa.png',
    href: 'https://countdown.mcdonalds.com.ar/login',
  },
  {
    title: 'Un McDonald\'s en tu mano',
    img: 'mcPediyRetira.png',
    href: URLS.orders,
  },
  {
    title: 'Pedí, nosotros te lo llevamos',
    img: 'mcDelivery.png',
    href: URLS.orders,
  },
  {
    title: 'Ofertas Especiales',
    img: 'mcOferta.png',
    href: URLS.discounts,
  },
  {
    title: 'Mis Cupones',
    img: 'mcCupones.png',
    href: URLS.coupons,
  },
  {
    title: 'Stickers',
    img: 'mcStickers.png',
    href: '',
  },
];

export default HOME_LINKS;
