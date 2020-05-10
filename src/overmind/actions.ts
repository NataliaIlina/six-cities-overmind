import { transformKeysToCamel, transformOffersForFavorite } from 'src/utils';
import { Action, AsyncAction } from './index';
import { ICity, IOffer } from 'src/types';
import { Page } from 'src/overmind/state';

export const replaceOfferInState: Action<IOffer> = ({ state }, offer) => {
  const offers = state.offers as IOffer[];
  const currentOffer = offers.find((item) => item.id === offer.id);
  const index = offers.indexOf(currentOffer);
  state.offers[index] = { ...offer };
  if (state.activeOfferId === offer.id) {
    state.activeOffer.isFavorite = offer.isFavorite;
  }
};

export const changeCity: Action<ICity> = ({ state }, city) => {
  state.currentCity = { ...city };
  state.activeOfferId = null;
};

export const changeSorting: Action<string> = ({ state }, sorting) => {
  state.sorting = sorting;
};

export const fetchOffers: AsyncAction = ({ state, effects, actions }) => {
  return effects.api.fetchOffers().then((response) => {
    const data = transformKeysToCamel(response.data);
    state.offers = data;
    actions.changeCity(data[0].city);
  });
};

export const fetchFavorite: AsyncAction = ({ effects, state }) => {
  return effects.api.fetchFavorite().then((response) => {
    const data = transformOffersForFavorite(response.data);
    state.favorite = transformKeysToCamel(data);
  });
};

export const toggleFavoriteStatus: AsyncAction<{ hotelId: number; status: 0 | 1 }> = (
  { actions, effects },
  { hotelId, status }
) => {
  return effects.api.toggleFavoriteStatus(hotelId, status).then((response) => {
    const data = transformKeysToCamel(response.data);
    actions.replaceOfferInState(data);
  });
};

export const fetchComments: AsyncAction<number> = ({ actions, effects, state }, hotelId) => {
  return effects.api.fetchComments(hotelId).then((response) => {
    const data = transformKeysToCamel(response.data);
    state.comments = data;
  });
};

export const addComment: AsyncAction<{ hotelId: number; rating: number; comment: string }> = (
  { actions, effects, state },
  { hotelId, rating, comment }
) => {
  return effects.api.addComment(hotelId, rating, comment).then((response) => {
    const data = transformKeysToCamel(response.data);
    state.comments = data;
  });
};

export const showHomePage: AsyncAction = async ({ actions, state }) => {
  state.currentPage = Page.HOME;

  if (!state.offers.length) {
    state.isLoading = true;
    await actions.fetchOffers();
    state.isLoading = false;
  }
};

export const showFavoritePage: AsyncAction = async ({ state, actions }) => {
  state.currentPage = Page.FAVORITE;
  state.isLoading = true;
  await actions.fetchFavorite();
  state.isLoading = false;
};

export const showOfferPage: AsyncAction<{ id: string }> = async ({ state, actions }, { id }) => {
  state.currentPage = Page.OFFER;
  state.isLoading = true;
  if (!state.offers.length) {
    await actions.fetchOffers();
  }

  state.activeOfferId = Number(id);

  await actions.fetchComments(Number(id)).catch((error) => console.log(error));
  state.isLoading = false;
};

export const showLoginPage: Action = ({ state }) => {
  state.currentPage = Page.LOGIN;
};
