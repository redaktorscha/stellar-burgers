import { feedReducer, fetchFeed, TFeedState } from '../slices/feed-slice';
import { TOrder } from '../../utils/types';

describe('feed slice', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: 'order1',
      status: 'done',
      name: 'Бургер 1',
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:05:00Z',
      number: 123,
      ingredients: ['ing1', 'ing2']
    },
    {
      _id: 'order2',
      status: 'pending',
      name: 'Бургер 2',
      createdAt: '2025-01-02T12:00:00Z',
      updatedAt: '2025-01-02T12:10:00Z',
      number: 124,
      ingredients: ['ing3']
    }
  ];

  const mockFeedResponse = {
    orders: mockOrders,
    total: 100,
    totalToday: 5
  };

  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const newState = feedReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });

  describe('fetchFeed', () => {
    it('должен установить isLoading в true и сбросить error при pending', () => {
      const action = { type: fetchFeed.pending.type };
      const newState = feedReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен записать данные ленты и сбросить isLoading при fulfilled', () => {
      const action = {
        type: fetchFeed.fulfilled.type,
        payload: mockFeedResponse
      };
      const newState = feedReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.orders).toEqual(mockOrders);
      expect(newState.total).toBe(100);
      expect(newState.totalToday).toBe(5);
      expect(newState.error).toBeNull();
    });

    it('должен записать ошибку и сбросить isLoading при rejected', () => {
      const errorMessage = 'Не удалось загрузить ленту заказов';
      const action = {
        type: fetchFeed.rejected.type,
        payload: errorMessage
      };
      const newState = feedReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      // Данные не должны измениться
      expect(newState.orders).toEqual([]);
      expect(newState.total).toBe(0);
      expect(newState.totalToday).toBe(0);
    });
  });
});
