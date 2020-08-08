import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function InputLabe(props) {
  const { title, type, required, name, onChange, value, error } = props;
  const titleClass = `label__head-title ${error ? 'errorText' : null}`;
  const inputClass = `label__input-input ${error ? 'errorInput' : null}`;
  return (
    <label className="inputs__label">
      <div className="label__head">
        <span className={titleClass}>{title}</span>
        {required ? null : <span className="label__head-optional">Опционально</span>}
      </div>
      <div className="label__input">
        <input
          className={inputClass}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
        />
      </div>
    </label>
  );
}

InputLabe.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

InputLabe.defaultProps = {
  title: '',
  name: '',
  value: '',
  error: false,
  required: false,
  type: 'text',
};
