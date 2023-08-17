import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './redux/hooks';
import { useAuthenticationListener } from './hooks/authentication';
import { setCookies } from './redux/cookies';
import { Callback } from './common';
import { callbackTypes } from './types';
import Home from './components/home';
import UsagePolicy from './components/privacyPolicy';
import Main from './modules/main/containers/main';
import './common/general/styles/swal-styles.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch();

  useAuthenticationListener();

  const changeAuthNetwork = (network: string) => {
    dispatch(setCookies({
      key: 'authNetwork',
      value: network
    }));
  }

  const changeEmailAuthNetwork = (network: string) => {
    dispatch(setCookies({
      key: 'emailAuthNetwork',
      value: network
    }));    
  }

  return (
    <div className="App">
      <Routes>
        <Route path={'/'}>
          <Home changeAuthNetwork={changeAuthNetwork} />
        </Route>
        <Route path={'/invitation'}>
          <Home changeAuthNetwork={changeAuthNetwork} invite />
        </Route>
        <Route path={'/data-usage-policy'}>
          <UsagePolicy />
        </Route>
        {/* Callbacks */}
        <Route path={'/authcallback'}>
          <Callback type={callbackTypes.authentication} />
        </Route>
        <Route path={'/emailcallback'}>
          <Callback type={callbackTypes.emailConfiguration} />
        </Route>
        <Route path={'/main'}>
          <Main changeAuthNetwork={changeAuthNetwork} changeEmailAuthNetwork={changeEmailAuthNetwork} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
