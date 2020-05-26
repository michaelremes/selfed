import React from "react";
import ReactDOM from "react-dom";

import CreateQuestion from "../client/src/components/Questions/CreateQuestion";


it('renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateQuestion/>);
});
