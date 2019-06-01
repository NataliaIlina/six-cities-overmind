import React from "react";
import {mount} from "enzyme";
import PlaceCard from "components/place-card/place-card";
import {OFFER_MOCK} from "src/constants";

describe(`PlaceCard works correctly`, () => {
  const hoverHandler = jest.fn();
  const clickHandler = jest.fn();

  const wrapper = mount(
      <PlaceCard
        offer={OFFER_MOCK}
        onCardClick={() => clickHandler(OFFER_MOCK)}
        onCardHover={() => hoverHandler(OFFER_MOCK)}
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
    expect(hoverHandler).toHaveBeenCalledWith(OFFER_MOCK);
    expect(clickHandler).toHaveBeenCalledWith(OFFER_MOCK);
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
