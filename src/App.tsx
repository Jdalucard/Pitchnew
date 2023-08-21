import { Route, Routes } from 'react-router-dom';
import { useAuthenticationListener } from './hooks/authentication';
import { Callback } from './common';
import { callbackTypes } from './types';
import Home from './components/home';
import UsagePolicy from './components/privacyPolicy';
// import Main from './modules/main/containers/main';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useAuthenticationListener();

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/invitation'} element={<Home isInvite />} />
        <Route path={'/data-usage-policy'} element={<UsagePolicy />} />          
        <Route path={'/authcallback'} element={<Callback type={callbackTypes.authentication} />} />
        <Route path={'/emailcallback'} element={<Callback type={callbackTypes.emailConfiguration} />} />
        {/* <Route
          path={'/main'}
          element={
            <Main changeAuthNetwork={changeAuthNetwork} changeEmailAuthNetwork={changeEmailAuthNetwork} />
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
