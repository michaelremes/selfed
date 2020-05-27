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









});

