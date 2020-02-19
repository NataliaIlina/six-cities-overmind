import { IOffer } from "src/interfaces";

export interface ComponentProps {}

export interface StateProps {
  offers: IOffer[];
  isUserAuth: boolean;
}

export interface DispatchProps {
  setActiveOffer: () => void;
  toggleFavoriteStatus: () => void;
}

export type OffersListProps = ComponentProps & StateProps & DispatchProps;
