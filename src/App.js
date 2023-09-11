import React, {useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import Home from './components/Home';
import EditItem from './components/EditItem';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-07402320.okta.com/oauth2/default',
  clientId: '0oab6lvypy7nSMKPi5d7',
  redirectUri: window.location.origin + '/login/callback'
});

function App() {
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  useEffect(() => {
    //
  }, []);

  return (
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/edit-item/:itemId" element={<EditItem /> } />
        <Route path="/login/callback" element={<LoginCallback />} />
        </Routes>
      </Security>
  );
}

export default App;
