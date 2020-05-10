import { IOffer } from 'src/types';

export const transformOffersForFavorite = (offers: IOffer[]) => {
  const cities = new Set<string>();
  offers.forEach((offer) => cities.add(offer.city.name));
  const favorites = {};
  for (let item of cities.keys()) {
    favorites[item] = offers.filter((o) => o.city.name === item);
  }
  return favorites;
};
