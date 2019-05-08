import React from "react";
import {shallow} from "enzyme";
import PlaceCard from "components/place-card/place-card";

it(`click on card title works correctly`, () => {
  const clickHandler = jest.fn();
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
        onCardTitleClick={clickHandler}
      />
  );
  const title = wrapper.find(`.place-card__name`);
  expect(clickHandler).toHaveBeenCalledTimes(0);
  title.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
