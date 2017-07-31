import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

export default class DateTimePicker extends Component {
  static propTypes = {
    format: PropTypes.string,
    timePickerDelay: PropTypes.number,
    defaultTime: PropTypes.object,
    autoOkDatePicker: PropTypes.bool,
  }

  static defaultProps = {
    format: 'MMM DD, YYYY hh:mm A',
    timePickerDelay: 150,
    containerClassName: 'datetime-container',
    textFieldClassName: 'datetime-input',
    defaultTime: null,
    autoOkDatePicker: true
  }

  constructor(props) {
    super(props);

    this.state = {
      dateTime: props.defaultTime,
    }
  }

  openDatePicker = () => {
    this.refs.datePicker.openDialog();
  }

  selectDate = (event, date) => {
    this.setState({ dateTime: moment(date) });

    setTimeout(() => this.refs.timePicker.openDialog(), this.props.timePickerDelay)
  }

  selectTime = (event, date) => {
    const { dateTime } = this.state;

    dateTime.hours(date.getHours())
    dateTime.minutes(date.getMinutes())

    this.setState({ dateTime })
  }

  getDisplayTime = () => {
    const { dateTime } = this.state;

    return dateTime
      ? dateTime.format(this.props.format)
      : ''
  }

  render() {
    return (
      <span className={this.props.containerClassName}>
        <TextField
          className={this.props.textFieldClassName}
          onClick={this.openDatePicker}
          value={this.getDisplayTime()}
        />

        <div style={{ display: 'none' }}>
          <DatePicker
            autoOk={this.props.autoOkDatePicker}
            onChange={this.selectDate}
            ref='datePicker'
            hintText="12hr Format"
          />

          <TimePicker
            ref='timePicker'
            onChange={this.selectTime}
            hintText="test"
          />
        </div>
      </span>
    );
  }
}
