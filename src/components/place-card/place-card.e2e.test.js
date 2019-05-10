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

describe(`PlaceCard works correctly`, () => {
  const hoverHandler = jest.fn();
  let offer = null;
  const clickHandler = jest.fn((obj) => (offer = obj));
  const openNewPage = jest.fn();

  const wrapper = mount(
      <PlaceCard
        offer={mock}
        onCardClick={() => clickHandler(mock)}
        onCardHover={hoverHandler}
      />
  );
  const link = wrapper.find(`.place-card__link`);
  const card = wrapper.find(`.place-card`);

  it(`handlers works correctly`, () => {
    expect(hoverHandler).toHaveBeenCalledTimes(0);
    expect(clickHandler).toHaveBeenCalledTimes(0);
    link.simulate(`click`);
    card.simulate(`mouseEnter`);
    expect(hoverHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it(`default function works correctly`, () => {
    expect(openNewPage).toHaveBeenCalledTimes(0);
    link.simulate(`click`, {
      preventDefault: openNewPage
    });
    expect(openNewPage).toHaveBeenCalledTimes(1);
  });

  it(`update offer works correctly`, () => {
    link.simulate(`click`);
    expect(offer).toEqual(mock);
  });
});
