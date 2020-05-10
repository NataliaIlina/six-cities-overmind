import { OnInitialize } from './index';
import { BASE_URL } from 'src/constants/constants';

export const onInitialize: OnInitialize = async ({ actions, effects }) => {
  effects.router.initialize({
    [`${BASE_URL}/`]: actions.showHomePage,
    [`${BASE_URL}/favorite`]: actions.showFavoritePage,
    [`${BASE_URL}/offer/:id`]: actions.showOfferPage,
    [`${BASE_URL}/login`]: actions.showLoginPage,
  });
};
