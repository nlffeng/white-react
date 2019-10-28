/**
 * LanguageProvider(国际化组件))
 */

import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import translationMessages from '../../i18n';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';

function LanguageProvider(props) {
  const {
    locale,
    children,
  } = props;

  return (
    <IntlProvider key={locale} locale={locale} messages={translationMessages[locale]}>
      {React.Children.only(children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

LanguageProvider.defaultProps = {};

const mapStateToProps = state => ({
  locale: state.language.locale,
});

const withReducer = injectReducer({ key: 'language', reducer });
const withConnect = connect(mapStateToProps, null);

export default compose(
  withReducer,
  withConnect
)(LanguageProvider);
