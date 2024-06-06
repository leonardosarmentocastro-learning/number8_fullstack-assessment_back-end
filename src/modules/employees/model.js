import mongoose from 'mongoose';
import { commonSchema, plugSchema, transform } from '@leonardosarmentocastro/database';
import { paginationPlugin } from '@leonardosarmentocastro/pagination';
import {
  indexArrayAttributes,
  isRequiredValidator,
  validate,
} from '@leonardosarmentocastro/validate';
import autopopulate from 'mongoose-autopopulate';

import { addressesSchema } from '../addresses/index.js';
import { DepartmentsModel } from '../departments/index.js';
import { isValidPhone, isValidPictureURL } from './validators.js';

export const departmentsHistorySchema = new mongoose.Schema({
  _id: false,
  date: Date,
  department: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: DepartmentsModel.modelName,
    autopopulate: true,
  },
});

// Setup
departmentsHistorySchema.set('toObject', {
  transform,
  virtuals: true // Expose "id" instead of "_id".
});

export const employeesSchema = new mongoose.Schema({
  address: addressesSchema,
  department: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: DepartmentsModel.modelName,
    autopopulate: true,
  },
  departmentHistory: [ departmentsHistorySchema ],
  firstName: String,
  hireDate: Date,
  lastName: String,
  phone: String,
  pictureURL: String,
  active: { type: Boolean, default: false },
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
      'pictureURL',
      'departmentHistory',
      ...indexArrayAttributes(userDoc, 'departmentHistory', [ 'date', 'department' ]),
    ].map(field => isRequiredValidator(field)),
    isValidPhone,
    isValidPictureURL,
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
employeesSchema.plugin(autopopulate);
employeesSchema.post('validate', validationsMiddleware);

export const EmployeesModel = mongoose.model('Employee', employeesSchema);
