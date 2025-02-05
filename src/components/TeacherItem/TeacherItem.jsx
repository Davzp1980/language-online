/* eslint-disable react/prop-types */
import { useState } from 'react';
import css from './TeacherItem.module.css';
import sprite from '/sprite.svg';
import { v4 as uuidv4 } from 'uuid';
import Reviews from '../Reviews/Reviews';
import TrialLessonButton from '../TrialLessonButton/TrialLessonButton';
import { useDispatch, useSelector } from 'react-redux';

import { addToFavorite, deleteFromFavorite } from '../../redux/teachers/slice';
import {
  selectFavorites,
  selectIsBookModalOpen,
} from '../../redux/teachers/selectors';
import { selectIsloggedIn } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import BookTrialLessonForm from '../BookTrialLessonForm/BookTrialLessonForm';

function TeacherItem({ teacher }) {
  const [isOpenReadMore, setIsOpenReadMore] = useState(false);

  const isOpenBookModal = useSelector(selectIsBookModalOpen);
  const isLoggedIn = useSelector(selectIsloggedIn);
  const favorite = useSelector(selectFavorites);

  let isFavoriteTeacher = favorite.some(teach => teach.id === teacher.id);

  const dispatch = useDispatch();

  function handleFavorite() {
    if (isLoggedIn === false) {
      toast.error('Feature available only to registered users!');
      return;
    }

    // setIsFavorite(prev => !prev);
    if (isFavoriteTeacher === true) {
      dispatch(deleteFromFavorite(teacher.avatar_url));
      isFavoriteTeacher = false;
      return;
    }

    dispatch(addToFavorite(teacher));
  }

  function handleReviews() {
    setIsOpenReadMore(prev => !prev);
  }
  return (
    <div className={css.container}>
      <div className={css.logoContainer}>
        <img
          className={css.logo}
          src={teacher.avatar_url}
          alt="teacher avatar"
        />

        <div className={css.dot}>
          <div className={css.greenDot}></div>
        </div>
      </div>
      <div className={css.descriptionContainer}>
        <div className={css.descriptionHeader}>
          <div className={css.teacherHeader}>
            <div className={css.teacherName}>
              <p>Languages</p>
              <h2
                className={css.name}
              >{`${teacher.name} ${teacher.surname}`}</h2>
            </div>
            <div className={css.teacherRating}>
              <div className={css.ratingItem}>
                <svg className={css.svg}>
                  <use href={sprite + '#book'}></use>
                </svg>
                <p className={css.ratingItemP}>Lessons online</p>
              </div>
              <div className={css.line}></div>
              <div className={css.ratingItem}>
                <p className={css.ratingItemP}>
                  Lessons done: {teacher.lessons_done}
                </p>
              </div>
              <div className={css.line}></div>
              <div className={css.ratingItem}>
                <svg className={css.svg}>
                  <use href="/sprite.svg#logo"></use>
                </svg>
                <p className={css.ratingItemP}>Rating: {teacher.rating}</p>
              </div>
              <div className={css.line}></div>
              <div className={css.ratingItem}>
                <p className={css.ratingItemP}>
                  Price / 1 hour:{' '}
                  <span className={css.priceSpan}>
                    {teacher.price_per_hour} $
                  </span>
                </p>
              </div>

              <button
                className={css.favoriteBtn}
                type="button"
                onClick={handleFavorite}
              >
                <svg className={css.favoriteIcon}>
                  <use
                    href={
                      isFavoriteTeacher
                        ? 'sprite.svg#heart-hover'
                        : 'sprite.svg#heart'
                    }
                  ></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={css.speakLessCondDiv}>
          <p>
            <span className={css.grayText}>Speaks:</span>{' '}
            <span className={css.underline}>
              {teacher.languages?.join(', ')}
            </span>
          </p>
          <p>
            <span className={css.grayText}>Lesson Info:</span>{' '}
            <span className={css.textP}>{teacher.lesson_info}</span>
          </p>
          <p className={css.conditions}>
            <span className={css.grayText}>Conditions:</span>{' '}
            <span className={css.textP}>{teacher.conditions.join(' ')}</span>
          </p>
          {isOpenReadMore && (
            <p className={css.experience}>{teacher.experience}</p>
          )}
        </div>

        {isOpenReadMore ? (
          ''
        ) : (
          <button
            className={css.readMoreBtn}
            type="button"
            onClick={handleReviews}
          >
            Read More
          </button>
        )}
        {isOpenReadMore && <Reviews reviews={teacher.reviews} />}

        <ul className={css.levelsList}>
          {teacher.levels?.map(level => {
            return (
              <li className={css.listItem} key={uuidv4()}>
                {level}
              </li>
            );
          })}
        </ul>
        {isOpenReadMore && <TrialLessonButton teacher={teacher} />}
      </div>
      {isOpenBookModal && <BookTrialLessonForm />}
    </div>
  );
}

export default TeacherItem;
