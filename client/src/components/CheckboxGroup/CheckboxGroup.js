import React from 'react';
import classNames from "classnames";

// Code found at: https://codesandbox.io/s/pjqp3xxq7q

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

// Checkbox group
export class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    const target = event.currentTarget;
    let valueArray = [...this.props.value] || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  handleBlur = () => {
    // take care of touched
    this.props.onBlur(this.props.id, true);
  };

  render() {
    const { value, error, touched, label, className, children } = this.props;

    const classes = classNames(
      "input-field",
      {
        "is-success": value || (!error && touched), // handle prefilled or user-filled
        "is-error": !!error && touched
      },
      className
    );

    return (
      <div className={classes}>
        <div className='checkbox-group'>
          <label>{label}</label>
          <div className='checkbox-options'>
            {React.Children.map(children, child => {
              return React.cloneElement(child, {
                field: {
                  value: value.includes(child.props.id),
                  onChange: this.handleChange,
                  onBlur: this.handleBlur
                }
              });
            })}
            {touched && <InputFeedback error={error} />}
          </div>
        </div>
      </div>
    );
  }
}