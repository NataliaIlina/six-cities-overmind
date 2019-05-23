import React from "react";
import renderer from "react-test-renderer";
import {App} from "components/app/app";
import Map from "components/map/map";

const mock = [
  {
    title: `title`,
    price: 120,
    isPremium: true,
    rating: 93,
    type: `Apartment`,
    url: `img/apartment-01.jpg`
  },
  {
    title: `title`,
    price: 80,
    isPremium: false,
    rating: 80,
    type: `Private room`,
    url: `img/room.jpg`
  }
];

it(`App rendered correctly`, () => {
  Map.prototype.componentDidMount = jest.fn();
  const tree = renderer
    .create(
        <App
          offers={mock}
          onCityChange={() => {}}
          city="Paris"
          cities={[`Paris`, `Amsterdam`]}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
