import React from 'react';
import ReactDOM from 'react-dom';

import DateTimePicker from '../src/DateTimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';
import './index.css'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Demo extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="main">
          <AppBar
            title="Date-time Picker"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          
          <div className="datepicker">
            <DateTimePicker />
          </div>
          
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);