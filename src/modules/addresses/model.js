import mongoose from 'mongoose';
import { commonSchema, plugSchema, transform } from '@leonardosarmentocastro/database';
import { isRequiredValidator, validate } from '@leonardosarmentocastro/validate';

import { isValidLocale, isValidZipCode } from './validators.js';

export const addressesSchema = new mongoose.Schema({
  city: String,
  complement: String,
  locale: String,
  neighborhood: String,
  reference: String,
  state: String,
  streetAddress: String,
  streetNumber: Number,
  zipCode: String,
});

// Middlewares
const validationsMiddleware = async (addressDoc, next) => {
  const constraints = [
    ...[
      'city',
      'locale',
      'state',
      'streetAddress',
      'streetNumber',
      'zipCode',
    ].map(field => isRequiredValidator(field)),
    isValidZipCode,
    isValidLocale,
  ];
  const error = await validate(constraints, addressDoc);

  return next(error);
};

// Setup
addressesSchema.set('toObject', {
  transform,
  virtuals: true // Expose "id" instead of "_id".
});
addressesSchema.set('toJSON', {
  virtuals: true // Expose "id" instead of "_id".
});
addressesSchema.plugin(plugSchema(commonSchema));
addressesSchema.post('validate', validationsMiddleware);

export const AddressesModel = mongoose.model('Address', addressesSchema);
