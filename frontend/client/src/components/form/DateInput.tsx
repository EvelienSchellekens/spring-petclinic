// /// <reference path="../../react-datepicker.d.ts" />

import * as React from 'react';

import ReactDatePicker from 'react-datepicker';
import * as moment from 'moment';

import { IError, IInputChangeHandler } from '../../types/index';

import FieldFeedbackPanel from './FieldFeedbackPanel';

export default ({object, error, name, label, onChange}: { object: any, error: IError, name: string, label: string, onChange: IInputChangeHandler }) => {

  const handleOnChange = value => {
    const dateString = value ? value.format('YYYY/MM/DD') : null;
    onChange(name, dateString, null);
  };

  const selectedValue = object[name] ? moment(object[name], 'YYYY/MM/DD') : null;
  const fieldError = error && error.fieldErrors[name];
  const valid = !fieldError && selectedValue != null;

  const cssGroup = `form-group ${fieldError ? 'has-error' : ''}`;

  return (
    <div className={cssGroup}>
      <label className='col-sm-2 control-label'>{label}</label>

      <div className='col-sm-10'>
        <ReactDatePicker selected={selectedValue} onChange={handleOnChange} className='form-control' dateFormat='YYYY-MM-DD' />
        <span className='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>
        <FieldFeedbackPanel valid={valid} fieldError={fieldError} />
      </div>
    </div>
  );
};
