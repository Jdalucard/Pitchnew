import { Typography, Tooltip, SvgIconTypeMap } from "@mui/material";
import styles from './NavigationItem.module.css';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useNavigate } from "react-router-dom";

interface IProps {
  isActive: boolean,
  navigationIsMinimized: boolean,
  text: string,
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>,
  link: string,
  userPrivileges: string[] | undefined,
  limitedAccess: boolean,
}

export function NavigationItem({
  isActive,
  navigationIsMinimized,
  text,
  Icon,
  link,
  userPrivileges,
  limitedAccess,
}: IProps) {
  const navigate = useNavigate();

  return (
    <>
      {limitedAccess && userPrivileges && (
        (userPrivileges.includes("business")) ||
        (text === "Dashboard" ||
          text === "Mailbox" ||
          text === "Contacts" ||
          text === "Templates" ||
          text === "Academy" ||
          userPrivileges.includes(text.split(" ")[0].replace(/s$/, '').toLowerCase())
        )
      ) ? (
        <>
          <div
              className={`${styles.navigationItem} ${isActive ? styles.active : ''}`}
              onClick={() => navigate(link)}
          >
            <Tooltip title={navigationIsMinimized ? text: ''} placement="right">
              <div className={`${styles.navIconWrapper} ${navigationIsMinimized ? 'minimized' : ''}`}>
                <Icon sx={(theme) => ({ color: theme.palette.text.primary})}/>
              </div>
            </Tooltip>
            {!navigationIsMinimized && (
              <Typography variant="h5" color="text.primary" fontWeight="bold">
                {text}
              </Typography>
            )}
          </div>
          {text !== "Academy" && (
            <div className={styles.verticalDivider} />
          )}
        </>
      ) : (
        <>
          {!limitedAccess && userPrivileges &&
            (userPrivileges.includes("allAccess") && text !== "Businesses" && text !== "People" &&
            (!userPrivileges.includes("superAdmin") || !userPrivileges.includes("betaUser"))) ? (
            <>
              <div
                className={`${styles.navigationItem} ${isActive ? styles.active : ''}`}
                onClick={() => navigate(link)}
              >
                <Tooltip title={navigationIsMinimized ? text : ''} placement="right">
                  <div className={`${styles.navIconWrapper} ${navigationIsMinimized ? 'minimized' : ''}`}>
                    <Icon sx={(theme) => ({ color: theme.palette.text.primary})}/>
                  </div>
                </Tooltip>
                {!navigationIsMinimized && (
                  <Typography variant="h5" color="text.primary" fontWeight="bold">
                    {text}
                  </Typography>
                )}
              </div>
              {text !== "Academy" && (
                <div className={styles.verticalDivider} />
              )}
            </>
          ) : (
            <>
              {!limitedAccess && (
                <>
                  <div
                    className={`${styles.navigationItem} ${isActive ? styles.active : ''}`}
                    onClick={() => navigate(link)}
                  >
                    <Tooltip title={navigationIsMinimized ? text : ''} placement="right">
                      <div className={`${styles.navIconWrapper} ${navigationIsMinimized ? 'minimized' : ''}`}>
                        <Icon sx={(theme) => ({ color: theme.palette.text.primary})}/>
                      </div>
                    </Tooltip>
                    {!navigationIsMinimized && (
                      <Typography variant="h5" color="text.primary" fontWeight="bold">
                        {text}
                      </Typography>
                    )}
                  </div>
                  {text !== "Academy" && (
                    <div className={styles.verticalDivider} />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}