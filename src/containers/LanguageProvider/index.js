/**
 * LanguageProvider(国际化组件))
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { dynamicInject, useModel } from 'white-react-state';
import { IntlProvider } from 'react-intl';
import translationMessages from '../../i18n';
import model from './model';

function LanguageProvider(props) {
  const [locale] = useModel('language');

  return (
    <IntlProvider key={locale} locale={locale} messages={translationMessages[locale]}>
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

LanguageProvider.defaultProps = {};

export default dynamicInject(model)(memo(LanguageProvider));
