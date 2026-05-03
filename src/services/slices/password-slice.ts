import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { forgotPasswordApi, resetPasswordApi } from '../../utils/burger-api';

type TPasswordState = {
  isLoading: boolean;
  error: string | null;
};

const initialState: TPasswordState = {
  isLoading: false,
  error: null
};

export const forgotPassword = createAsyncThunk(
  'password/forgotPassword',
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);
    } catch (error) {
      return rejectWithValue(
        (error as { message?: string }).message ||
          'Не удалось отправить письмо для восстановления'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'password/resetPassword',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    try {
      await resetPasswordApi(data);
    } catch (error) {
      return rejectWithValue(
        (error as { message?: string }).message || 'Не удалось сбросить пароль'
      );
    }
  }
);

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    clearPasswordError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Ошибка восстановления пароля';
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Ошибка сброса пароля';
      });
  }
});

export const { clearPasswordError } = passwordSlice.actions;

export const passwordReducer = passwordSlice.reducer;
