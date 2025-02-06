import { NavLink, useNavigate } from 'react-router';
import css from './Header.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoginModalOpen,
  setRegisterModalOpen,
} from '../../redux/teachers/slice';
import { selectIsloggedIn, selectUser } from '../../redux/auth/selectors';
import { MdLogout } from 'react-icons/md';
import { logout } from '../../redux/auth/operations';
import { disableScroll } from '../utils';

function Header() {
  const isLoggedIn = useSelector(selectIsloggedIn);
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  function activeLink({ isActive }) {
    return clsx(css.link, isActive && css.active);
  }

  const dispatch = useDispatch();

  function handleLoginWindow() {
    dispatch(setLoginModalOpen(true));
    disableScroll();
  }

  function handleRegisterWindow() {
    dispatch(setRegisterModalOpen(true));
    disableScroll();
  }

  function handleLogout() {
    dispatch(logout());
    navigate('/');
  }
  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <a className={css.logoLink} href="/">
          <img src="/logo.webp" alt="logo" />
          <span className={css.logoText}>LearnLingo</span>
        </a>
        <div className={css.linksContainer}>
          <NavLink className={activeLink} to="/">
            Home
          </NavLink>
          <NavLink className={activeLink} to="/teachers">
            Teachers
          </NavLink>
          {isLoggedIn && (
            <NavLink className={activeLink} to="/favorite">
              Favorites
            </NavLink>
          )}
        </div>

        <div className={css.registerContainer}>
          {isLoggedIn ? (
            <button
              className={css.loginBtn}
              type="button"
              onClick={handleLogout}
            >
              <MdLogout size={20} color="#f4c550" />
              {`Hello!, ${user.displayName}`}
            </button>
          ) : (
            <div className={css.registerContainer}>
              <button
                className={css.loginBtn}
                type="button"
                onClick={handleLoginWindow}
              >
                <svg className={css.loginSVG}>
                  <use href="sprite.svg#Language online.html"></use>
                </svg>
                Log in
              </button>
              <button
                className={css.registerBtn}
                type="button"
                onClick={handleRegisterWindow}
              >
                Registration
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
