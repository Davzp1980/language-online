import { useDispatch } from 'react-redux';
import css from './RegisterModal.module.css';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setRegisterModalOpen } from '../../redux/teachers/slice';
import { useForm } from 'react-hook-form';
import { FaRegEye } from 'react-icons/fa6';
import { signUpUser } from '../../redux/auth/operations';
import { enableScroll } from '../utils';
import toast from 'react-hot-toast';

function RegisterModal() {
  const dispatch = useDispatch();

  const [viewPassword, setViewPassword] = useState(false);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        dispatch(setRegisterModalOpen(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const ValidationSchema = yup.object().shape({
    name: yup.string().min(3).required('Must be filled in'),
    email: yup.string().email().required('Must be filled in'),
    password: yup.string().min(8).max(16).required('Must be filled in'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ValidationSchema) });

  function SignUp(data) {
    dispatch(
      signUpUser({
        email: data.email,
        password: data.password,
        displayName: data.name,
      })
    ).then(() => {
      dispatch(setRegisterModalOpen(false));
      toast.success('User successfully registered!');
    });
    enableScroll();

    reset();
  }

  function handleCloseByX() {
    dispatch(setRegisterModalOpen(false));
    enableScroll();
  }

  function handleCloseByDrop(event) {
    if (event.target === event.currentTarget) {
      dispatch(setRegisterModalOpen(false));
      enableScroll();
    }
  }

  function handleViewPassword() {
    setViewPassword(prevState => !prevState);
  }

  return (
    <div className={css.backDrop} onClick={handleCloseByDrop}>
      <div className={css.modalContainer}>
        <h2 className={css.h2Login}>Registration</h2>
        <p className={css.pText}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>

        <form className={css.loginForm} onSubmit={handleSubmit(SignUp)}>
          <div className={css.inputs}>
            <input
              className={css.inputEmail}
              type="text"
              placeholder="Name"
              {...register('name')}
            />
            <p className={css.errorMessage}>{errors.name?.message}</p>
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
                    <use href="/sprite.svg#eye-off"></use>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button className={css.submitBtn} type="submit">
            Sign Up
          </button>
        </form>
        <button className={css.closeBtn} type="button" onClick={handleCloseByX}>
          <svg className={css.iconClose}>
            <use href="/sprite.svg#close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default RegisterModal;
