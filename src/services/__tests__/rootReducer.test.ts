import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../slices/ingredients-slice';
import { constructorReducer } from '../slices/constructor-slice';
import { feedReducer } from '../slices/feed-slice';
import { profileOrdersReducer } from '../slices/profile-orders-slice';
import { orderDetailsReducer } from '../slices/order-details-slice';
import { passwordReducer } from '../slices/password-slice';
import { authReducer } from '../slices/auth-slice';

describe('rootReducer', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const testReducer = combineReducers({
      ingredients: ingredientsReducer,
      burgerConstructor: constructorReducer,
      feed: feedReducer,
      profileOrders: profileOrdersReducer,
      orderDetails: orderDetailsReducer,
      password: passwordReducer,
      auth: authReducer
    });
    const initialState = testReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual({
      ingredients: { items: [], isLoading: false, error: null },
      burgerConstructor: {
        constructorItems: { bun: null, ingredients: [] },
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      profileOrders: { orders: [], isLoading: false, error: null },
      orderDetails: { order: null, isLoading: false, error: null },
      password: { isLoading: false, error: null },
      auth: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null,
        updateUserError: null
      }
    });
  });
});
