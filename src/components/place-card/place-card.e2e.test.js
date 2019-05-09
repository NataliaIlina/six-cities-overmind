import React from "react";
import {mount} from "enzyme";
import PlaceCard from "components/place-card/place-card";

const mock = {
  title: `title`,
  price: 120,
  isPremium: true,
  rating: 93,
  type: `Apartment`,
  url: `img/apartment-01.jpg`
};

it(`card handlers works correctly`, () => {
  const hoverHandler = jest.fn();
  const openNewPage = jest.fn();
  let offer = null;

  const wrapper = mount(
      <PlaceCard
        offer={mock}
        onCardClick={() => {
          offer = mock;
        }}
        onCardHover={hoverHandler}
      />
  );

  const link = wrapper.find(`.place-card__link`);
  const card = wrapper.find(`.place-card`);

  expect(openNewPage).toHaveBeenCalledTimes(0);
  expect(hoverHandler).toHaveBeenCalledTimes(0);

  link.simulate(`click`, {
    preventDefault: openNewPage
  });
  card.simulate(`mouseEnter`);

  expect(openNewPage).toHaveBeenCalledTimes(1);
  expect(hoverHandler).toHaveBeenCalledTimes(1);
  expect(offer).toEqual(mock);
});
