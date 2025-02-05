/* eslint-disable react/prop-types */
import css from './Reviews.module.css';
import { RxAvatar } from 'react-icons/rx';
import { v4 as uuidv4 } from 'uuid';

function Reviews({ reviews }) {
  return (
    <div className={css.container}>
      <ul>
        {reviews?.map(review => (
          <li className={css.reviewLi} key={uuidv4()}>
            <div className={css.avatarContainer}>
              <RxAvatar size={44} />
              <div className={css.nameContainer}>
                <p className={css.name}>{review.reviewer_name}</p>
                <div className={css.ratingDiv}>
                  <svg className={css.svg}>
                    <use href="/sprite.svg#logo"></use>
                  </svg>
                  <p className={css.rating}>{review.reviewer_rating}.0</p>
                </div>
              </div>
            </div>
            <p className={css.reviewMessage}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
