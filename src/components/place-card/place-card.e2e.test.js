import React from "react";
import {shallow} from "enzyme";
import PlaceCard from "components/place-card/place-card";

it(`click on card image works correctly`, () => {
  const clickHandler = jest.fn();
  const hoverHandler = jest.fn();
  const wrapper = shallow(
      <PlaceCard
        offer={{
          title: `title`,
          price: 120,
          isPremium: true,
          rating: 93,
          type: `Apartment`,
          url: `img/apartment-01.jpg`
        }}
        onCardClick={clickHandler}
        onCardHover={hoverHandler}
      />
  );
  const link = wrapper.find(`.place-card__image-wrapper a`);
  expect(clickHandler).toHaveBeenCalledTimes(0);
  link.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
