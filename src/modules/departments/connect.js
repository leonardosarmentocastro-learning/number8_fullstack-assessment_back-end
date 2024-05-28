import { readResolver } from '@leonardosarmentocastro/crud';
// import { EmployeesModel } from './model.js';

export const connect = (app) => {
  // crud.connect(app, EmployeesModel);
  app.get('/orders', [
    // readResolver(OrdersModel, { sensitive: true, toJson: true })
  ]);
};
