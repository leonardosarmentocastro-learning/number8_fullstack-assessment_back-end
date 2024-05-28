import mongoose from 'mongoose';
import { commonSchema, plugSchema, transform } from '@leonardosarmentocastro/database';
import { paginationPlugin } from '@leonardosarmentocastro/pagination';
import {
  isAlreadyInUseValidator,
  isRequiredValidator,
  validate,
} from '@leonardosarmentocastro/validate';

export const departmentsSchema = new mongoose.Schema({
  name: String,
});

// Middlewares
export const USERS_USERNAME_MAX_LENGTH = 24;
const validationsMiddleware = async (userDoc, next) => {
  const constraints = [
    isRequiredValidator('name'),
    isAlreadyInUseValidator('name')
  ];
  const error = await validate(constraints, userDoc);

  return next(error);
};

// Setup
departmentsSchema.set('toObject', {
  transform,
  virtuals: true // Expose "id" instead of "_id".
});
departmentsSchema.plugin(plugSchema(commonSchema));
departmentsSchema.plugin(paginationPlugin);
departmentsSchema.post('validate', validationsMiddleware);

export const DepartmentsModel = mongoose.model('Department', departmentsSchema);
