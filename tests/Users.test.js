import React from "react";
import ReactDOM, {render} from "react-dom";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';



import {describe, expect, it} from "@jest/globals";

import AddUser from "../client/src/components/Users/AddUser";


describe('AddUser', () => {
  it('renders component correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddUser/>, div);

  });
});

