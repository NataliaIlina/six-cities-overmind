import { IOffer, ICity } from "./interfaces";

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace(`-`, ``)
      .replace(`_`, ``);
  });
};

const isObject = (o: any) => {
  return o === Object(o) && !Array.isArray(o) && typeof o !== `function`;
};

export const transformKeysToCamel = (o: any) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      n[toCamel(k)] = transformKeysToCamel(o[k]);
    });

    return n;
  } else if (Array.isArray(o)) {
    return o.map(i => {
      return transformKeysToCamel(i);
    });
  }

  return o;
};

export const transformOffersForFavorite = (offers: IOffer[]) => {
  const cities = new Set<string>();
  offers.forEach(offer => cities.add(offer.city.name));
  const favorites = {};
  for (let item of cities.keys()) {
    favorites[item] = offers.filter(o => o.city.name === item);
  }
  return favorites;
};

export const getRandomNumber = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max + 1 - min));

export const getCitiesFromOffers = (offers: IOffer[]) => {
  const cities: ICity[] = [];
  offers.forEach(offer => {
    if (!cities.some(city => city.name === offer.city.name)) {
      cities.push(offer.city);
    }
    return;
  });
  return cities;
};
