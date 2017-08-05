import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment'
import TextField from 'material-ui/TextField';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

export default class DateTimePicker extends Component {
  static propTypes = {
    format: PropTypes.string,
    timePickerDelay: PropTypes.number,
    okLabel: PropTypes.string,
    defaultTime: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    fieldName: PropTypes.string,
    showCurrentDateByDefault: PropTypes.bool,

    // DatePicker
    autoOkDatePicker: PropTypes.bool,
    onDateSelected: PropTypes.func,
    onDatePickerShow: PropTypes.func,
    shouldDisableDate: PropTypes.func,
    openToYearSelection: PropTypes.bool,
    datePickerMode: PropTypes.oneOf(['portrait', 'landscape']),
    disableYearSelection: PropTypes.bool,
    hideCalendarDate: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    openToYearSelection: PropTypes.bool,
    maxDate: PropTypes.oneOf([PropTypes.object, PropTypes.string, PropTypes.number]),
    minDate: PropTypes.oneOf([PropTypes.object, PropTypes.string, PropTypes.number]),

    // TimePicker
    onTimeSelected: PropTypes.func,
    onTimePickerShow: PropTypes.func,
    timePickerBodyStyle: PropTypes.object,
    timeFormat: PropTypes.oneOf(['ampm', '24hr']),
    autoOkTimePicker: PropTypes.bool,
    timePickerDialogStyle: PropTypes.object,
    minutesStep: PropTypes.number,
  }

  static defaultProps = {
    format: 'MMM DD, YYYY hh:mm A',
    timePickerDelay: 150,
    containerClassName: 'datetime-container',
    textFieldClassName: 'datetime-input',
    defaultTime: null,
    autoOkDatePicker: true,
    fieldName: 'timePicker',
    datePickerMode: 'portrait',
    openToYearSelection: false,
    disableYearSelection: false,
    hideCalendarDate: false,
    openToYearSelection: false,
    firstDayOfWeek: 1,
    timePickerBodyStyle: {},
    timeFormat: 'ampm',
    autoOkTimePicker: false,
    timePickerDialogStyle: {},
    minutesStep: 1,
    showCurrentDateByDefault: false,

    // functions
    onTimePickerShow: () => { },
    onDateSelected: () => { },
    onTimeSelected: () => { },
    shouldDisableDate: () => { },
    onDatePickerShow: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      dateTime: props.defaultTime ? moment(this.props.defaultTime) : null,
    }
  }

  getDate = () => {
    return this.state.dateTime ? this.state.dateTime.toDate() : new Date();
  }

  parseTime = (time) => {
    const formattedTime = time
      ? moment(time).toDate()
      : null

    return formattedTime;
  }

  openDatePicker = () => {
    this.refs.datePicker.show();
  }

  selectDate = (date) => {
    this.setState({ dateTime: moment(date) });

    this.props.onDateSelected(this.state.dateTime)
    // show timepicker
    setTimeout(() => this.refs.timePicker.show(), this.props.timePickerDelay)
  }

  selectTime = (date) => {
    const { dateTime } = this.state;

    dateTime.hours(date.getHours())
    dateTime.minutes(date.getMinutes())

    this.setState({ dateTime })

    this.props.onTimeSelected(this.state.dateTime);
  }

  getDisplayTime = () => {
    const { dateTime } = this.state;
    const defaultTime = this.props.showCurrentDateByDefault 
      ? moment().format(this.props.format) 
      : ''

    return dateTime
      ? dateTime.format(this.props.format)
      : defaultTime
  }

  render() {
    return (
      <span className={this.props.containerClassName}>
        <TextField
          name={this.props.fieldName}
          className={this.props.textFieldClassName}
          onClick={this.openDatePicker}
          value={this.getDisplayTime()}
        />

        <DatePickerDialog
          ref="datePicker"
          container='dialog'
          initialDate={this.getDate()}
          maxDate={this.parseTime(this.props.maxDate)}
          minDate={this.parseTime(this.props.minDate)}
          okLabel={this.props.okLabel}
          autoOk={this.props.autoOkDatePicker}
          firstDayOfWeek={this.props.firstDayOfWeek}
          onAccept={this.selectDate}
          mode={this.props.datePickerMode}
          disableYearSelection={this.props.disableYearSelection}
          onShow={this.props.onDatePickerShow}
          onDismiss={this.props.onDatePickerDismiss}
          shouldDisableDate={this.props.shouldDisableDate}
          hideCalendarDate={this.props.hideCalendarDate}
          openToYearSelection={this.props.openToYearSelection}
        />

        <TimePickerDialog
          ref="timePicker"
          initialTime={this.getDate()}
          onAccept={this.selectTime}
          bodyStyle={this.props.timePickerBodyStyle}
          onShow={this.props.onTimePickerShow}
          format={this.props.timeFormat}
          okLabel={this.props.okLabel}
          autoOk={this.props.autoOkTimePicker}
          style={this.props.timePickerDialogStyle}
          minutesStep={this.props.minutesStep}
        />
      </span>
    );
  }
}
