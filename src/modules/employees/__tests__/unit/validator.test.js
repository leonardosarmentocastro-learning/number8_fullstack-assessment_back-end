import test from 'ava';
import { translate, $translations } from '@leonardosarmentocastro/i18n';

import {
  isValidPhone,
} from '../../validators.js';
import { LOCALES } from '../../../addresses/index.js';

const translations = $translations();
const availableLanguages = translations.getAvailableLanguages();

availableLanguages.map(language => {
  test(`(isValidPhone) translation for validator must be set on translation files for language "${language}"`, t => {
    const doc = { zipCode: 'invalid phone' };
    const { validator, ...err } = isValidPhone(doc);
    const translation = translate.error(err, language, doc);

    t.deepEqual(translation, {
      code: 'EMPLOYEES_VALIDATOR_ERROR_INVALID_PHONE',
      field: 'phone',
      locales: LOCALES,
      message: translate.get('EMPLOYEES_VALIDATOR_ERROR_INVALID_PHONE', language, { ...doc, ...err }),
      value: doc.phone,
    });
  });
});
