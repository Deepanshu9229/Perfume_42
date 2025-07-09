// Importing assets
import logo from './logo.png';
import signature from './signature.png';

import abrielle from './abrielle.jpg';
import aquaDiGio from './aquaDiGio.jpg';
import chanelCoco from './chanelCoco.jpg';
import dolceGabbana from './dolceGabbana.jpg';
import dolceGabbanaOne from './dolceGabbanaOne.jpg';
import gucciFlora from './gucciFlora.jpg';
import kilian from './kilian.jpg';
import mad from './mad.jpg';
import summerLP from './summerLP.jpg';
import tomFord from './tomFord.jpg';
import valentino from './valentino.jpg';
import versaceEau from './versaceEau.jpg';
import versaceEros from './versaceEros.jpg';
import ysl from './ysl.jpg';
import returnn from './return.png';
import exchange from './exchange.png';
import support from './support.png';
import razorpay from './razorpay.svg';
import stripe from './stripe.svg';
import aboutUs from './aboutUs.jpg';
import contactUs from './contactUs.jpg';

export const assets = {
  logo,
  signature,
  abrielle,
  aquaDiGio,
  chanelCoco,
  dolceGabbana,
  dolceGabbanaOne,
  gucciFlora,
  kilian,
  mad,
  summerLP,
  tomFord,
  valentino,
  versaceEau,
  versaceEros,
  ysl,
  returnn,
  exchange,
  support,
  razorpay,
  stripe,
  aboutUs,
  contactUs,
};

export const products = [
  {
    _id: '001',
    name: 'Tom Ford Black Orchid',
    description: 'A luxurious and sensual fragrance of rich, dark accords and an alluring potion of black orchids and spice.',
    price: 180,
    img: [tomFord],
    season: ['Evening', 'Winter'],
    category: ['Men'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628920000,
    bestSeller: true,
  },
  {
    _id: '002',
    name: 'Dior Sauvage Eau de Parfum',
    description: 'A radically fresh composition, Sauvage is a raw and noble scent with notes of Calabrian bergamot and Ambroxan.',
    price: 145,
    img: [mad],
    category: ['Men', 'Women'],
    season: ['Summer', 'All-Season'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628921000,
    bestSeller: true,
  },
  {
    _id: '003',
    name: 'Versace Eros',
    description: 'A vibrant, fresh, and woody fragrance with notes of mint, green apple, and lemon.',
    price: 120,
    img: [versaceEros],
    season: ['Evening', 'Party'],
    category: ['Men'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628922000,
    bestSeller: true,
  },
  {
    _id: '004',
    name: 'Yves Saint Laurent Y',
    description: 'A fresh and clean fragrance with bergamot, sage, and cedarwood. Perfect for modern men.',
    price: 135,
    img: [ysl],
    category: ['Men', 'Women'],
    season: ['Office', 'All-Season'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628923000,
    bestSeller: false,
  },
  {
    _id: '005',
    name: 'Valentino Uomo',
    description: 'A smooth blend of bergamot, roasted coffee, chocolate, and leather. Elegant and masculine.',
    price: 130,
    img: [valentino],
    category: ['Women'],
    season: ['Winter', 'Date-Night'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628924000,
    bestSeller: false,
  },
  {
    _id: '006',
    name: 'Gucci Flora',
    description: 'Floral and fruity, with notes of peony, rose, and osmanthus. Feminine and romantic.',
    price: 125,
    img: [gucciFlora],
    category: ['Women'],
    season: ['Spring', 'Summer'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628925000,
    bestSeller: true,
  },
  {
    _id: '007',
    name: 'Dolce & Gabbana Light Blue',
    description: 'Fresh and breezy with Sicilian lemon, apple, and cedarwood. A modern classic.',
    price: 110,
    img: [dolceGabbana],
    category: ['Men'],
    season: ['Summer', 'Casual'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628926000,
    bestSeller: true,
  },
  {
    _id: '008',
    name: 'Dolce & Gabbana The One',
    description: 'Warm and spicy with notes of tobacco, amber, and ginger. Seductive and intense.',
    price: 140,
    img: [dolceGabbanaOne],
    category: ['Men'],
    season: ['Evening', 'Winter'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628927000,
    bestSeller: false,
  },
  {
    _id: '009',
    name: 'Chanel Coco Mademoiselle',
    description: 'A strong yet surprisingly fresh scent for bold and elegant women.',
    price: 160,
    img: [chanelCoco],
    category: ['Men', 'Women'],
    season: ['Formal', 'Evening'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628928000,
    bestSeller: true,
  },
  {
    _id: '010',
    name: 'Aqua Di Gio by Giorgio Armani',
    description: 'Marine freshness meets citrus zest and woody base notes. An iconic masculine scent.',
    price: 125,
    img: [aquaDiGio],
    category: ['Men'],
    season: ['Summer', 'Office'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628929000,
    bestSeller: true,
  },
  {
    _id: '011',
    name: 'Kilian Love, Don’t Be Shy',
    description: 'Sweet and luxurious, with notes of neroli, caramel, and vanilla. A gourmand delight.',
    price: 240,
    img: [kilian],
    category: ['Women'],
    season: ['Luxury', 'Night'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628930000,
    bestSeller: false,
  },
  {
    _id: '012',
    name: 'Abrielle Pour Femme',
    description: 'A charming and mysterious blend of floral and woody accords. For confident women.',
    price: 95,
    img: [abrielle],
    category: ['Women'],
    season: ['Autumn', 'Formal'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628931000,
    bestSeller: false,
  },
  {
    _id: '013',
    name: 'ygewfvsdhb67',
    description: 'Floral and fruity, with notes of peony, rose, and osmanthus. Feminine and romantic.',
    price: 125,
    img: [gucciFlora],
    category: ['Women'],
    season: ['Spring', 'Summer'],
    size: ['10ML', '50ML', '100ML'],
    date: 1642628925000,
    bestSeller: true,
  },
];
