import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import logo from '../../assets/logos/pitchdb-logo.png';
import { AccountMenu } from './components';
import { useAppSelector } from '../../redux/hooks';
import { userSelectors } from '../../redux/user';
import { subscriptionSelectors } from '../../redux/subscription';
import styles from './Header.module.css';

interface IProps {
  navigationIsMinimized: boolean;
  toggleNavigationIsMinimized: () => void;
}

export function Header({ navigationIsMinimized, toggleNavigationIsMinimized }: IProps) {
  const userData = useAppSelector(userSelectors.userData);
  const profileImage = useAppSelector(userSelectors.userProfileImage);
  const subscriptionPlan = useAppSelector(subscriptionSelectors.userSubscription);
  const remainingCredits = useAppSelector(subscriptionSelectors.credits)?.remaining;

  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const [errorInProfileImage, setErrorInProfileImage] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 600 && !navigationIsMinimized && profileMenuIsOpen) {
      toggleProfileMenu();
    }
  }, [navigationIsMinimized, profileMenuIsOpen]);

  const toggleProfileMenu = () => {
    setProfileMenuIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.logoAndMobileToggleWrapper}>
        <div className={styles.mobileNavigationToggle} onClick={toggleNavigationIsMinimized}>
          {navigationIsMinimized ? (
            <MenuIcon sx={(theme) => ({ color: theme.palette.text.primary })} fontSize="large" />
          ) : (
            <MenuOpenIcon
              sx={(theme) => ({ color: theme.palette.text.primary })}
              fontSize="large"
            />
          )}
        </div>
        <div className={styles.logoWrapper}>
          <img src={logo} width="100%" height="100%" />
        </div>
      </div>
      <div className={styles.profileOptionsWrapper} onClick={toggleProfileMenu}>
        {profileImage && !errorInProfileImage ? (
          <img
            src={import.meta.env.VITE_PROFILE_ENDPOINT_URL + profileImage}
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
            onError={() => setErrorInProfileImage(true)}
          />
        ) : (
          <AccountCircleRoundedIcon
            sx={(theme) => ({ color: theme.palette.text.primary })}
            fontSize="large"
          />
        )}
        <div>
          <div className={styles.nameAndArrowDownWrapper}>
            <Typography variant="body1" color="text.primary" fontWeight="bold">
              {userData?.name ?? ''}
            </Typography>
            <div className={styles.profileToggleWrapper}>
              {profileMenuIsOpen ? (
                <KeyboardArrowUpRoundedIcon color="primary" />
              ) : (
                <KeyboardArrowDownRoundedIcon color="primary" />
              )}
            </div>
          </div>
          {subscriptionPlan && (
            <Typography variant="caption" color="text.secondary">
              {`${remainingCredits ? remainingCredits + ' pitches - ' : ''} ${
                subscriptionPlan.type
              }`}
            </Typography>
          )}
        </div>
        {profileMenuIsOpen && <AccountMenu userPrivileges={userData?.privileges} />}
      </div>
    </div>
  );
}
