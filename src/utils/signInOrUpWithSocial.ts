import { socialNetworks } from '../constants';
import { useAppDispatch } from '../redux/hooks';

export function signInOrUpWithSocial(network: socialNetworks) {
  const dispatch = useAppDispatch();
  const queryParams = window.location.search.substring(1).split('&');

  const inviteToken = getFromQueryParams(queryParams, 'inv');

  dispatch(
    setCookies({
      key: 'inviteToken',
      value: inviteToken || '',
    }),
  );

  dispatch(
    setCookies({
      key: 'authNetwork',
      value: network,
    }),
  );

  requestSocialAuthenticationHelper({
    socialSite: network,
    isSignIn,
    dispatch,
  });
}
