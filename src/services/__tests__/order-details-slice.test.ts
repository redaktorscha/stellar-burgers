import {
  orderDetailsReducer,
  fetchOrderByNumber,
  clearOrderDetails
} from '../slices/order-details-slice';
import { TOrder } from '../../utils/types';

describe('orderDetails slice', () => {
  const initialState = {
    order: null,
    isLoading: false,
    error: null
  };

  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const newState = orderDetailsReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });

  it('должен обработать clearOrderDetails', () => {
    const modifiedState = {
      order: { _id: '123', number: 1 } as TOrder,
      isLoading: true,
      error: 'Ошибка загрузки'
    };
    const newState = orderDetailsReducer(modifiedState, clearOrderDetails());
    expect(newState).toEqual(initialState);
  });

  describe('fetchOrderByNumber', () => {
    it('должен установить isLoading в true и сбросить error при pending', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const newState = orderDetailsReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен записать заказ и сбросить isLoading при fulfilled', () => {
      const mockOrder = {
        number: 42,
        _id: 'order42',
        status: 'done'
      } as TOrder;
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const newState = orderDetailsReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.order).toEqual(mockOrder);
      expect(newState.error).toBeNull();
    });

    it('должен записать ошибку и сбросить isLoading при rejected', () => {
      const errorMessage = 'Не удалось загрузить заказ';
      const action = {
        type: fetchOrderByNumber.rejected.type,
        payload: errorMessage
      };
      const newState = orderDetailsReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.order).toBeNull();
    });
  });
});
