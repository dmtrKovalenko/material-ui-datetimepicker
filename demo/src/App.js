import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ClockIcon from 'material-ui/svg-icons/action/update';
import { IconButton, AppBar } from 'material-ui'
import Demo from './Demo'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends Component {
  render() {
    const leftIcon = (
      <a href="https://github.com/dmtrKovalenko/material-ui-datetimepicker">
        <IconButton> <ClockIcon color="white" /> </IconButton>
      </a>
    )

    return (
      <MuiThemeProvider>
        <div className="app">
          <AppBar
            title="Material UI Date & Time picker"
            iconElementLeft={leftIcon}
            iconClassNameRight="update"
          />

          <h2 className="title">
            <a href="http://www.material-ui.com/#/">Material UI</a> plugin for Date & Time picker.
          </h2>

          <Demo />
        </div>
      </MuiThemeProvider>
    )
  }
}
