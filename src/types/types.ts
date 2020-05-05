export interface IUser {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface ILocation {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface ICity {
  name: string;
  location: ILocation;
}

export interface IOffer {
  id: number;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  description: string;
  host: {
    id: number;
    isPro: boolean;
    name: string;
    avatarUrl: string;
  };
  location: ILocation;
  city: ICity;
}

export interface IComment {
  id: number;
  user: IUser;
  rating: number;
  comment: string;
  date: Date;
}
