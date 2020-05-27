import React from "react";
import ReactDOM, {render} from "react-dom";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import "isomorphic-fetch"


import {describe, expect, it} from "@jest/globals";
import Dashboard from "../client/src/components/Dashboard/Dashboard";

describe('Dashboard', () => {
  it('renders component correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard/>, div);

  });
});

