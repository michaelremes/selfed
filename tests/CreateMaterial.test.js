import React from "react";
import ReactDOM, {render} from "react-dom";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';



import {describe, expect, it} from "@jest/globals";
import CreateMaterial from "../client/src/components/Materials/CreateMaterial";

describe('CreateQuestion', () => {
  it('renders component correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateMaterial/>, div);

  });
});

