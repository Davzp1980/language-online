/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import css from './BookTrialLessonForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setBookModalOpen } from '../../redux/teachers/slice';
import { useEffect } from 'react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectModalBookData } from '../../redux/teachers/selectors';

function BookTrialLessonForm() {
  const dispatch = useDispatch();
  const currentTeacher = useSelector(selectModalBookData);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        dispatch(setBookModalOpen(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const ValidationSchema = yup.object().shape({
    fullName: yup.string().min(3).max(50).required('Must be filled in'),
    email: yup.string().email().required('Must be filled in'),
    phoneNumber: yup.string().min(8).max(8).required('Must be filled in'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ValidationSchema) });

  function logIn() {
    reset();
  }

  function handleCloseByX() {
    dispatch(setBookModalOpen(false));
  }

  function handleCloseByDrop(event) {
    if (event.target === event.currentTarget) {
      dispatch(setBookModalOpen(false));
    }
  }

  return (
    <div className={css.backDrop} onClick={handleCloseByDrop}>
      <div className={css.modalContainer}>
        <h2 className={css.h2Login}>Book trial lesson</h2>
        <p className={css.pText}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={css.teacherDiv}>
          <img
            className={css.teacherAvatar}
            src={currentTeacher.avatar_url}
            alt="avatar"
          />
          <div className={css.nameDiv}>
            <p className={css.yourTeacher}>Your teacher</p>
            <p className={css.teachersName}>
              {`${currentTeacher.name} ${currentTeacher.surname}`}
            </p>
          </div>
        </div>

        <p className={css.reasonP}>
          What is your main reason for learning English?
        </p>

        <form className={css.loginForm} onSubmit={handleSubmit(logIn)}>
          <div className={css.radioButtons}>
            <label className={css.radioLabel}>
              <input
                className={css.radioInput}
                type="radio"
                name="radio"
                value="Career and business"
                defaultChecked
                {...register('radio', { required: true })}
              />
              <span className={css.customRadio}></span>
              Career and business
            </label>
            <label className={css.radioLabel}>
              <input
                className={css.radioInput}
                type="radio"
                name="radio"
                value="Lesson for kids"
                {...register('radio', { required: true })}
              />
              <span className={css.customRadio}></span>
              Lesson for kids
            </label>
            <label className={css.radioLabel}>
              <input
                className={css.radioInput}
                type="radio"
                name="radio"
                value="Living abroad"
                {...register('radio', { required: true })}
              />
              <span className={css.customRadio}></span>
              Living abroad
            </label>
            <label className={css.radioLabel}>
              <input
                className={css.radioInput}
                type="radio"
                name="radio"
                value="Exams and coursework"
                {...register('radio', { required: true })}
              />
              <span className={css.customRadio}></span>
              Exams and coursework
            </label>
            <label className={css.radioLabel}>
              <input
                className={css.radioInput}
                type="radio"
                name="radio"
                value="Culture, travel or hobby"
                {...register('radio', { required: true })}
              />
              <span className={css.customRadio}></span>
              Culture, travel or hobby
            </label>
          </div>
          <div className={css.inputs}>
            <input
              className={css.inputEmail}
              type="text"
              placeholder="Full Name"
              {...register('fullName')}
            />
            <p className={css.errorMessage}>{errors.fullName?.message}</p>
            <input
              className={css.inputEmail}
              type="text"
              placeholder="Email"
              {...register('email')}
            />
            <p className={css.errorMessage}>{errors.email?.message}</p>
            <input
              className={css.inputEmail}
              type="text"
              placeholder="Phone number"
              {...register('phoneNumber')}
            />
            <p className={css.errorMessage}>{errors.phoneNumber?.message}</p>
          </div>
          <button className={css.submitBtn} type="submit">
            Book
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

export default BookTrialLessonForm;
