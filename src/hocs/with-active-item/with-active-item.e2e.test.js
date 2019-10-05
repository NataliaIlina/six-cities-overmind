/* import React from "react";
import {shallow} from "enzyme";
import withActiveItem from "./with-active-item";
import {OFFER_MOCK} from "src/constants";

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should change activeItem with setAvtiveItem`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activeItem).toEqual(null);
  wrapper.props().setActiveItem(OFFER_MOCK);
  expect(wrapper.props().activeItem).toEqual(OFFER_MOCK);
});
 */
