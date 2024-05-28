import test from 'ava';
import { translate, $translations } from '@leonardosarmentocastro/i18n';

import {
  isValidLocale,
  isValidZipCode,
} from '../../validators.js';
import { LOCALES } from '../../constants.js';

const translations = $translations();
const availableLanguages = translations.getAvailableLanguages();

availableLanguages.map(language => {
  test(`(isValidZipCode) translation for validator must be set on translation files for language "${language}"`, t => {
    const doc = { zipCode: 'invalid zip code' };
    const { validator, ...err } = isValidZipCode(doc);
    const translation = translate.error(err, language, doc);

    t.deepEqual(translation, {
      code: 'ADDRESSES_VALIDATOR_ERROR_INVALID_ZIP_CODE',
      field: 'zipCode',
      message: translate.get('ADDRESSES_VALIDATOR_ERROR_INVALID_ZIP_CODE', language, { ...doc, ...err }),
      value: doc.zipCode,
    });
  });

  test(`(isValidLocale) translation for validator must be set on translation files for language "${language}"`, t => {
    const doc = { locale: 'invalid locale' };
    const { validator, ...err } = isValidLocale(doc);
    const translation = translate.error(err, language, doc);

    t.deepEqual(translation, {
      code: 'ADDRESSES_VALIDATOR_ERROR_INVALID_LOCALE',
      field: 'locale',
      locales: LOCALES,
      message: translate.get('ADDRESSES_VALIDATOR_ERROR_INVALID_LOCALE', language, { ...doc, ...err }),
      value: doc.locale,
    });
  });
});
