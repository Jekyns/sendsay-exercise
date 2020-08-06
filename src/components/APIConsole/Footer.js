import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function RequestTab(props) {
  const { formatRequestText, onSubmit } = props;
  return (
    <div className="footer">
      <div className="footer__submit">
        <button className="footer__submit-button" onClick={() => { onSubmit(); }}>Отправить</button>
      </div>
      <a href="https://github.com/Jekyns/sendsay-exercise" className="wrapper__link">
          <span href="https://github.com/Jekyns/sendsay-exercise" className="wrapper__link-visible">@Jekyns</span>
          <span className="wrapper__link-typing">/sendsay-exercise</span>
        </a>
      <div className="footer__beautify" onClick={formatRequestText}>
        <button className="footer__beautify-button">
          <div className="beautify__button">
            <svg className="beautify__button-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.8">
                <path d="M21 10H7" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 6H3" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 14H7" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 18H3" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
          <span className="beautify__button-span">Форматировать</span>
        </button>
      </div>
    </div>
  );
}

export default RequestTab;

RequestTab.propTypes = {
  formatRequestText: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};
