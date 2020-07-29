import React from 'react';
import './style.css';



class InputLabel extends React.PureComponent {
  state = {
  };

  componentDidMount() {

  }
  render() {
    const { title, type, required } = this.props;
    return (
      <label className="inputs__label">
        <div className="label__head">
            <span className="label__head-title">{title}</span>
            {required ? null : <span className="label__head-optional">Опционально</span>}
        </div>
        <div className="label__input">
          <input className="label__input-input" type={type} required={required}></input>
        </div>
      </label>
    );
  }
}

export default InputLabel;
