import Images from "./Images"
import Constants from './Constants'

export default {

   WooCommerce: {
     url: 'http://foodspace.in',
     consumerKey: 'ck_283abfef60bfa08a8767cab528938d979e6df215',
     consumerSecret: 'cs_c0dd399d6a073e04114037e5537fad178b854966',
   },

  ProductSize: {
    enable: false,
    CatalogImages: {width: 300, height: 360},
    SingleProductImage: {width: 600, height: 720},
    ProductThumbnails: {width: 180, height: 216},
  },

  HorizonLayout: [
    {tag: 32, paging: true, layout: Constants.Layout.miniBanner},
    {name: "Featured", category: 39, image: Images.Banner.Feature, layout: Constants.Layout.threeColumn},
    {name: "Rice", category: 41, image: Images.Banner.Woman, layout: Constants.Layout.twoColumn},
    {name: "Lentils", category: 40, image: Images.Banner.Bag, layout: Constants.Layout.twoColumn},
    {name: "Flour", category: 42, image: Images.Banner.Man, layout: Constants.Layout.twoColumn},
    {name: "Beans", category: 80, image: Images.Banner.Man, layout: Constants.Layout.twoColumn},
  ],

  Payments: {
    bacs: require('@images/payment_logo/PayPal.png'),
    cod: require('@images/payment_logo/cash_on_delivery.png'),
    paypal: require('@images/payment_logo/PayPal.png'),
    stripe: require('@images/payment_logo/stripe.png'),
  },

  shipping : {
    visible: true,
    time: {
      free_shipping: 'Minimum order amount of ₹250',
      flat_rate: '1 - 4 Days',
      local_pickup: '1 - 4 Days',
    }
  },
  showStatusBar: false,
  LogoImage: require('@images/new_logo.png'),
  LogoWithText: require('@images/logo_with_text.png'),
  LogoLoading: require('@images/logo.png'),
  appFacebookId: '136114297071953',
  CustomPages: {contact_id: 4417},
  WebPages: {marketing: 'http://foodspace.in/about-us/'},
};
