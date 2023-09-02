import React from 'react'
import Typography from '@mui/material/Typography';
import styles from '../Templates.module.css'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div className={`${styles.CustomTabPanel}`}>
            <Typography>{children}</Typography>
          </div>
        )}
      </div>
    );
}

export default CustomTabPanel