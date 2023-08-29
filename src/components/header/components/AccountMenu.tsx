import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import styles from './AccountMenu.module.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { removeCookies, setUserJWT } from '../../../redux/cookies';
import Cookies from 'universal-cookie';
import { userHasAllAccess } from '../../../common';
import { userSelectors } from '../../../redux/user';

interface IProps {
  userPrivileges: string[] | undefined
}

export function AccountMenu({ userPrivileges }: IProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies;
  const isAdminMode = useAppSelector(userSelectors.isAdmin);

  const signOut = () => {
    dispatch(removeCookies('jwt'));
    navigate('/');
  }

  const backToAdmin = () => {
    dispatch(setUserJWT(cookies.get('admin-token')));
    dispatch(removeCookies('admin-token'));
    dispatch(removeCookies('lastPage'));
    dispatch(removeCookies('currentPage'));
    navigate('/');
  }

  return (
    <div className={styles.headerDropMenu}>
      <div className={styles.verticalDivider} />
      <div className={styles.headerMenuItem} onClick={() => navigate('account/profile')}>
        <div className={styles.profileIconWrapper}>
          <PersonIcon sx={(theme) => ({ color: theme.palette.text.primary})} fontSize="small" />
        </div>
        <Typography variant="body1" color="text.primary">Profile</Typography>
      </div>
      <div className={styles.verticalDivider} />
      <div className={styles.headerMenuItem} onClick={() => navigate('account/configuration')}>
        <div className={styles.profileIconWrapper}>
          <SettingsIcon sx={(theme) => ({ color: theme.palette.text.primary})} fontSize="small" />
        </div>
        <Typography variant="body1" color="text.primary">Configuration</Typography>
      </div>
      <div className={styles.verticalDivider} />
      <div className={styles.headerMenuItem} onClick={() => navigate('reports')}>
        <div className={styles.profileIconWrapper}>
          <BarChartIcon sx={(theme) => ({ color: theme.palette.text.primary})} fontSize="small" />
        </div>
        <Typography variant="body1" color="text.primary">Reports</Typography>
      </div>
      <div className={styles.verticalDivider} />
      <div className={styles.headerMenuItem} onClick={() => navigate("account/team")}>
        <div className={styles.profileIconWrapper}>
          <GroupIcon sx={(theme) => ({ color: theme.palette.text.primary})} fontSize="small" />
        </div>
        <Typography variant="body1" color="text.primary">Team</Typography>
      </div>
      <div className={styles.verticalDivider} />
      <div className={styles.headerMenuItem} onClick={() => navigate("payment/credits")}>
        <div className={styles.profileIconWrapper}>
          <PaidIcon sx={(theme) => ({ color: theme.palette.text.primary})} fontSize="small" />
        </div>
        <Typography variant="body1" color="text.primary">Payment option</Typography>
      </div>
      <div className={styles.headerMenuItem} onClick={signOut}>
        <div className={styles.profileIconWrapper}>
          <LogoutIcon sx={(theme) => ({ color: theme.palette.text.primary})} fontSize="small" />
        </div>
        <Typography variant="body1" color="text.primary">Sign out</Typography>
      </div>
      {userHasAllAccess(userPrivileges) && (
        <>
          <div className={styles.verticalDivider} />        
          <div className={styles.headerMenuItem} onClick={() => navigate("account/super-admin-searches")}>
            <div className={styles.profileIconWrapper}>
              <ContentPasteSearchIcon sx={(theme) => ({ color: theme.palette.text.primary})} fontSize="small" />
            </div>
            <Typography variant="body1" color="text.primary">Admin: Searches</Typography>
          </div>
          <div className={styles.verticalDivider} />
          <div className={styles.headerMenuItem} onClick={() => navigate("account/super-admin-users")}>
            <div className={styles.profileIconWrapper}>
              <SettingsIcon sx={(theme) => ({ color: theme.palette.text.primary})} fontSize="small" />
            </div>
            <Typography variant="body1" color="text.primary">Admin: Users</Typography>
          </div>
        </>
      )}
      {isAdminMode &&
        <>
       
          <div className={styles.verticalDivider} />
          <div className={styles.headerMenuItem} onClick={backToAdmin}>
            <div className={styles.profileIconWrapper}>
              <LogoutIcon color="primary" fontSize="small" />
            </div>
            <Typography variant="body1" color="text.primary">Back to admin</Typography>
          </div>
        </>
      }
    </div>
  );
}