import {
  ingredientsReducer,
  fetchIngredients,
  TIngredientsState
} from '../slices/ingredients-slice';

import { TIngredient } from '../../utils/types';

describe('ingredients slice', () => {
  const initialState: TIngredientsState = {
    items: [],
    isLoading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Ингредиент 1',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    }
  ];
  it('должен установить isLoading в true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('должен записать данные и сбросить isLoading при fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.items).toEqual(mockIngredients);
    expect(newState.error).toBeNull();
  });

  it('должен записать ошибку и сбросить isLoading при fetchIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(errorMessage);
    expect(newState.items).toEqual([]);
  });
});
