export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  orderError: string | null;
  price: number;
  orderModalData: {
    number: number;
  } | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
