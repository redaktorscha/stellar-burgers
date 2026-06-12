// src/services/slices/__tests__/profile-orders-slice.test.ts
import {
  TProfileOrdersState,
  profileOrdersReducer,
  fetchProfileOrders
} from '../slices/profile-orders-slice';
import { TOrder } from '../../utils/types';

const initialState: TProfileOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

const mockOrders: TOrder[] = [
  {
    _id: 'order1',
    status: 'done',
    name: 'Мой бургер 1',
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T10:05:00Z',
    number: 123,
    ingredients: ['ing1', 'ing2']
  },
  {
    _id: 'order2',
    status: 'pending',
    name: 'Мой бургер 2',
    createdAt: '2025-01-02T12:00:00Z',
    updatedAt: '2025-01-02T12:10:00Z',
    number: 124,
    ingredients: ['ing3']
  }
];

describe('profileOrders slice', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const newState = profileOrdersReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(newState).toEqual(initialState);
  });

  describe('fetchProfileOrders', () => {
    it('должен установить isLoading в true и сбросить error при pending', () => {
      const action = { type: fetchProfileOrders.pending.type };
      const newState = profileOrdersReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен записать заказы и сбросить isLoading при fulfilled', () => {
      const action = {
        type: fetchProfileOrders.fulfilled.type,
        payload: mockOrders
      };
      const newState = profileOrdersReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.orders).toEqual(mockOrders);
      expect(newState.error).toBeNull();
    });

    it('должен записать ошибку и сбросить isLoading при rejected', () => {
      const errorMessage = 'Не удалось загрузить историю заказов';
      const action = {
        type: fetchProfileOrders.rejected.type,
        payload: errorMessage
      };
      const newState = profileOrdersReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.orders).toEqual([]);
    });
  });
});
