# Material UI Date & Time picker

> Wrapper for [Material UI](http://material-ui.com) Time and Date picker component

# [Demo](https://dmtrkovalenko.github.io/material-ui-datetimepicker/)
Component, that joins Material UI`s pickers into the one component, one input and 2 dialogs, appearing one by one. 

### Dependencies

* **Material UI** (Don`t use this package without material-ui, please)
* **React** 

### Getting Started
Here is a quick example to get you started, it's all you need:

```sh
npm install material-ui-datetimepicker
``` 

Simple usage

```jsx
import React from 'react';
import DateTimePicker from 'material-ui-datetimepicker';

class Demo extends React.Component {
  state = {
    dateTime: null
  }

  setDate = (dateTime) => this.setState({ dateTime })

  render() {
    return (
      <DateTimePicker onChange={this.setDate} />
    );
  }
}
```


### Properties


## Contributing

## LICENSE

MIT: 