import React, { useEffect } from 'react';
import { FavoritePage, LoginPage, MainPage, OfferPage } from 'src/pages';
import { useOvermind } from 'src/overmind';
import { Page } from 'src/overmind/state';

const App: React.FC = () => {
  const { actions, state } = useOvermind();

  useEffect(() => {
    actions.user.getCurrentUser();
  });

  return (
    <>
      {state.currentPage === Page.HOME && <MainPage />}
      {state.currentPage === Page.FAVORITE && <FavoritePage />}
      {state.currentPage === Page.OFFER && <OfferPage />}
      {state.currentPage === Page.LOGIN && <LoginPage />}
    </>
  );
};

export default App;
