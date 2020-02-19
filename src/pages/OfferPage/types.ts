import { IOffer, IComment } from "src/interfaces";

export interface ComponentProps {}

export interface StateProps {
  offers: IOffer[];
  offer: IOffer;
  comments: IComment[];
  isUserAuth: boolean;
  currentOfferId: number;
}

export interface DispatchProps {
  fetchComments: (id: number) => void;
  addComment: (id: number, rating: number, comment: string) => void;
  toggleFavoriteStatus: (id: number, status: number) => void;
  setActiveOffer: (id: number) => void;
}

export type OfferPageProps = ComponentProps & StateProps & DispatchProps;
