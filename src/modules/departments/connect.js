import { readResolver } from '@leonardosarmentocastro/crud';
import { DepartmentsModel } from './model.js';

export const connect = (app) => {
  app.get('/departments', [
    readResolver(DepartmentsModel, { sensitive: true, toJson: true })
  ]);
};
