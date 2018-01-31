import {combineReducers} from 'redux';
// You have to import every reducers and combine them.
import {reducer as CategoryReducer} from './CategoryRedux';
import {reducer as ProductRedux} from './ProductRedux';
import {reducer as NetInfoReducer} from './NetInfoRedux';
import {reducer as ToastReducer} from './ToastRedux';
import {reducer as UserRedux} from './UserRedux';
import {reducer as CartRedux} from './CartRedux';
import {reducer as WishListRedux} from './WishListRedux';
import {reducer as NewsRedux} from './NewsRedux';
import {reducer as LayoutRedux} from './LayoutRedux';
import {reducer as PaymentRedux} from './PaymentRedux';
import {reducer as CountryRedux} from './CountryRedux';

export default combineReducers({
  categories: CategoryReducer,
  products: ProductRedux,
  netInfo: NetInfoReducer,
  toast: ToastReducer,
  user: UserRedux,
  carts: CartRedux,
  wishList: WishListRedux,
  news: NewsRedux,
  layouts: LayoutRedux,
  payments: PaymentRedux,
  countries: CountryRedux,
});