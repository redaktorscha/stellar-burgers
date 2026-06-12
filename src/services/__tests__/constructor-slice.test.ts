import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  TConstructorState
} from '../slices/constructor-slice';
import { TIngredient } from '../../utils/types';

describe('burgerConstructor slice', () => {
  const initialState: TConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };
  const mockBun: TIngredient = {
    _id: 'bun1',
    name: 'Тестовая булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const mockIngredient: TIngredient = {
    _id: 'main1',
    name: 'Тестовая начинка',
    type: 'main',
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 50,
    price: 50,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  it('должен обработать addIngredient для булки', () => {
    const action = addIngredient(mockBun);
    const newState = constructorReducer(initialState, action);
    expect(newState.constructorItems.bun).toEqual(mockBun);
    expect(newState.constructorItems.ingredients).toHaveLength(0);
  });

  it('должен обработать addIngredient для начинки (с добавлением id)', () => {
    const action = addIngredient(mockIngredient);
    const newState = constructorReducer(initialState, action);
    expect(newState.constructorItems.bun).toBeNull();
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    const added = newState.constructorItems.ingredients[0];
    expect(added._id).toBe(mockIngredient._id);
    expect(added.name).toBe(mockIngredient.name);
    expect(added.id).toBeDefined();
    expect(added).toEqual(
      expect.objectContaining({
        ...mockIngredient,
        id: expect.any(String)
      })
    );
  });

  it('должен обработать removeIngredient', () => {
    let state = constructorReducer(initialState, addIngredient(mockIngredient));
    const ingredientId = state.constructorItems.ingredients[0].id;

    state = constructorReducer(state, removeIngredient(ingredientId));
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('должен обработать moveIngredientUp', () => {
    let state = constructorReducer(initialState, addIngredient(mockIngredient));
    const secondMock = { ...mockIngredient, _id: 'main2' };
    state = constructorReducer(state, addIngredient(secondMock));
    const ids = state.constructorItems.ingredients.map((i) => i._id);

    state = constructorReducer(state, moveIngredientUp(1));
    const newIds = state.constructorItems.ingredients.map((i) => i._id);
    expect(newIds).toEqual([ids[1], ids[0]]);
  });

  it('должен обработать moveIngredientDown', () => {
    let state = constructorReducer(initialState, addIngredient(mockIngredient));
    const secondMock = { ...mockIngredient, _id: 'main2' };
    state = constructorReducer(state, addIngredient(secondMock));
    const ids = state.constructorItems.ingredients.map((i) => i._id);
    state = constructorReducer(state, moveIngredientDown(0));
    const newIds = state.constructorItems.ingredients.map((i) => i._id);
    expect(newIds).toEqual([ids[1], ids[0]]);
  });
});
