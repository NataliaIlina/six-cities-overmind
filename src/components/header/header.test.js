import React from "react";
import renderer from "react-test-renderer";
import Header from "components/header/header";

it(`Header rendered correctly`, () => {
  const tree = renderer.create(<Header userName="example@mail.ru" />).toJSON();
  expect(tree).toMatchSnapshot();
});