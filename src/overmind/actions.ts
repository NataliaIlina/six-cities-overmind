import { transformKeysToCamel, transformOffersForFavorite } from 'src/helpers';
import { Action, AsyncAction } from './index';
import { getCitiesFromOffers } from 'src/helpers';
import { ICity, IOffer, IUser } from 'src/interfaces';

export const setUser = ({ state }, user: IUser) => {
  state.user = user;
};

export const setUserAuth = ({ state }, value: boolean) => {
  state.isUserAuth = value;
};

export const setOffers = ({ state }, offers: IOffer[]) => {
  state.offers = offers;
};

export const setCurrentCity = ({ state }, city: ICity) => {
  state.currentCity = { ...city };
};

export const setCities = ({ state }, cities: ICity[]) => {
  state.cities = cities;
};

export const setSorting = ({ state }, sorting: string) => {
  state.sorting = sorting;
};

export const setLoading = ({ state }, value: boolean) => {
  state.isLoading = value;
};

export const setActiveOfferId = ({ state }, id: number) => {
  state.activeOfferId = id;
};

export const setFavorite = ({ state }, favorite: any) => {
  state.favorite = favorite;
};

export const setComments = ({ state }, comments: any) => {
  state.comments = comments;
};

export const replaceOfferInState = ({ state }, offer: IOffer) => {
  state.offers = state.offers.map((item) => {
    if (item.id === offer.id) {
      return offer;
    }
    return item;
  });
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
    actions.setCurrentCity(data[0].city);
    actions.setCities(getCitiesFromOffers(data));
  });
};

export const changeCity: Action<ICity> = ({ actions }, value) => {
  actions.setCurrentCity(value);
};

export const changeSorting: Action<string> = ({ actions }, value) => {
  actions.setSorting(value);
};

export const fetchFavorite: AsyncAction = ({ effects, actions }) => {
  return effects.api.fetchFavorite().then((response) => {
    const data = transformOffersForFavorite(response.data);
    actions.setFavorite(transformKeysToCamel(data));
  });
};

export const changeActiveOffer: Action<number> = ({ actions }, value) => {
  actions.setActiveOfferId(value);
};

export const toggleFavoriteStatus: Action<{ hotelId: number; status: 0 | 1 }> = (
  { actions, effects },
  { hotelId, status }
) => {
  effects.api
    .toggleFavoriteStatus(hotelId, status)
    .then((response) => {
      const data = transformKeysToCamel(response.data);
      actions.replaceOfferInState(data);
    })
    .catch((error) => console.log(error));
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
