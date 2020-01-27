import React from "react";
import PlaceCard from "../PlaceCard/PlaceCard";
import { IOffer } from "src/interfaces";

interface OffersListProps {
  offers: IOffer[];
  setActiveOffer: () => void;
  toggleFavoriteStatus: () => void;
  isUserAuth: boolean;
}

const OffersList: React.FC<OffersListProps> = ({
  offers,
  setActiveOffer,
  toggleFavoriteStatus,
  isUserAuth
}) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer: IOffer) => (
      <PlaceCard
        offer={offer}
        key={offer.id}
        setActiveOffer={setActiveOffer}
        toggleFavoriteStatus={toggleFavoriteStatus}
        isUserAuth={isUserAuth}
      />
    ))}
  </div>
);

export default OffersList;
