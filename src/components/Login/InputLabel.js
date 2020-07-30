import React from 'react';
import './style.css';



class InputLabel extends React.PureComponent {
  state = {
  };

  componentDidMount() {

  }
  render() {
    const { title, type, required, name, onChange, value, error } = this.props;
    const titleClass = `label__head-title ${error ? 'errorText' : null}`;
    const inputClass = `label__input-input ${error ? 'errorInput' : null}`;
    return (
      <label className="inputs__label">
        <div className="label__head">
            <span className={titleClass}>{title}</span>
            {required ? null : <span className="label__head-optional">Опционально</span>}
        </div>
        <div className="label__input">
          <input className={inputClass} type={type} value={value} name={name} onChange={onChange}></input>
        </div>
      </label>
    );
  }
}

export default InputLabel;
