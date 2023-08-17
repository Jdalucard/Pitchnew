import reloadIcon from '../../../resources/gifs/reload.gif';
import './LoadingIcon.styles.css';

export interface ILoadingIcon {
  size: string,
  hidden?: boolean,
}

export const LoadingIcon = ({ hidden, size }: ILoadingIcon) => (
  <img
    src={reloadIcon}
    alt="loading-icon"
    className={"loading-icon" + (hidden ? " hidden" : "") + (size ? " " + size : " loading-default")}
  />
);