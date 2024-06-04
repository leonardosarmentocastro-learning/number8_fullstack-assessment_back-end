import validator from 'validator';

import { LOCALES } from '../addresses/index.js';

export const isValidPhone = (doc = {}) => ({
  code: 'EMPLOYEES_VALIDATOR_ERROR_INVALID_PHONE',
  field: 'phone',
  locales: LOCALES,
  validator: () => {
    const isValid = validator.isMobilePhone(doc.phone, LOCALES);
    return isValid;
  },
  value: doc.phone,
});

export const isValidPictureURL = (doc = {}) => ({
  code: 'EMPLOYEES_VALIDATOR_ERROR_INVALID_PICTURE_URL',
  field: 'pictureURL',
  validator: () => {
    const isValid = validator.isURL(doc.pictureURL, {
      require_protocol: true,
      require_valid_protocol: true,
      protocols: ['http', 'https'],
      require_host: true,
    });

    return isValid;
  },
  value: doc.pictureURL,
});
