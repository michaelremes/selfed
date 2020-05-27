import React from "react";
import ReactDOM, {render} from "react-dom";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import "isomorphic-fetch"


import {describe, expect, it} from "@jest/globals";
import Login from "../client/src/components/Login/Login";

describe('Login', () => {
  it('renders component correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login/>, div);

  });
});

