import test from 'ava';
import { database } from '@leonardosarmentocastro/database';

import { seedDatabase } from '../../index.js';
import { AddressesModel } from '../../../modules/addresses/index.js';
import { DepartmentsModel } from '../../../modules/departments/index.js';
import { EmployeesModel } from '../../../modules/employees/index.js';

const cleanUp = async t => {
  await AddressesModel.deleteMany({});
  await DepartmentsModel.deleteMany({});
  await EmployeesModel.deleteMany({});
};

const getAddressesSavedOnDatabase = () => AddressesModel.find({});
const getDepartmentsSavedOnDatabase = () => DepartmentsModel.find({});
const getEmployeesSavedOnDatabase = () => EmployeesModel.find({});

test.before(t => database.connect());
test.beforeEach(cleanUp);
test.afterEach(cleanUp);

test('database seeding must succeed on creating records for all available models ("addresses", "departments" and "employees")', async t => {
  t.assert((await getAddressesSavedOnDatabase()).length === 0);
  t.assert((await getDepartmentsSavedOnDatabase()).length === 0);
  t.assert((await getEmployeesSavedOnDatabase()).length === 0);

  await t.notThrowsAsync(seedDatabase());

  t.assert((await getAddressesSavedOnDatabase()).length === 2);
  t.assert((await getDepartmentsSavedOnDatabase()).length === 3);
  t.assert((await getEmployeesSavedOnDatabase()).length === 2);
});
