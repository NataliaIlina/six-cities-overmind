import { OnInitialize } from './index';
import { Page } from 'src/overmind/state';

export const onInitialize: OnInitialize = async ({ actions, effects, state }) => {
  state.currentPage = Page.HOME;
  effects.router.initialize({
    '/': actions.showHomePage,
    '/favorite': actions.showFavoritePage,
    '/offer/:id': actions.showOfferPage,
    '/login': actions.showLoginPage,
  });
};
