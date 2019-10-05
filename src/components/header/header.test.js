import React from "react";
import renderer from "react-test-renderer";
import {Header} from "components/header/header";
import {MemoryRouter} from "react-router";

it(`Header rendered correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Header user={{email: `example@mail.ru`, avatarUrl: `qwe.ry`}} />
        </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
