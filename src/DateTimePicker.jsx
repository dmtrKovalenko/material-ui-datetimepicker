import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import { TextField, IconButton } from 'material-ui';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-end',
  },
};

export default class DateTimePicker extends Component {
  static propTypes = {
    // IMPORTANT
    DatePicker: PropTypes.func.isRequired,
    TimePicker: PropTypes.func.isRequired,

    DateTimeFormat: PropTypes.object,
    locale: PropTypes.string,

    format: PropTypes.string,
    timePickerDelay: PropTypes.number,
    okLabel: PropTypes.string,
    name: PropTypes.string,
    showCurrentDateByDefault: PropTypes.bool,
    returnMomentDate: PropTypes.bool,
    clearIcon: PropTypes.node,
    textFieldClassName: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,

    // styles
    className: PropTypes.string,
    clearIconStyle: PropTypes.object,
    textFieldStyle: PropTypes.object,
    style: PropTypes.object,

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
    onDatePickerDismiss: PropTypes.func,
    customValue: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),

    // TimePicker
    onTimeSelected: PropTypes.func,
    onTimePickerShow: PropTypes.func,
    timePickerBodyStyle: PropTypes.shape({}),
    timeFormat: PropTypes.oneOf(['ampm', '24hr']),
    autoOkTimePicker: PropTypes.bool,
    timePickerDialogStyle: PropTypes.shape({}),
    minutesStep: PropTypes.number,
  }

  static defaultProps = {
    customValue: undefined,
    okLabel: 'OK',
    minDate: undefined,
    maxDate: undefined,
    name: 'datepicker',
    format: 'MMM DD, YYYY hh:mm A',
    timePickerDelay: 150,
    className: 'datetime-container',
    textFieldClassName: 'datetime-input',
    autoOkDatePicker: true,
    datePickerMode: 'portrait',
    openToYearSelection: false,
    disableYearSelection: false,
    hideCalendarDate: false,
    firstDayOfWeek: 1,
    disabled: false,
    placeholder: undefined,

    DateTimeFormat: undefined,
    locale: undefined,

    timeFormat: 'ampm',
    autoOkTimePicker: false,
    timePickerDialogStyle: {},
    minutesStep: 1,
    showCurrentDateByDefault: false,
    returnMomentDate: false,
    clearIcon: <ClearIcon />,

    // styles
    clearIconStyle: { },
    textFieldStyle: { },
    style: { },
    timePickerBodyStyle: { },

    // functions
    onChange: () => { },
    onFocus: () => { },
    onTimePickerShow: () => { },
    onDatePickerShow: () => { },
    onDateSelected: () => { },
    onTimeSelected: () => { },
    shouldDisableDate: () => { },
    onDatePickerDismiss: () => { },
  }

  // eslint-disable-next-line
  getInitialTime = () => this.props.customValue
    ? moment(this.props.customValue)
    : null

  state = {
    dateTime: this.getInitialTime(),
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.customValue !== this.props.customValue) {
      this.setState({ dateTime: this.getInitialTime() });
    }
  }

  /*
    * Get current selected date by user
    @returns { Object } moment or vanilla date object
  */
  getDate = () => {
    if (!this.state.dateTime) {
      return null;
    }

    return this.props.returnMomentDate
      ? this.state.dateTime
      : this.state.dateTime.toDate();
  }

  getDateOrCurrentTime = () => (this.state.dateTime
    ? this.state.dateTime.toDate()
    : new Date())

  getDateOrNull = time => (time
    ? moment(time).toDate()
    : null)

  getDisplayTime = () => {
    const { dateTime } = this.state;
    const defaultTime = this.props.showCurrentDateByDefault
      ? moment().format(this.props.format)
      : this.props.placeholder || '';

    return dateTime
      ? dateTime.format(this.props.format)
      : defaultTime;
  }

  openDatePicker = (e) => {
    e.preventDefault();
    this.datePicker.show();
  }

  selectDate = (date) => {
    const currentDateTime = moment(this.getDateOrCurrentTime());
    const dateTime = moment(date)
      .set('hours', currentDateTime.hours()) // fill time unites
      .set('minutes', currentDateTime.minutes());

    this.setState({ dateTime });

    this.props.onDateSelected(this.getDate());
    // show timepicker
    setTimeout(() => this.timePicker.show(), this.props.timePickerDelay);
  }

  selectTime = (date) => {
    const { dateTime } = this.state;

    dateTime.hours(date.getHours());
    dateTime.minutes(date.getMinutes());

    this.setState({ dateTime });
    this.props.onTimeSelected(this.getDate());
    this.props.onChange(this.getDate());
  }

  handleFocus = (event) => {
    event.target.blur();
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  clearState = () => {
    this.setState({ dateTime: null });
    this.props.onChange(null);
  }

  render() {
    const {
      clearIcon, maxDate, minDate, timeFormat,
      firstDayOfWeek, textFieldClassName, autoOkDatePicker,
      datePickerMode, disableYearSelection, shouldDisableDate,
      hideCalendarDate, openToYearSelection, timePickerBodyStyle,
      okLabel, autoOkTimePicker, timePickerDialogStyle, clearIconStyle, style, textFieldStyle,
      minutesStep,
      timePickerDelay,
      showCurrentDateByDefault,
      returnMomentDate,
      DatePicker, TimePicker,
      DateTimeFormat, locale,
      onTimePickerShow,
      onTimePickerDismiss,
      onDatePickerShow,
      onDatePickerDismiss,
      onDateSelected,
      onTimeSelected,
      disabled,
      customValue,
      ...other
    } = this.props;

    return (
      <div style={{ ...styles.container, style }} className={this.props.className}>
        <TextField
          {...other}
          onFocus={this.handleFocus}
          className={textFieldClassName}
          onClick={this.openDatePicker}
          value={this.getDisplayTime()}
          style={{ ...styles.textField, ...textFieldStyle }}
          disabled={disabled}
        />

        {
          clearIcon
            ? <IconButton
              onClick={this.clearState}
              style={{ ...styles.clearIcon, ...clearIconStyle }}
              disabled={disabled}>
              { clearIcon }
            </IconButton>
            : null
        }

        <DatePicker
          ref={(node) => { this.datePicker = node; }}
          initialDate={this.getDateOrCurrentTime()}
          maxDate={this.getDateOrNull(maxDate)}
          minDate={this.getDateOrNull(minDate)}
          okLabel={okLabel}
          autoOk={autoOkDatePicker}
          firstDayOfWeek={firstDayOfWeek}
          onAccept={this.selectDate}
          mode={datePickerMode}
          disableYearSelection={disableYearSelection}
          onShow={onDatePickerShow}
          onDismiss={onDatePickerDismiss}
          shouldDisableDate={shouldDisableDate}
          hideCalendarDate={hideCalendarDate}
          openToYearSelection={openToYearSelection}
          DateTimeFormat = { DateTimeFormat }
          locale = { locale }
        />

        <TimePicker
          ref={(node) => { this.timePicker = node; }}
          initialTime={this.getDateOrCurrentTime()}
          onAccept={this.selectTime}
          bodyStyle={timePickerBodyStyle}
          onShow={onTimePickerShow}
          format={timeFormat}
          okLabel={okLabel}
          autoOk={autoOkTimePicker}
          style={timePickerDialogStyle}
          minutesStep={minutesStep}
          onDismiss={onTimePickerDismiss}
        />
      </div>
    );
  }
}
