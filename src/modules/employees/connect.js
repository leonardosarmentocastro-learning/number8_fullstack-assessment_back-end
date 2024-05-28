import { crud } from '@leonardosarmentocastro/crud';
import { EmployeesModel } from './model.js';

export const connect = (app) => {
  crud.connect(app, EmployeesModel);
};
