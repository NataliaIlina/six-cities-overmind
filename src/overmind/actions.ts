import { transformKeysToCamel, transformOffersForFavorite } from 'src/helpers';
import { Action, AsyncAction } from './index';
import { getCitiesFromOffers } from 'src/helpers';
import { ICity, IComment, IOffer, IUser } from 'src/types';

export const setUser: Action<IUser> = ({ state }, user) => {
  state.user = user;
};

export const setUserAuth: Action<boolean> = ({ state }, value) => {
  state.isUserAuth = value;
};

export const setOffers: Action<IOffer[]> = ({ state }, offers) => {
  state.offers = offers;
};

export const setCities: Action<ICity[]> = ({ state }, cities) => {
  state.cities = cities;
};

export const setLoading: Action<boolean> = ({ state }, value) => {
  state.isLoading = value;
};

export const setActiveOfferId: Action<number> = ({ state }, id) => {
  state.activeOfferId = id;
};

export const setFavorite: Action<{ [key: string]: IOffer[] }> = ({ state }, favorite) => {
  state.favorite = favorite;
};

export const setComments: Action<IComment[]> = ({ state }, comments) => {
  state.comments = comments;
};

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

export const getCurrentUser: AsyncAction = ({ state, effects, actions }) => {
  return effects.api
    .getCurrentUser()
    .then((response) => {
      const data = transformKeysToCamel(response.data);
      actions.setUser(data);
      actions.setUserAuth(true);
    })
    .catch(() => {
      actions.setUserAuth(false);
    });
};

export const authorizeUser: AsyncAction<{ email: string; password: string }> = (
  { state, effects, actions },
  { email, password }
) => {
  return effects.api
    .authorizeUser(email, password)
    .then((response) => {
      const data = transformKeysToCamel(response.data);
      actions.setUser(data);
      actions.setUserAuth(true);
    })
    .catch(() => {
      actions.setUserAuth(false);
    });
};

export const fetchOffers: AsyncAction = ({ state, effects, actions }) => {
  return effects.api.fetchOffers().then((response) => {
    const data = transformKeysToCamel(response.data);
    actions.setOffers(data);
    actions.changeCity(data[0].city);
    actions.setCities(getCitiesFromOffers(data));
  });
};

export const fetchFavorite: AsyncAction = ({ effects, actions }) => {
  return effects.api.fetchFavorite().then((response) => {
    const data = transformOffersForFavorite(response.data);
    actions.setFavorite(transformKeysToCamel(data));
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

export const fetchComments: AsyncAction<number> = ({ actions, effects }, hotelId) => {
  return effects.api.fetchComments(hotelId).then((response) => {
    const data = transformKeysToCamel(response.data);
    actions.setComments(data);
  });
};

export const addComment: AsyncAction<{ hotelId: number; rating: number; comment: string }> = (
  { actions, effects },
  { hotelId, rating, comment }
) => {
  return effects.api.addComment(hotelId, rating, comment).then((response) => {
    const data = transformKeysToCamel(response.data);
    actions.setComments(data);
  });
};
