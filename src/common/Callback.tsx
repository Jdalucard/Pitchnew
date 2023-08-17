import { useEffect } from 'react';
import { processSocialAuthenticationHelper, processEmailConfigurationHelper } from '../redux/authentication/components';
import { callbackTypes } from '../types';
import { LoadingIcon } from '.';
import { useAppDispatch } from '../redux/hooks';

interface IProps {
  type: callbackTypes,
}

export function Callback({ type }: IProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (type) {
      case callbackTypes.authentication:
        processSocialAuthenticationHelper({ dispatch });
        break;
      case callbackTypes.emailConfiguration:
        processEmailConfigurationHelper({ dispatch })
        break;
      default:
        null;
    }
  }, [type, dispatch]);
  
  return (
    <div style={{
      height: '100svh',
      width: '100svw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <LoadingIcon size="loading-huge" />
    </div>
  );
}