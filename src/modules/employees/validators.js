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
