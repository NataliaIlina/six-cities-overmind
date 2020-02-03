const toCamel = s => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace(`-`, ``)
      .replace(`_`, ``);
  });
};

const isObject = o => {
  return o === Object(o) && !Array.isArray(o) && typeof o !== `function`;
};

export const transformKeysToCamel = o => {
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

export const transformOffersForFavorite = offers => {
  const cities = new Set();
  offers.forEach(offer => cities.add(offer.city.name));
  const favorites = {};
  for (let item of cities.keys()) {
    favorites[item] = offers.filter(o => o.city.name === item);
  }
  return favorites;
};

export const getRandomNumber = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));

export const getCitiesFromOffers = offers => {
  const cities = [];
  offers.forEach(offer => {
    if (!cities.some(city => city.name === offer.city.name)) {
      cities.push(offer.city);
    }
    return;
  });
  return cities;
};

export const getRandomCityFromOffers = offers => {
  return offers[getRandomNumber(0, offers.length - 1)].city;
};
