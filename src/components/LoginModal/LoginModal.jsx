import { useForm } from 'react-hook-form';
import css from './LoginModal.module.css';
import { useDispatch } from 'react-redux';
import { setLoginModalOpen } from '../../redux/teachers/slice';
import { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa6';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { signInUser } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

function LoginModal() {
  const dispatch = useDispatch();

  const [viewPassword, setViewPassword] = useState(false);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        dispatch(setLoginModalOpen(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const ValidationSchema = yup.object().shape({
    email: yup.string().email().required('Must be filled in'),
    password: yup.string().min(8).max(16).required('Must be filled in'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ValidationSchema) });

  async function logIn(data) {
    dispatch(signInUser({ email: data.email, password: data.password })).then(
      () => {
        toast.success('You Are Successfully logged in!');
        dispatch(setLoginModalOpen(false));
      }
    );

    reset();
  }

  function handleCloseByX() {
    dispatch(setLoginModalOpen(false));
  }

  function handleCloseByDrop(event) {
    if (event.target === event.currentTarget) {
      dispatch(setLoginModalOpen(false));
    }
  }

  function handleViewPassword() {
    setViewPassword(prevState => !prevState);
  }

  return (
    <div className={css.backDrop} onClick={handleCloseByDrop}>
      <div className={css.modalContainer}>
        <h2 className={css.h2Login}>Log In</h2>
        <p className={css.pText}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>

        <form className={css.loginForm} onSubmit={handleSubmit(logIn)}>
          <div className={css.inputs}>
            <input
              className={css.inputEmail}
              type="text"
              placeholder="Email"
              {...register('email')}
            />
            <p className={css.errorMessage}>{errors.email?.message}</p>
            <div className={css.passwordDiv}>
              <input
                type={viewPassword ? 'text' : 'password'}
                className={css.inputPassword}
                {...register('password')}
                placeholder="Password"
              />
              <p className={css.errorMessage}>{errors.password?.message}</p>
              <button
                className={css.eyesBtn}
                type="button"
                onClick={handleViewPassword}
              >
                {viewPassword ? (
                  <FaRegEye className={css.FaRegEye} />
                ) : (
                  <svg className={css.eyesIcon} color="black">
                    <use href="../../../public/sprite.svg#eye-off"></use>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button className={css.submitBtn} type="submit">
            Log in
          </button>
        </form>
        <button className={css.closeBtn} type="button" onClick={handleCloseByX}>
          <svg className={css.iconClose}>
            <use href="../../../public/sprite.svg#close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
