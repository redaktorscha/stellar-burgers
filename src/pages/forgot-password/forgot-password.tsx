import { FC, useEffect, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { clearPasswordError, forgotPassword } from '../../services/slices';
import { selectPasswordError } from '../../services/selectors';

export const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const errorText = useSelector(selectPasswordError) || undefined;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearPasswordError());
  }, [dispatch]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(forgotPassword({ email }));

    if (forgotPassword.fulfilled.match(resultAction)) {
      localStorage.setItem('resetPassword', 'true');
      navigate('/reset-password', { replace: true });
    }
  };

  return (
    <ForgotPasswordUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
