import { IOffer } from "src/interfaces";

export interface ComponentProps {}

export interface StateProps {
  favorite: { string: IOffer[] };
}

export interface DispatchProps {
  fetchFavorite: () => void;
}

export type FavoritePageProps = ComponentProps & StateProps & DispatchProps;
