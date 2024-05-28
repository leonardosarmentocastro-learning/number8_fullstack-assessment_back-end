import validator from 'validator';

import { LOCALES, POSTAL_CODE_LOCALES } from './constants.js';

export const isValidZipCode = (doc = {}) => ({
  code: 'ADDRESSES_VALIDATOR_ERROR_INVALID_ZIP_CODE',
  field: 'zipCode',
  validator: () => {
    const isValid = POSTAL_CODE_LOCALES.some(locale => validator.isPostalCode(doc.zipCode, locale));
    return isValid;
  },
  value: doc.zipCode,
});

export const isValidLocale = (doc = {}) => ({
  code: 'ADDRESSES_VALIDATOR_ERROR_INVALID_LOCALE',
  field: 'locale',
  locales: LOCALES,
  validator: () => {
    const isValid = validator.isLocale(doc.locale);
    return isValid;
  },
  value: doc.locale,
});
