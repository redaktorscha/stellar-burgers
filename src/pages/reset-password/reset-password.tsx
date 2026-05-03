import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { clearPasswordError, resetPassword } from '../../services/slices';
import { selectPasswordError } from '../../services/selectors';

export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const errorText = useSelector(selectPasswordError) || undefined;

  useEffect(() => {
    dispatch(clearPasswordError());
  }, [dispatch]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(resetPassword({ password, token }));

    if (resetPassword.fulfilled.match(resultAction)) {
      localStorage.removeItem('resetPassword');
      navigate('/login');
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={errorText}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
