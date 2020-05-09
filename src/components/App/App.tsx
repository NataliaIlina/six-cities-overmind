import React, { useEffect } from 'react';
import { MainPage, OfferPage, FavoritePage, LoginPage } from 'src/pages';
import { Switch, Route } from 'react-router-dom';
import { BASE_URL } from 'src/constants/constants';
import { useOvermind } from 'src/overmind';

const App: React.FC = () => {
  const { actions } = useOvermind();

  useEffect(() => {
    actions.user.getCurrentUser();
  });

  return (
    <Switch>
      <Route path={`${BASE_URL}/`} exact component={MainPage} />
      <Route path={`${BASE_URL}/login`} exact component={LoginPage} />
      <Route path={`${BASE_URL}/favorites`} exact component={FavoritePage} />
      <Route path={`${BASE_URL}/offer/:id`} exact component={OfferPage} />
    </Switch>
  );
};

export default App;
