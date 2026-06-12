import {
  forgotPassword,
  resetPassword,
  clearPasswordError,
  TPasswordState,
  passwordReducer
} from '../slices/password-slice';

const initialState: TPasswordState = {
  isLoading: false,
  error: null
};

describe('password slice', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const newState = passwordReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });

  it('должен обработать clearPasswordError', () => {
    const modifiedState = {
      isLoading: false,
      error: 'Some error'
    };
    const newState = passwordReducer(modifiedState, clearPasswordError());
    expect(newState.error).toBeNull();
  });

  describe('forgotPassword', () => {
    it('должен установить isLoading в true и сбросить error при pending', () => {
      const action = { type: forgotPassword.pending.type };
      const newState = passwordReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен сбросить isLoading при fulfilled', () => {
      const action = { type: forgotPassword.fulfilled.type };
      const newState = passwordReducer(
        { ...initialState, isLoading: true },
        action
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBeNull();
    });

    it('должен записать ошибку и сбросить isLoading при rejected', () => {
      const errorMessage = 'Не удалось отправить письмо для восстановления';
      const action = {
        type: forgotPassword.rejected.type,
        payload: errorMessage
      };
      const newState = passwordReducer(
        { ...initialState, isLoading: true },
        action
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe('resetPassword', () => {
    it('должен установить isLoading в true и сбросить error при pending', () => {
      const action = { type: resetPassword.pending.type };
      const newState = passwordReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it('должен сбросить isLoading при fulfilled', () => {
      const action = { type: resetPassword.fulfilled.type };
      const newState = passwordReducer(
        { ...initialState, isLoading: true },
        action
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBeNull();
    });

    it('должен записать ошибку и сбросить isLoading при rejected', () => {
      const errorMessage = 'Не удалось сбросить пароль';
      const action = {
        type: resetPassword.rejected.type,
        payload: errorMessage
      };
      const newState = passwordReducer(
        { ...initialState, isLoading: true },
        action
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(errorMessage);
    });
  });
});
