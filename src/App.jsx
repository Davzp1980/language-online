import { Route, Routes } from 'react-router';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Teachers from './pages/Teachers/Teachers';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import LoginModal from './components/LoginModal/LoginModal';
import {
  selectIsLoginModalOpen,
  selectIsRegisterModalOpen,
} from './redux/teachers/selectors';
import RegisterModal from './components/RegisterModal/RegisterModal';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import { Toaster } from 'react-hot-toast';

import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from './redux/auth/slice';
import { auth } from './firebaseConfig';
import { PrivateRoute } from './components/PrivateRouter';

function App() {
  const isOpenLoginModal = useSelector(selectIsLoginModalOpen);
  const isOpenRegisterModal = useSelector(selectIsRegisterModalOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route
            path="/favorite"
            element={
              <PrivateRoute redirectTo="/" component={<FavoritePage />} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {isOpenLoginModal && <LoginModal />}
      {isOpenRegisterModal && <RegisterModal />}
      <Toaster />
    </>
  );
}

export default App;
