import React from "react";
import Map from "components/map/map";
import renderer from "react-test-renderer";

const mock = [
  {
    title: `title`,
    price: 120,
    isPremium: true,
    rating: 93,
    type: `Apartment`,
    url: `img/apartment-01.jpg`,
    coords: [52.3909553943508, 4.85309666406198]
  },
  {
    title: `title`,
    price: 80,
    isPremium: false,
    rating: 80,
    type: `Private room`,
    url: `img/room.jpg`,
    coords: [52.3909553943508, 4.85309666406198]
  }
];

it(`Map rendered correctly`, () => {
  Map.prototype.componentDidMount = jest.fn();
  const tree = renderer.create(<Map offers={mock} />).toJSON();
  expect(tree).toMatchSnapshot();
});
