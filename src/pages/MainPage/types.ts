import { ICity, IOffer } from "src/interfaces";

export interface ComponentProps {}

export interface StateProps {
  offers: IOffer[];
  currentCity: ICity;
}

export interface DispatchProps {
  fetchOffers: () => void;
  setActiveOffer: (id: number | null) => void;
}

export type MainPageProps = ComponentProps & StateProps & DispatchProps;
