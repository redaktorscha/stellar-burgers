import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectFeedOrders,
  selectIngredients,
  selectOrderDetails,
  selectOrderDetailsError,
  selectOrderDetailsLoading,
  selectProfileOrders
} from '../../services/selectors';
import { fetchOrderByNumber } from '../../services/slices';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();

  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const feedOrders = useSelector(selectFeedOrders);
  const profileOrders = useSelector(selectProfileOrders);
  const fetchedOrder = useSelector(selectOrderDetails);
  const orderError = useSelector(selectOrderDetailsError);
  const isOrderLoading = useSelector(selectOrderDetailsLoading);

  const orderNumber = Number(number);

  const orderFromLists =
    feedOrders.find((order) => order.number === orderNumber) ||
    profileOrders.find((order) => order.number === orderNumber) ||
    null;

  useEffect(() => {
    if (!orderNumber || orderFromLists) return;
    dispatch(fetchOrderByNumber(orderNumber));
  }, [dispatch, orderNumber, orderFromLists]);

  const orderData =
    orderFromLists ||
    (fetchedOrder?.number === orderNumber ? fetchedOrder : null);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isOrderLoading || (!orderInfo && !orderError)) {
    return <Preloader />;
  }

  if (orderError && !orderInfo) {
    return (
      <div
        className='pt-10 text text_type_main-medium'
        style={{ color: 'red' }}
      >
        {orderError}
      </div>
    );
  }

  if (!orderInfo) {
    return null;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
