import test from 'ava';
import { database } from '@leonardosarmentocastro/database';

import { EmployeesModel } from '../../model.js';
import { DepartmentsModel } from '../../../departments/index.js';
import { AddressesModel, LOCALES } from '../../../addresses/index.js';
import { VALID_EMPLOYEE_1, VALID_EMPLOYEE_2 } from '../__fixtures__/employees.fixtures.js';

const cleanUp = async t => {
  await DepartmentsModel.deleteMany({});
  await EmployeesModel.deleteMany({});
  await AddressesModel.deleteMany({});
};

// const getDepartmentsSavedOnDatabase = () => DepartmentsModel.find({});
const getEmployeesSavedOnDatabase = () => EmployeesModel.find({});
// const getAddressSavedOnDatabase = () => AddressesModel.find({});

test.before(t => database.connect());
test.beforeEach(t => cleanUp(t))

test('employee creation must succeeds', async t => {
  t.assert((await getEmployeesSavedOnDatabase()).length === 0);

  await new EmployeesModel(VALID_EMPLOYEE_1).save();
  await new EmployeesModel(VALID_EMPLOYEE_2).save();

  t.assert((await getEmployeesSavedOnDatabase()).length === 2);
});

[
  'firstName',
  'lastName',
  'hireDate',
  'phone',
  'pictureURL',
].map(field => {
  test(`employee creation must fail due to lack of required field "${field}"`, async t => {
    t.assert((await getEmployeesSavedOnDatabase()).length === 0);

    try {
      await new EmployeesModel({
        ...VALID_EMPLOYEE_1,
        [field]: '',
      }).save();
    } catch(err) {
      t.deepEqual(err, {
        code: 'VALIDATOR_ERROR_FIELD_IS_REQUIRED',
        field,
      });
    }

    t.assert((await getEmployeesSavedOnDatabase()).length === 0);
  });
});

const shuffle = str => [...str].sort(()=> Math.random()-.5).join(''); // https://stackoverflow.com/a/60963711
test(`employee creation must fail due to invalid phone number`, async t => {
  t.assert((await getEmployeesSavedOnDatabase()).length === 0);

  const phone1 = shuffle(VALID_EMPLOYEE_1.phone);
  try {
    await new EmployeesModel({
      ...VALID_EMPLOYEE_1,
      phone: phone1,
    }).save();
  } catch(err) {
    t.deepEqual(err, {
      code: 'EMPLOYEES_VALIDATOR_ERROR_INVALID_PHONE',
      field: 'phone',
      locales: LOCALES,
      value: phone1,
    });
  }

  t.assert((await getEmployeesSavedOnDatabase()).length === 0);

  const phone2 = shuffle(VALID_EMPLOYEE_2.phone);
  try {
    await new EmployeesModel({
      ...VALID_EMPLOYEE_2,
      phone: phone2,
    }).save();
  } catch(err) {
    t.deepEqual(err, {
      code: 'EMPLOYEES_VALIDATOR_ERROR_INVALID_PHONE',
      field: 'phone',
      locales: LOCALES,
      value: phone2,
    });
  }

  t.assert((await getEmployeesSavedOnDatabase()).length === 0);
});

test(`employee creation must fail due to invalid "pictureURL"`, async t => {
  t.assert((await getEmployeesSavedOnDatabase()).length === 0);

  const pictureURL1 = shuffle(VALID_EMPLOYEE_1.pictureURL);
  try {
    await new EmployeesModel({
      ...VALID_EMPLOYEE_1,
      pictureURL: pictureURL1,
    }).save();
  } catch(err) {
    t.deepEqual(err, {
      code: 'EMPLOYEES_VALIDATOR_ERROR_INVALID_PICTURE_URL',
      field: 'pictureURL',
      value: pictureURL1,
    });
  }

  t.assert((await getEmployeesSavedOnDatabase()).length === 0);

  const pictureURL2 = shuffle(VALID_EMPLOYEE_2.pictureURL);
  try {
    await new EmployeesModel({
      ...VALID_EMPLOYEE_2,
      pictureURL: pictureURL2,
    }).save();
  } catch(err) {
    t.deepEqual(err, {
      code: 'EMPLOYEES_VALIDATOR_ERROR_INVALID_PICTURE_URL',
      field: 'pictureURL',
      value: pictureURL2,
    });
  }

  t.assert((await getEmployeesSavedOnDatabase()).length === 0);
});
