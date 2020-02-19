import { ICity } from "src/interfaces";

export interface ComponentProps {}

export interface StateProps {
  cities: ICity[];
  currentCity: ICity;
}

export interface DispatchProps {
  changeCity: (city: ICity) => void;
}

export type CitiesListProps = ComponentProps & StateProps & DispatchProps;
