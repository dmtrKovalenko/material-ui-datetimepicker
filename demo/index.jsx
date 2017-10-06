import React from 'react';
import ReactDOM from 'react-dom';

import DateTimePicker from '../src/DateTimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ClockIcon from 'material-ui/svg-icons/action/update';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardTitle, CardText, IconButton } from 'material-ui';

import './index.css'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Demo extends React.Component {
  state = {
    selectedDate: null
  }

  setPickerProps = (key, value) => {
    this.setState({ [key]: value }, () => this.refs.picker.forceUpdate())
  }

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

          <div className="datepicker">
            <DateTimePicker
              ref="picker"
              floatingLabelText="Get my date"
              format={this.state.format}
              timePickerDelay={this.state.delay}
              defaultTime={this.state.defaultTime}
              onChange={selectedDate => this.setState({ selectedDate })}
            />
          </div>

          <div className="options">
            <Card className="option">
              <CardHeader title="Timepicker delay" />

              <CardText>
                <TextField
                  type="number" name="delay"
                  defaultValue={DateTimePicker.defaultProps.timePickerDelay}
                  onChange={(e, value) => this.setPickerProps('delay', value)}
                />
              </CardText>
            </Card>

            <Card className="option">
              <CardHeader title="Display format" subtitle="Moment`s format string" />

              <CardText>
                <TextField
                  type="text" name="format"
                  defaultValue={DateTimePicker.defaultProps.format}
                  onChange={(e, value) => this.setPickerProps('format', value)}
                />
              </CardText>
            </Card>

            <Card className="option">
              <CardHeader title="Selected date in UTC" subtitle="JSON parsed" />

              <CardText>
                <TextField readOnly
                  type="text" name="selected"
                  value={JSON.stringify(this.state.selectedDate)}
                />
              </CardText>
            </Card>
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