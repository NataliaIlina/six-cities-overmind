import { IOffer, ICity } from 'src/types';

export const getCitiesFromOffers = (offers: IOffer[]) => {
  const cities: ICity[] = [];
  offers.forEach((offer) => {
    if (!cities.some((city) => city.name === offer.city.name)) {
      cities.push(offer.city);
    }
    return;
  });
  return cities;
};
