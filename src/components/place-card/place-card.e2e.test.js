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
  const clickHandler = jest.fn();

  const wrapper = mount(
      <PlaceCard
        offer={mock}
        onCardClick={() => clickHandler(mock)}
        onCardHover={() => hoverHandler(mock)}
      />
  );
  const link = wrapper.find(`.place-card__link`);
  const card = wrapper.find(`.place-card`);

  beforeEach(() => {
    hoverHandler.mockReset();
    clickHandler.mockReset();
  });

  it(`handlers get params correctly`, () => {
    link.simulate(`click`);
    card.simulate(`mouseEnter`);
    expect(hoverHandler).toHaveBeenCalledWith(mock);
    expect(clickHandler).toHaveBeenCalledWith(mock);
  });

  it(`handlers works correctly`, () => {
    expect(hoverHandler).toHaveBeenCalledTimes(0);
    expect(clickHandler).toHaveBeenCalledTimes(0);
    link.simulate(`click`);
    card.simulate(`mouseEnter`);
    expect(hoverHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
