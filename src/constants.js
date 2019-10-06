import PropTypes from "prop-types";

export const SERVER_URL = `https://es31-server.appspot.com/six-cities`;

export const SORTING_VALUE_POPULAR = `popular`;
export const SORTING_VALUE_PRICE_TO_HIGH = `to-high`;
export const SORTING_VALUE_PRICE_TO_LOW = `to-low`;
export const SORTING_VALUE_TOP_RATED = `top-rated`;

export const SORTING_OPTIONS = [
  SORTING_VALUE_POPULAR,
  SORTING_VALUE_PRICE_TO_HIGH,
  SORTING_VALUE_PRICE_TO_LOW,
  SORTING_VALUE_TOP_RATED
];

export const SORTING_TITLE = {
  [SORTING_VALUE_POPULAR]: `Popular`,
  [SORTING_VALUE_PRICE_TO_HIGH]: `Price: low to high`,
  [SORTING_VALUE_PRICE_TO_LOW]: `Price: high to low`,
  [SORTING_VALUE_TOP_RATED]: `Top rated first`
};

export const CITY_PROP_TYPES = PropTypes.shape({
  name: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  })
}).isRequired;

export const USER_PROP_TYPES = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool.isRequired
  })
]);

export const OFFER_PROP_TYPES = PropTypes.shape({
  id: PropTypes.number.isRequired,
  previewImage: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  bedrooms: PropTypes.number,
  maxAdults: PropTypes.number,
  price: PropTypes.number,
  goods: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  host: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string
  }),
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }),
  city: CITY_PROP_TYPES
}).isRequired;

export const OFFER_MOCK = {
  id: 1,
  title: `place`,
  isPremium: true,
  price: 1200,
  rating: 4.8,
  isFavorite: false,
  description: ``,
  type: `house`,
  previewImage: ``,
  images: [``],
  goods: [``],
  bedrooms: 2,
  maxAdults: 4,
  host: {
    id: 1,
    isPro: true,
    name: `Angelina`,
    avatarUrl: ``
  },
  location: {
    latitude: 52,
    longitude: 4,
    zoom: 10
  },
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    }
  }
};

export const CITY_MOCK = {
  name: `Amsterdam`,
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10
  }
};
