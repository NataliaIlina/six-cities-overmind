import React from "react";
import {shallow} from "enzyme";
import withActiveItem from "./with-active-item";

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should change activeItem with setAvtiveItem`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activeItem).toEqual(null);
  wrapper.props().setActiveItem(`Paris`);
  expect(wrapper.props().activeItem).toEqual(`Paris`);
});
