import { TConstructorItems } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  orderError: string | null;
  price: number;
  orderModalData: {
    number: number;
  } | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
