import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices';
import {
  selectProfileOrdersError,
  selectProfileOrders,
  selectProfileOrdersLoading
} from '../../services/selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);
  const error = useSelector(selectProfileOrdersError);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  if (error && !orders.length) {
    return (
      <div
        className='pt-10 text text_type_main-medium'
        style={{ color: 'red' }}
      >
        {error}
      </div>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
