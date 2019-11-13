import React from 'react';
import ReactSelect from 'react-select'
import css from './Select.module.scss';

const Select = (props) => {
  let cls = props.className ? `${props.className} ${css.ReactSelectWrapper}` : css.ReactSelectWrapper;

  return (
    <ReactSelect
      {...props}
      className={cls}
      classNamePrefix={'react-select'}
    />
  );
};

export default Select;
