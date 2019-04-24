import React from 'react';
import classNames from "classnames";

// Code found at: https://codesandbox.io/s/pjqp3xxq7q

const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;


// Checkbox input
export const Checkbox = ({
                    field: { name, value, onChange, onBlur },
                    form: { errors, touched, setFieldValue },
                    id,
                    label,
                    className,
                    ...props
                  }) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};