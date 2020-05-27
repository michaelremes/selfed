import React from "react";
import ReactDOM, {render} from "react-dom";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import "isomorphic-fetch"

import {describe, expect, it} from "@jest/globals";
import Materials from "../client/src/components/Materials/Materials";

describe('Materials', () => {
  it('renders component correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Materials/>, div);

  });
});

