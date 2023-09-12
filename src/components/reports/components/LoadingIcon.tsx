import { FC } from 'react';
import reloadIcon from '../../../assets/gifts/reload.gif';
import styles from './Reports.module.css';

interface LoadingIconProps {
  hidden?: boolean;
  size?:
    | 'loading-default'
    | 'loading-small'
    | 'loading-medium'
    | 'loading-huge';
}

export const LoadingIcon: FC<LoadingIconProps> = ({ hidden, size }) => (
  <img
    src={reloadIcon}
    alt="loadingIcon"
    className={`${styles.loadingIcon}${hidden ? ' hidden' : ''}${
      size ? ` ${size}` : ' loading-default'
    }`}
  />
);
