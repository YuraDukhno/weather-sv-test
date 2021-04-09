import React from "react";
import Select from "react-select";

const Autocomplete = ({
  // ! props
  options,
  onChange,
  onKeyDown,
  onSelect,
  onBlur,
  value,
  placeholder,
  ...otherProps
}) => (
  <Select
    placeholder={placeholder}
    onKeyDown={onKeyDown}
    options={options}
    value={options.find(option => option.value === value)}
    onChange={onSelect}
    {...otherProps}
  />
);

export default Autocomplete;
