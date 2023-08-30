import { useLocation } from 'react-router-dom';
import { navigationOptions } from '../../constants';
import { useAppSelector } from '../../redux/hooks';
import { userSelectors } from '../../redux/user';
import { userHasAllAccess } from '../../common';
import { NavigationItem } from './components';
import styles from './Navigation.module.css';

interface IProps {
  navigationIsMinimized: boolean,
}

export function Navigation({ navigationIsMinimized }: IProps) {
  const location = useLocation();
  const userData = useAppSelector(userSelectors.userData);

  const checkIfIsActive = (option: string) => {
    if (location.pathname.includes(`/main/${option}`)) {
      return true;
    }
    return false;
  }

  return (
    <div className={`${styles.navigationPanel} ${navigationIsMinimized ? 'minimized' : ''}`}>
      <div style={{ position: 'relative' }}>
        {navigationOptions.map((navigationObject, index) => {
          const {icon, option, title} = navigationObject;
          return (
            <NavigationItem
              key={index}
              navigationIsMinimized={navigationIsMinimized}
              isActive={checkIfIsActive(option)}
              text={title}
              Icon={icon}
              dataId={option}
              link={option}
              userPrivileges={userData?.privileges}
              limitedAccess={!userHasAllAccess(userData?.privileges)}
            />
          );
        })}
      </div>
    </div>
  );
}