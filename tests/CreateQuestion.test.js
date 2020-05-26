import React from "react";
import ReactDOM, {render} from "react-dom";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';



import {describe, expect, it} from "@jest/globals";
import CreateQuestion from "../client/src/components/Questions/CreateQuestion";

describe('CreateQuestion', () => {
  it('renders component correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateQuestion/>, div);

  });
});

