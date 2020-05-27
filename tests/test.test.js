import React from 'react';
import SideBar from "../client/src/components/SideBar/SideBar"
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<SideBar />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
