import { useNavigate } from 'react-router';
import css from './Home.module.css';

function Home() {
  const navigate = useNavigate();

  function handleGetStarted() {
    navigate('/teachers');
  }
  return (
    <div className={css.container}>
      <div className={css.mainHomeContainer}>
        <div className={css.leftMain}>
          <h1 className={css.h1}>
            Unlock your potential with the best{' '}
            <span className={css.languageContainer}>
              <span className={css.spanLanguage}>language </span>
              <span className={css.spanBackground}></span>
            </span>{' '}
            tutors
          </h1>
          <p className={css.p}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button
            className={css.GetStartedBtn}
            type="button"
            onClick={handleGetStarted}
          >
            Get started
          </button>
        </div>
        <div className={css.rightMain}>
          <img className={css.girlImg} src="girl.webp" alt="girl" />
          <img className={css.macImg} src="mac.webp" alt="mac" />
        </div>
      </div>
      <div className={css.bottomDiv}>
        <div className={css.infoDiv}>
          <div className={css.itemInfoDiv}>
            <p className={css.pNumber}>32,000 +</p>
            <p className={css.pText}>Experienced tutors</p>
          </div>
          <div className={css.itemInfoDiv}>
            <p className={css.pNumber}>300,000 +</p>
            <p className={css.pText}>5-star tutor reviews</p>
          </div>
          <div className={css.itemInfoDiv}>
            <p className={css.pNumber}>120 +</p>
            <p className={css.pText}>Subjects taught</p>
          </div>
          <div className={css.itemInfoDiv}>
            <p className={css.pNumber}>200 +</p>
            <p className={css.pText}>Tutor nationalities</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
