import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function RequestArea(props) {
  const {
    title,
    width,
    moveSplitter,
    text,
    onChange,
    name,
    error,
    disabled,
    savePosition
  } = props;
  const areaClass = {
    width: `${width}%`,
    WebkitTransition: 'all',
    msTransition: 'all',
  };
  return (
    <div className="api__request" style={areaClass} onMouseMove={moveSplitter} onMouseUp={savePosition}>
      <span className="api__request-span">{title}: </span>
      <textarea className={`api__request-textarea ${error ? 'textarea-error' : ''}`} value={text} onChange={onChange} name={name} disabled={disabled}></textarea>
    </div>
  );
}

export default RequestArea;

RequestArea.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  width: PropTypes.string,
  error: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  moveSplitter: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  savePosition: PropTypes.func,
};

RequestArea.defaultProps = {
  title: 'Title',
  error: false,
};
