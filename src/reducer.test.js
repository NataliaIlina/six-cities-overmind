import {ActionCreator, ActionType, reducer} from "./reducer";
import {offers} from "src/mocks/offers";

const cities = Object.keys(offers);

describe(`Reducer works correct`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: `Paris`,
      offers: offers[`Paris`],
      cities
    });
  });

  it(`Reducer should change city by a given value`, () => {
    expect(
        reducer(
            {city: `Paris`, offers: []},
            {
              type: ActionType.CHANGE_CITY,
              payload: `Amsterdam`
            }
        )
    ).toEqual({
      city: `Amsterdam`,
      offers: offers[`Amsterdam`]
    });
  });

  it(`Reducer should correctly reset app state`, () => {
    expect(
        reducer({city: ``, offers: []}, {type: ActionType.RESET_STATE})
    ).toEqual({
      city: `Paris`,
      offers: offers[`Paris`],
      cities
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`actionCreator change city returns correct action`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Paris`
    });
  });
});
