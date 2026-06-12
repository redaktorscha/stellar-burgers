import {
  authReducer,
  registerUser,
  loginUser,
  fetchUser,
  updateUser,
  logoutUser,
  setAuthChecked,
  clearAuthError,
  clearUpdateUserError,
  TAuthState
} from '../slices/auth-slice';

describe('auth slice', () => {
  const initialState: TAuthState = {
    user: null,
    isAuthChecked: false,
    isLoading: false,
    error: null,
    updateUserError: null
  };
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const state = authReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('должен обработать setAuthChecked', () => {
    const newState = authReducer(initialState, setAuthChecked(true));
    expect(newState.isAuthChecked).toBe(true);
  });

  it('должен обработать clearAuthError', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const newState = authReducer(stateWithError, clearAuthError());
    expect(newState.error).toBeNull();
  });

  it('должен обработать clearUpdateUserError', () => {
    const stateWithError = { ...initialState, updateUserError: 'Update error' };
    const newState = authReducer(stateWithError, clearUpdateUserError());
    expect(newState.updateUserError).toBeNull();
  });

  describe('registerUser', () => {
    it('должен установить isLoading в true при pending', () => {
      const action = { type: registerUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен записать пользователя и сбросить isLoading при fulfilled', () => {
      const mockUser = { email: 'test@test.com', name: 'Test User' };
      const action = { type: registerUser.fulfilled.type, payload: mockUser };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toEqual(mockUser);
      expect(newState.error).toBeNull();
    });

    it('должен записать ошибку и сбросить isLoading при rejected', () => {
      const errorMessage = 'Registration failed';
      const action = {
        type: registerUser.rejected.type,
        payload: errorMessage
      };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toBeNull();
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe('loginUser', () => {
    it('должен установить isLoading в true при pending', () => {
      const action = { type: loginUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
    });

    it('должен записать пользователя и сбросить isLoading при fulfilled', () => {
      const mockUser = { email: 'test@test.com', name: 'Test User' };
      const action = { type: loginUser.fulfilled.type, payload: mockUser };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toEqual(mockUser);
    });

    it('должен записать ошибку при rejected', () => {
      const errorMessage = 'Login failed';
      const action = { type: loginUser.rejected.type, payload: errorMessage };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe('fetchUser', () => {
    it('должен установить isLoading в true при pending', () => {
      const action = { type: fetchUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
    });

    it('должен записать пользователя и сбросить isLoading при fulfilled', () => {
      const mockUser = { email: 'test@test.com', name: 'Test User' };
      const action = { type: fetchUser.fulfilled.type, payload: mockUser };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toEqual(mockUser);
    });

    it('должен сбросить пользователя и записать ошибку при rejected', () => {
      const errorMessage = 'Fetch user failed';
      const action = { type: fetchUser.rejected.type, payload: errorMessage };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toBeNull();
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe('updateUser', () => {
    it('должен установить isLoading в true при pending', () => {
      const action = { type: updateUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.updateUserError).toBeNull();
    });

    it('должен обновить пользователя и сбросить ошибку при fulfilled', () => {
      const updatedUser = { email: 'new@test.com', name: 'New Name' };
      const action = { type: updateUser.fulfilled.type, payload: updatedUser };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.user).toEqual(updatedUser);
      expect(newState.updateUserError).toBeNull();
    });

    it('должен записать ошибку обновления при rejected', () => {
      const errorMessage = 'Update failed';
      const action = { type: updateUser.rejected.type, payload: errorMessage };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.updateUserError).toBe(errorMessage);
    });
  });

  describe('logoutUser', () => {
    it('должен установить isLoading в true при pending', () => {
      const action = { type: logoutUser.pending.type };
      const newState = authReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
    });

    it('должен сбросить пользователя и флаги при fulfilled', () => {
      const loggedInState = {
        ...initialState,
        user: { email: 'test@test.com', name: 'Test' },
        isAuthChecked: true
      };
      const action = { type: logoutUser.fulfilled.type };
      const newState = authReducer(loggedInState, action);
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.isLoading).toBe(false);
    });

    it('должен сбросить пользователя и флаги при rejected', () => {
      const loggedInState = {
        ...initialState,
        user: { email: 'test@test.com', name: 'Test' },
        isAuthChecked: true
      };
      const action = { type: logoutUser.rejected.type };
      const newState = authReducer(loggedInState, action);
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.isLoading).toBe(false);
    });
  });
});
