export const RATINGS = [
  { value: 5, title: "perfect" },
  { value: 4, title: "good" },
  { value: 3, title: "not bad" },
  { value: 2, title: "badly" },
  { value: 1, title: "terribly" }
];

export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 300;

export enum ActionType {
  CHANGE_CITY = "CHANGE_CITY",
  CHANGE_SORTING = "CHANGE_SORTING",
  CHANGE_OFFERS = "CHANGE_OFFERS",
  RESET_STATE = "RESET_STATE",
  LOAD_OFFERS = "LOAD_OFFERS",
  LOAD_FAVORITE = "LOAD_FAVORITE",
  REPLACE_OFFER = "REPLACE_OFFER",
  SET_ACTIVE_OFFER = "SET_ACTIVE_OFFER",
  LOAD_COMMENTS = "LOAD_COMMENTS",
  LOAD_USER = "LOAD_USER"
}

export const SERVER_URL = `https://es31-server.appspot.com/six-cities`;

export const BASE_URL =
  process.env.NODE_ENV === "development" ? "" : "/six-cities";

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
