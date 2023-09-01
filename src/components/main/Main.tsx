import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { userSelectors } from "../../redux/user";
import { LoadingDisplay } from "../../common";
import { loadingDisplayTypes } from "../../types";
import Header from "../header";
import Navigation from "../navigation";
import styles from './Main.module.css';
import { useFetchUser } from "../../hooks";
import { BuyCredits } from '../buyCredits/BuyCredits';
export function Main() {
  const userIsLoading = useAppSelector(userSelectors.isLoading);
  useFetchUser();
  const [navigationIsMinimized, setNavigationIsMinimized] = useState(false);
  const toggleNavigationIsMinimized = () => {
    setNavigationIsMinimized((prev) => !prev);
  };
  if (userIsLoading) {
    return <LoadingDisplay type={loadingDisplayTypes.entireScreen} />;
  }
  return (
    <div style={{ width: '100svw', height: '88svh' }}>
      <Header
        navigationIsMinimized={navigationIsMinimized}
        toggleNavigationIsMinimized={toggleNavigationIsMinimized}
      />
      <Navigation navigationIsMinimized={navigationIsMinimized} />
      <div
        className={`${styles.mainContentWrapper} ${
          navigationIsMinimized ? styles.minimized : ' '
        }`}
      >
        <Routes>
          <Route path={'dashboard'} element={<></>} />
          <Route path={'podcast-search'} element={<></>} />
          <Route path={'live-events'} element={<></>} />
          <Route path={'experts-search'} element={<></>} />
          <Route path={'media-search'} element={<></>} />
          <Route path={'conference-search'} element={<></>} />
          <Route path={'my-lists'} element={<></>} />
          <Route path={'outreach-sequences-mail'} element={<></>} />
          <Route path={'account'} element={<></>} />
          <Route path={'payment/credits'} element={<BuyCredits />} />
          <Route path={'templates'} element={<></>} />
          <Route
            path={'academy'}
            element={
              <div
                id='candu-academy-content'
                className='candu-academy-content'
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
