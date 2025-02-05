/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import css from './TrialLessonButton.module.css';
import { addModalData, setBookModalOpen } from '../../redux/teachers/slice';

function TrialLessonButton({ teacher }) {
  const dispatch = useDispatch();

  function handleBookModal() {
    dispatch(setBookModalOpen(true));
    dispatch(addModalData(teacher));
  }
  return (
    <button className={css.button} type="button" onClick={handleBookModal}>
      Book trial lesson
    </button>
  );
}

export default TrialLessonButton;
