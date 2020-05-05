import React from 'react';
import { PlaceCard } from 'src/components';
import { IOffer } from 'src/types';
import { useOvermind } from 'src/overmind';

const OffersList: React.FC = () => {
  const { state } = useOvermind();

  return (
    <div className='cities__places-list places__list tabs__content'>
      {state.currentOffers.map((offer: IOffer) => (
        <PlaceCard offer={offer} key={offer.id} />
      ))}
    </div>
  );
};

export default OffersList;
