import React from 'react';
import Select from "../Select/Select";
import {Field} from "formik";
import {expandSchemaError} from '../../../utils';

const FieldSelect = ({name, errorClassName, component, withoutError, ...selectProps}) => {
  let errorCls = errorClassName || 'form-text text-danger';
  let Component = component || Select;

  //TODO Сделать ошибку не занимающую места

  return (
    <Field name={name}>
      {({ field, form, meta }) => (
        <>
          <Component
            {...field}
            {...selectProps}
            onChange={(selected) => form.setFieldValue(field.name, selected)}
            onBlur={() => form.setFieldTouched(field.name, true)}
          />
          {!withoutError && meta.error && meta.touched && <small className={errorCls}>{expandSchemaError(meta.error)}</small>}
        </>
      )}
    </Field>
  );
};

export default FieldSelect;
