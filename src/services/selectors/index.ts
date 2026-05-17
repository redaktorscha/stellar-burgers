import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedData = createSelector(
  [
    (state: RootState) => state.feed.total,
    (state: RootState) => state.feed.totalToday
  ],
  (total, totalToday) => ({
    total: total || 0,
    totalToday: totalToday || 0
  })
);
export const selectFeedLoading = (state: RootState) => state.feed.isLoading;
export const selectFeedError = (state: RootState) => state.feed.error;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;
export const selectProfileOrdersError = (state: RootState) =>
  state.profileOrders.error;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.constructorItems;
export const selectOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;
export const selectConstructorError = (state: RootState) =>
  state.burgerConstructor.error;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUpdateUserError = (state: RootState) =>
  state.auth.updateUserError;

export const selectOrderDetails = (state: RootState) =>
  state.orderDetails.order;
export const selectOrderDetailsLoading = (state: RootState) =>
  state.orderDetails.isLoading;
export const selectOrderDetailsError = (state: RootState) =>
  state.orderDetails.error;

export const selectPasswordError = (state: RootState) => state.password.error;
export const selectPasswordLoading = (state: RootState) =>
  state.password.isLoading;
