import { readResolver } from '@leonardosarmentocastro/crud';
import { paginationMiddleware } from '@leonardosarmentocastro/pagination';
import { DepartmentsModel } from './model.js';

export const connect = (app) => {
  app.get('/departments', [
    paginationMiddleware,
    readResolver(DepartmentsModel, { sensitive: true, toJson: true })
  ]);
};
