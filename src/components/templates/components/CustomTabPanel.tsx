import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
          <Box className={`${styles.CustomTabPanel}`}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

export default CustomTabPanel