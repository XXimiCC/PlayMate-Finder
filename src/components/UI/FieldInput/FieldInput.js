import React from 'react';
import {Field} from "formik";

const FieldInput = ({errorClassName, name, withoutError, ...inputProps}) => {
  let errorCls = errorClassName || 'form-text text-danger';

  return (
    <>
      <Field
        name={name}
      >
        {({ field, meta }) => (
          <div>
            <input name={name} {...field} {...inputProps}/>
            {!withoutError && meta.error && meta.touched && <small className={errorCls}>{meta.error}</small>}
          </div>
        )}
      </Field>

    </>
  );
};

export default FieldInput;
