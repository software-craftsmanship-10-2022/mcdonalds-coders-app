import type {ProductCategoryApiType} from '../@types/product';

// Categories & products
const PRODUCTS: ProductCategoryApiType[] = [
  {
    category: 'Hamburguesas',
    id: 'burgers',
    items: [
      {
        id: 'big_mac',
        img: 'big_mac.png', // First img used as category image
        title: 'Big Mac',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne', 'salsa-bigmac'],
        description: 'La hamburguesa más famosa del mundo. Un sabor único.',
      },
      {
        id: 'mcnifica',
        img: 'mcnifica.png',
        title: 'McNífica',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne'],
        description:
          'En un mundo donde todos buscan lo nuevo, la McNífica viene a rectificar lo bueno de ser clásico.',
      },
      {
        id: 'Cuarto-Libra-con-queso',
        img: 'Cuarto-Libra-con-queso.png',
        title: 'Cuarto de Libra con Queso',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne', 'queso'],
        description:
          'La belleza radica en la simpleza de las cosas. Una hamburguesa que no se anda con vueltas. La perfecta combinación entre la mejor carne 100% vacuna y dos quesos que lo rodean, junto con el toque del kétchup, mostaza y la cebolla fresca.',
      },
      {
        id: 'Doble-Cuarto-Libra-con-Queso',
        img: 'Doble-Cuarto-Libra-con-Queso.png',
        title: 'Doble Cuarto de Libra con Queso',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne', 'carne', 'queso'],
        description:
          'Imaginá la sensación del clásico Cuarto de Libra. Imaginalo con un medallón de deliciosa carne 100% vacuna, queso cheddar, cebolla, kétchup y mostaza ¿Listo? Ahora duplicá esa sensación. Ya tenés el Doble Cuarto en la cabeza.',
      },
      {
        id: 'Grande-Doble-McBacon',
        img: 'Grande-Doble-McBacon.png',
        title: 'Grande Doble McBacon',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne', 'bacon'],
        description:
          '¡NUEVO PAN! Dos carnes, inigualable queso cheddar, cebolla, kétchup y mostaza, y el increíble ingrediente que lo hace único: bacon premium.',
      },
      {
        id: 'Grande-Tasty-Doble',
        img: 'Grande-Tasty-Doble.png',
        title: 'Grande Tasty Doble',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne'],
        description:
          'Inigualable pan con semillas de sésamo, dos medallones de carne 100% vacuna, tres fetas de nuestro exclusivo Queso Cheddar, cebolla, lechuga y tomate frescos. Sumado a estos ingredientes la única e inigualable Salsa Tasty, un exclusivo sabor McDonald’s',
      },
      {
        id: 'Grande-Tasty-Triple',
        img: 'Grande-Tasty-Triple.png',
        title: 'Grande Tasty Triple',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne'],
        description:
          'Inigualable pan con semillas de sésamo, tres medallones de carne 100% vacuna, cuatro fetas de nuestro exclusivo Queso Cheddar, cebolla, lechuga y tomate frescos. Sumado a estos ingredientes la única e inigualable Salsa Tasty, un exclusivo sabor McDonald’s',
      },
      {
        id: 'Grande-Triple-McBacon',
        img: 'Grande-Triple-McBacon.png',
        title: 'Grande Triple McBacon',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne', 'bacon'],
        description:
          'I¡NUEVO PAN! Triple carne, inigualable queso cheddar, cebolla, kétchup y mostaza, y el increíble ingrediente que lo hace único: bacon premium.',
      },
      {
        id: 'Hamburguesa-(Cajita-Feliz)',
        img: 'Hamburguesa-(Cajita-Feliz).png',
        title: 'Hamburguesa(Cajita-Feliz)',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne'],
        description:
          'Hamburguesa de carne 100% vacuna sin aditivos ni conservantes , condimentada con una pisca de sal y pimienta.',
      },
      {
        id: 'Hamburguesa',
        img: 'Hamburguesa.png',
        title: 'Hamburguesa',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne'],
        description:
          'El sabor de la carne 100% vacuna más deliciosa, acompañado del pan más esponjoso, kétchup, mostaza y cebolla triturada.',
      },
      {
        id: 'Mc-Fiesta_JR(Cajita-Feliz)',
        img: 'Mc-Fiesta_JR(Cajita-Feliz).png',
        title: 'McFiestaJR(Cajita-Feliz)',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne'],
        description:
          'La McFiesta Jr. comienza con una carne 100% vacuna sin aditivos ni conservantes, condimentada con una pisca de sal y pimienta, con una rodaja de tomate y lechuga.',
      },
      {
        id: 'Mc-Fiesta',
        img: 'Mc-Fiesta.png',
        title: 'McFiesta',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne'],
        description:
          'Hamburguesa elaborada con carne 100% de carne vacuna, mayonesa, lechuga, tomate.',
      },
      {
        id: 'McDuo',
        img: 'McDuo.png',
        title: 'McDuo',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne'],
        description:
          'Una hamburguesa exquisita compuesta de dos carnes 100% vacuna, acompañadas del clásico pan, mostaza, kétchup, queso derretido, y un toque de cebolla que la hace única.',
      },
      {
        id: 'Triple-Hamburguesa-con-queso',
        img: 'Triple-Hamburguesa-con-queso.png',
        title: 'Triple Hamburguesa con queso',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne'],
        description:
          'Tres medallones de carne 100% vacuna, queso derretido, mostaza, kétchup y cebolla triturada, es algo que nunca puede fallar.',
      },
      {
        id: 'Triple-Mac',
        img: 'Triple-Mac.png',
        title: 'TripleMac',
        ingredients: ['pan-arriba', 'pan-abajo', 'carne'],
        description:
          'Una hamburguesa que no es para cualquiera. Sólo los más extremos están dispuestos a saborear tres carnes 100% vacuna acompañadas del clásico pan McDonald’s, su característica salsa especial, queso derretido, lechuga fresca, pepino crocante y el toque de cebolla que la hace única.',
      },
    ],
  },
  {
    category: 'Sándwiches de Pollo',
    id: 'chicken',
    items: [
      {
        id: 'mc_pollo',
        img: 'mc_pollo.png',
        title: 'McPollo',
        ingredients: ['pan-arriba', 'pan-abajo', 'pollo'],
        description: 'El auténtico sabor del pollo lo encontrás en nuestro clásico McPollo.',
      },
      {
        id: 'mc_pollo_2',
        img: 'mc_pollo_2.png',
        title: 'McPollo doble',
        ingredients: ['pan-arriba', 'pan-abajo', 'pollo'],
        description: 'El clásico McPollo, esta vez con doble sabor.',
      },
      {
        id: 'McNuggets-4-unidades',
        img: 'McNuggets-4-unidades.png',
        title: 'McNuggets 4 unidades',
        description:
          'Ligero sabor a empanado de harina de maíz y trigo frito con notas caramelizadas. Suave sabor a pollo que es ligeramente salado con un toque de pimienta negra y apio en el empanado.',
      },
      {
        id: 'McNuggets-6-unidades',
        img: 'McNuggets-6-unidades.png',
        title: 'McNuggets 6 unidades',
        description:
          'Seis piezas del mejor pollo rebozado sólo para vos. Comelas como quieras: con salsas o solas; todas son igual de deliciosas!',
      },
      {
        id: 'McNuggets-10-unidades',
        img: 'McNuggets-10-unidades.png',
        title: 'McNuggets 10 unidades',
        description:
          'Diez piezas del mejor pollo rebozado. Para comerlas con salsas o solas; todas son igual de deliciosas!',
      },
      {
        id: 'McNuggets-20-unidades',
        img: 'McNuggets-20-unidades.png',
        title: 'McNuggets 20 unidades',
        description:
          'Veinte piezas del mejor pollo rebozado, en su versión ideal para compartir. Con amigos o en pareja; con o sin salsas. Comelas como quieras. Todas son igual de deliciosas!',
      },
    ],
  },
  {
    category: 'Papas y Complementos',
    id: 'complements',
    items: [
      {
        id: 'Papas-pequeñas',
        img: 'Papas-pequeñas.png',
        title: 'Papas pequeñas',
        description:
          'Calientes, crujientes y deliciosas, tus aliadas perfectas para cualquier comida. Disfrutá de nuestras papas mundialmente famosas, desde la primera hasta la última en su versión pequeña.',
      },
      {
        id: 'Papas-Medianas',
        img: 'Papas-Medianas.png',
        title: 'Papas Medianas',
        description:
          'Nuestro sello. Las aliadas perfectas para cualquier comida. Disfrutá de nuestras papas mundialmente famosas, desde la primera hasta la última. Crujientes y deliciosas, no vas a parar hasta terminarlas todas.',
      },
      {
        id: 'Papas-Grandes',
        img: 'Papas-Grandes.png',
        title: 'Papas Grandes',
        description:
          'Calientes, crujientes y deliciosas, tus aliadas perfectas para cualquier comida. Disfrutá de nuestras papas mundialmente famosas, desde la primera hasta la última.',
      },
      {
        id: 'Papas-Kids',
        img: 'Papas-Kids.png',
        title: 'Papas-Kids',
        description:
          'Nuestras clásicas papas fritas doradas y crocantes con la sal justa y en un porción adecuada para los niños.',
      },
      {
        id: 'Papas-con-Cheddar-&-Bacon',
        img: 'Papas-con-Cheddar-&-Bacon.png',
        title: 'Papas con Cheddar & Bacon',
        description:
          'Calientes, crujientes y deliciosas, una nueva variedad llega para quedarse: Papas Fritas Cheddar fundido y trocitos de bacon.',
      },
      {
        id: 'Side-Salad',
        img: 'Side-Salad.png',
        title: 'Side Salad',
        description:
          'Una opción para los que saben que una ensalada no es aburrida. Para los que saben que nuestras ensaladas son mucho más que verduras. Son las mejores variedades de hojas verdes y tomates Cherrys, ansiosas por acompañar tu hamburguesa.',
      },
    ],
  },
  {
    category: 'Postres',
    id: 'desserts',
    items: [
      {
        id: 'Cono-de-Vainilla',
        img: 'Cono-de-Vainilla.png',
        title: 'Cono de Vainilla',
        description:
          'Un clásico cono que nunca pasa de moda. La opción que todos aman por su sabor, su dulce cucurucho y su estilo tan cool.',
      },
      {
        id: 'cono-de-dulce-de-leche',
        img: 'cono-de-dulce-de-leche.png',
        title: 'cono de dulce de leche',
        description:
          'Si amás el dulce de leche, si amás el helado, si amás el cucurucho, si amás un postre que te refresque; este es tu postre.',
      },
      {
        id: 'cono-combinado',
        img: 'cono-combinado.png',
        title: 'Cono combinado',
        description:
          'El helado para los que lo quieren todo. Para los que no se conforman con un sabor. Un helado que combina dulce de leche, vainilla y un delicioso cucurucho.',
      },
      {
        id: 'Cono-Kit-Kat',
        img: 'Cono-Kit-Kat.png',
        title: 'Cono-Kit-Kat',
        description:
          'Cremoso helado de vainilla, en un delicioso cucurucho, acompañado de la crujiente oblea de chocolate, la favorita de todos: Kit Kat. ¡Imposible resistirse!',
      },
      {
        id: 'Cono-Relleno',
        img: 'Cono-Relleno.png',
        title: 'Cono Relleno',
        description:
          'Helado de vainilla, dulce de leche o combinado, servido en cono de masa crocante y con relleno de chocolate, frutilla o dulce de leche. ¿Cuál elegis?',
      },
      {
        id: 'Super-Cono',
        img: 'Super-Cono.png',
        title: 'Super Cono',
        description:
          "Como el tradicional, pero con mas helado! Deliciosa mezcla de helado McDonald's en sabor dulce de leche, vainilla o combinado, dentro del exquisito cono de siempre.",
      },
      {
        id: 'sundae-chocolate',
        img: 'sundae-chocolate.png',
        title: 'sundae de chocolate',
        description:
          'La medida justa entre salsa de chocolate y helado de vainilla que pueden hacerte vivir una experiencia explosiva.',
      },
      {
        id: 'sundae-dulce-de-leche',
        img: 'sundae-dulce-de-leche.png',
        title: 'sundae de dulce de leche',
        description:
          'El exquisito helado de vainilla que ya conoces y te encanta, pero bañado de una salsa de dulce de leche que te encantará aún más.',
      },
      {
        id: 'sundae-frutilla',
        img: 'sundae-frutilla.png',
        title: 'Sundae de Frutilla',
        description:
          'El helado de vainilla que ya conocés, con una deliciosa salsa frutilla. Disfrutá la mezcla perfecta de tu postre preferido con la mejor selección de frutas.',
      },
      {
        id: 'Sundae-Crocantella',
        img: 'Sundae-Crocantella.png',
        title: 'Sundae Crocantella',
        description:
          'Helado de vainilla, salsa caliente y recubierto con salsa de Chocoavellanas que al contacto con tu postre se transforma en un placer crocante',
      },
      {
        id: 'Mc-Flurry-Crocantella',
        img: 'Mc-Flurry-Crocantella.png',
        title: 'McFlurry Crocantella',
        description:
          'Helado de vainilla con trocitos de deliciosas galletitas Óreo, salsa de Chocoavellanas que al contacto con tu postre se transforma en un placer crocante',
      },
      {
        id: 'McFlurry-Oreo',
        img: 'McFlurry-Oreo.png',
        title: 'McFlurry Oreo',
        description:
          'Un helado de vainilla que se banca compartir el protagonismo con trocitos de deliciosas galletitas Oreo y la salsa que elijas. Amalo hasta el final.',
      },
      {
        id: 'McFlurry-KitKat',
        img: 'McFlurry-KitKat.png',
        title: 'McFlurry KitKat',
        description:
          'La crocante oblea de chocolate que todo el mundo conoce y ama, pero acompañada de un cremoso helado de vainilla y una deliciosa salsa tibia de chocolate. ¿Hace falta que te diga más? El break helado que esperabas.',
      },
      {
        id: 'YogurKid',
        img: 'YogurKid.png',
        title: 'YogurKid',
        description: 'Yogur endulzado parcialmente descremado sabor a vainilla natural',
      },
    ],
  },
  {
    category: 'Bebidas',
    id: 'drinks',
    items: [
      {
        id: 'agua',
        img: 'agua.png',
        title: 'Agua sin gas (500ml)',
        description: 'La opción ideal para refrescar todas tus comidas.',
      },
      {
        id: 'coca-cola-chica',
        img: 'Bebida.png',
        title: 'Coca Cola Chica',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'coca-cola-mediana',
        img: 'Bebida.png',
        title: 'Coca Cola Mediana',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'coca-cola-grande',
        img: 'Bebida.png',
        title: 'Coca Cola Grande',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'coca-cola-light-chica',
        img: 'Bebida.png',
        title: 'Coca Cola Light Chica',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'coca-cola-light-grande',
        img: 'Bebida.png',
        title: 'Coca Cola Light Grande',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'coca-cola-zero-chica',
        img: 'Bebida.png',
        title: 'Coca Cola Zero Chica',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'coca-cola-zero-mediana',
        img: 'Bebida.png',
        title: 'Coca Cola Zero Mediana',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'coca-cola-zero-grande',
        img: 'Bebida.png',
        title: 'Coca Cola Zero Grande',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'fanta-chica',
        img: 'Bebida.png',
        title: 'Fanta Chica',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'fanta-mediana',
        img: 'Bebida.png',
        title: 'Fanta Mediana',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'fanta-grande',
        img: 'Bebida.png',
        title: 'Fanta Grande',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'sprite-zero-chica',
        img: 'Bebida.png',
        title: 'Sprite Zero Chica',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'sprite-zero-mediana',
        img: 'Bebida.png',
        title: 'Sprite Zero Mediana',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'sprite-zero-grande',
        img: 'Bebida.png',
        title: 'Sprite Zero Grande',
        description:
          'Burbujas contra el calor, contra la sed, contra el aburrimiento. Si tus comidas llevan gaseosa, están listas para enfrentar lo que sea, elegila en tamaño regular, mediano o grande.',
      },
      {
        id: 'Jugo-de-Manzana',
        img: 'Jugo-de-Manzana.png',
        title: 'Jugo de Manzana',
        description: 'Jugo de manzana 100% natural',
      },
    ],
  },
  {
    category: 'Desayunos / Merienda',
    id: 'breakfast',
    items: [
      {
        id: 'Café-Premium-14oz',
        img: 'Café-Premium-14oz.png',
        title: 'Café Premium 14oz',
        description:
          'Los mejores granos seleccionados para darle un sabor único a tu café. Como a vos te gusta. Como vos te merecés.',
      },
      {
        id: 'Café-Premium-18oz',
        img: 'Café-Premium-18oz.png',
        title: 'Café Premium 18oz',
        description:
          'Los mejores granos seleccionados para darle un sabor único a tu café. Como a vos te gusta. Como vos te merecés.',
      },
      {
        id: 'Cappuccino-14oz',
        img: 'Cappuccino-14oz.png',
        title: 'Cappucino 14oz',
        description:
          'Un espresso doble con leche, espolvoreado con deliciosa canela y cacao, acompañado de una suave espuma.',
      },
      {
        id: 'Cappuccino-18oz',
        img: 'Cappuccino-18oz.png',
        title: 'Cappucino 18oz',
        description:
          'Un espresso doble con leche, espolvoreado con deliciosa canela y cacao, acompañado de una suave espuma.',
      },
      {
        id: 'Latte-14oz',
        img: 'Latte-14oz.png',
        title: 'Latte 14oz',
        description:
          'Los mejores granos de café premium se mezclan con leche, dando un resultado cremoso para que tus sentidos se despierten con un sabor único.',
      },
      {
        id: 'Latte-18oz',
        img: 'Latte-18oz.png',
        title: 'Latte 18oz',
        description:
          'Los mejores granos de café premium se mezclan con leche, dando un resultado cremoso para que tus sentidos se despierten con un sabor único.',
      },
      {
        id: 'Donut',
        img: 'Donut.png',
        title: 'Donut',
        description:
          'Un esponjosa y suave donut, podes elegirla glaseada o recubierta de chocolate.',
      },
      {
        id: 'TostadoMixto',
        img: 'TostadoMixto.png',
        title: 'Tostado Mixto',
        description:
          'El sándwich único que todos conocemos, pero con un toque único. Un increíble tostado, con lomito y queso inmejorable para empezar tu día de la mejor manera.',
      },
      {
        id: 'TostadoNapolitano',
        img: 'TostadoNapolitano.png',
        title: 'Tostado Napolitano',
        description:
          'Lomito, Queso Cheddar y Tomate: los mejores ingredientes dentro de un increíble pan tipo casero tostado.',
      },
      {
        id: 'Tostado4Quesos',
        img: 'Tostado4Quesos.png',
        title: 'Tostado 4 Quesos',
        description:
          'Queso Cheddar Fundido, Queso Cheddar, Queso Cheddar Blanco y Queso Parmesano: nada puede ser mejor!',
      },
      {
        id: 'TostadoconLomitoyQueso',
        img: 'TostadoconLomitoyQueso.png',
        title: 'Tostado con Lomito y Queso',
        description:
          'El sándwich único que todos conocemos, pero con un toque único. Un increíble tostado, con lomito y queso inmejorable para empezar tu día de la mejor manera.',
      },
    ],
  },
  {
    category: 'McCafé',
    id: 'coffee',
    items: [
      {
        id: 'Espresso',
        img: 'Espresso.png',
        title: 'Espresso',
        description:
          'La mejor selección de finos granos de café arábicos en todo su esplendor, para que disfrutes sorbo a sorbo.',
      },
      {
        id: 'Latte',
        img: 'Latte.png',
        title: 'Latte',
        description:
          'Delicioso espresso con vainilla, leche con espuma y por si fuera poco, acompañado de un increíble crocante de caramelo.',
      },
      {
        id: 'Frappé',
        img: 'Frappé.png',
        title: 'Frappé',
        description:
          'El mismo café que te ayuda a levantarte todos los días, ahora con una sensación refrescante, acompañado de crema e hilos de chocolate.',
      },
      {
        id: 'Medialuna-de-Manteca',
        img: 'Medialuna-de-Manteca.png',
        title: 'Medialuna de Manteca',
        description:
          'Un clásico ideal para cualquier momento del día. Esponjosa, dulce y crocante a la vez son las características de esta delicia. Ideal para acompañar un café, un frappé o hasta un rico té.',
      },
      {
        id: 'Medialuna-de-Grasa',
        img: 'Medialuna-de-Grasa.png',
        title: 'Medialuna de Grasa',
        description:
          'Tradicionales y crocantes, para acompañar tu delicioso café, o darte un gusto en cualquier momento del día.',
      },
      {
        id: 'Croissant',
        img: 'Croissant.png',
        title: 'Croissant',
        description:
          'Una verdadera delicia de la pastelería francesa, para acompañarte en cualquier desayuno o merienda. ¡No te quedes sin probarlo!',
      },
    ],
  },
];

export default PRODUCTS;
