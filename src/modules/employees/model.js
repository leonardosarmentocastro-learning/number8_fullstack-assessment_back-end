import mongoose from 'mongoose';
import { commonSchema, plugSchema, transform } from '@leonardosarmentocastro/database';
import { paginationPlugin } from '@leonardosarmentocastro/pagination';
import {
  isRequiredValidator,
  validate,
} from '@leonardosarmentocastro/validate';

import { addressesSchema } from '../addresses/index.js';
import { departmentsSchema } from '../departments/index.js';
import { isValidPhone } from './validators.js';

export const employeesSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  hireDate: Date,
  department: departmentsSchema,
  phone: String,
  address: addressesSchema,
});

// Middlewares
export const USERS_USERNAME_MAX_LENGTH = 24;
const validationsMiddleware = async (userDoc, next) => {
  const constraints = [
    ...[
      'firstName',
      'lastName',
      'hireDate',
      'phone',
    ].map(field => isRequiredValidator(field)),
    isValidPhone,
  ];
  const error = await validate(constraints, userDoc);

  return next(error);
};

// Setup
employeesSchema.set('toObject', {
  transform,
  virtuals: true // Expose "id" instead of "_id".
});
employeesSchema.plugin(plugSchema(commonSchema));
employeesSchema.plugin(paginationPlugin);
employeesSchema.post('validate', validationsMiddleware);

export const EmployeesModel = mongoose.model('Employee', employeesSchema);
