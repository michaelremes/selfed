import React from 'react';

import {Animated} from "react-animated-css";
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';


export const addNotification = (title, message, type) => {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 10000,
      onScreen: true
    },
    width: 600

  });
};

