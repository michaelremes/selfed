import React from "react";
import ReactDOM, {render} from "react-dom";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import SideBar from "../client/src/components/SideBar/SideBar"
import {cleanup} from "@testing-library/react";

import {afterAll, describe, expect, it} from "@jest/globals";

afterAll(cleanup);

describe('Sidebar', () => {
  it('renders component correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SideBar/>, div);
  });


  // it('renders correctly', () => {
  //   const wrapper = shallow(<SideBar />);
  //   expect(wrapper).toMatchSnapshot();
  //   // On the first run of this test, Jest will generate a snapshot file automatically.
  // });
  // it('renders three <TreeItem /> components', () => {
  //   const wrapper = shallow(SideBar);
  //   expect(wrapper.find(SideBar)).to.have.lengthOf(3);
  // // });
  //
  // test('snapshot renders', () => {
  //   const component = renderer.create(<SideBar />);
  //   let tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });


  // it("matches snapshot", () => {
  //   const tree = renderer.create(<SideBar/>).toJSON();
  //   expect(tree).toMatchSnapshot();
  // })







});

