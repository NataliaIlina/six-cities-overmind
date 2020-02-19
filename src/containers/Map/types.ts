import { ICity, IOffer } from "src/interfaces";

export interface ComponentProps {
  offers: IOffer[];
}

export interface StateProps {
  currentCity: ICity;
  activeOffer: number | null;
}

export type MapProps = ComponentProps & StateProps;
