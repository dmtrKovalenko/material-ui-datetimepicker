import React from 'react'

import moment from 'moment'
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import { RaisedButton, Card, CardHeader, CardText, TextField } from 'material-ui';

import './index.css'

const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class Demo extends React.Component {
  state = {
    selectedDate: null
  }

  setPickerProps = (key, value) => {
    this.setState({ [key]: value }, () => this.refs.picker.forceUpdate())
  }

  setRandomValue = () => {
    const randomMilliseconds = getRandomValue(0, Date.now())
    this.setState({ selectedDate: moment(randomMilliseconds) })
  }

  render() {
    return (
      <div>
        <div className="random-container">
          <RaisedButton primary
            label="Set random"
            onClick={this.setRandomValue}
          />
        </div>

        <DateTimePicker
          ref="picker"
          className="datepicker"
          returnMomentDate={false}
          DatePicker={DatePickerDialog}
          TimePicker={TimePickerDialog}
          floatingLabelText="Get my date"
          format={this.state.format}
          timePickerDelay={this.state.delay}
          onChange={selectedDate => this.setState({ selectedDate })}
        />

        <div className="options">
          <Card className="option">
            <CardHeader title="Timepicker delay" />

            <CardText>
              <TextField
                type="number" name="delay"
                defaultValue={DateTimePicker.defaultProps.timePickerDelay}
                onChange={(e, value) => this.setPickerProps('delay', Number(value))}
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
    );
  }
}
