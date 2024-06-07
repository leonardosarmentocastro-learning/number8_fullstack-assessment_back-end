import test from 'ava';
import { database } from '@leonardosarmentocastro/database';

import { EmployeesModel } from '../../model.js';
import { DepartmentsModel } from '../../../departments/index.js';
import { VALID_DEPARTMENT_1, VALID_DEPARTMENT_2, VALID_DEPARTMENT_3 } from '../../../departments/__tests__/__fixtures__/departments.fixtures.js';
import { AddressesModel, LOCALES } from '../../../addresses/index.js';
import { VALID_EMPLOYEE_1, VALID_EMPLOYEE_2 } from '../__fixtures__/employees.fixtures.js';

const shuffle = str => [...str].sort(()=> Math.random()-.5).join(''); // https://stackoverflow.com/a/60963711

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

const prepare = async (t) => {
  const createdDepartment1 = await new DepartmentsModel(VALID_DEPARTMENT_1).save();
  const createdDepartment2 = await new DepartmentsModel(VALID_DEPARTMENT_2).save();
  const createdDepartment3 = await new DepartmentsModel(VALID_DEPARTMENT_3).save();

  const preparedEmployee1 = {
    ...VALID_EMPLOYEE_1,
    department: createdDepartment1.id,
    departmentHistory: [{
      date: VALID_EMPLOYEE_1.hireDate,
      department: createdDepartment1.id,
    }]
  };

  const preparedEmployee2 = {
    ...VALID_EMPLOYEE_2,
    department: createdDepartment2.id,
    departmentHistory: [{
      date: VALID_EMPLOYEE_2.hireDate,
      department: createdDepartment2.id,
    }]
  }

  return {
    createdDepartment1,
    createdDepartment2,
    createdDepartment3,
    preparedEmployee1,
    preparedEmployee2,
  };
};

test('employee creation must succeeds', async t => {
  t.assert((await getEmployeesSavedOnDatabase()).length === 0);

  const {
    createdDepartment1,
    createdDepartment2,
    preparedEmployee1,
    preparedEmployee2,
  } = await prepare(t);

  const createdEmployee1 = await new EmployeesModel(preparedEmployee1).save();

  // assert auto population
  t.truthy(createdEmployee1?.department?.id === createdDepartment1.id);
  t.truthy(createdEmployee1?.department?.name === createdDepartment1.name);

  const createdEmployee2 = await new EmployeesModel(preparedEmployee2).save();

  // assert auto population
  t.truthy(createdEmployee2?.department?.id === createdDepartment2.id);
  t.truthy(createdEmployee2?.department?.name === createdDepartment2.name);

  t.assert((await getEmployeesSavedOnDatabase()).length === 2);
});

[
  'firstName',
  'lastName',
  'hireDate',
  'phone',
  'pictureURL',
  'departmentHistory',
].map(field => {
  test(`employee creation must fail due to lack of required field "${field}"`, async t => {
    t.assert((await getEmployeesSavedOnDatabase()).length === 0);

    const { preparedEmployee1 } = await prepare(t);

    try {
      await new EmployeesModel({
        ...preparedEmployee1,
        [field]: undefined,
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

test(`employee creation must fail due to invalid phone number`, async t => {
  t.assert((await getEmployeesSavedOnDatabase()).length === 0);

  const { preparedEmployee1, preparedEmployee2 } = await prepare(t);

  const phone1 = shuffle(preparedEmployee1.phone);
  try {
    await new EmployeesModel({
      ...preparedEmployee1,
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

  const phone2 = shuffle(preparedEmployee2.phone);
  try {
    await new EmployeesModel({
      ...preparedEmployee2,
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

  const { preparedEmployee1, preparedEmployee2 } = await prepare(t);

  const pictureURL1 = shuffle(preparedEmployee1.pictureURL);
  try {
    await new EmployeesModel({
      ...preparedEmployee1,
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

  const pictureURL2 = shuffle(preparedEmployee2.pictureURL);
  try {
    await new EmployeesModel({
      ...preparedEmployee2,
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

[ 'date', 'department' ].map(field => test(`section creation must fail due to lack of presence of field "${field}" in "departmentHistory" list`, async t => {
  t.assert((await getEmployeesSavedOnDatabase()).length === 0);

  const { preparedEmployee1 } = await prepare(t);

  const validDepartmentHistory = {
    date: preparedEmployee1.hireDate,
    department: preparedEmployee1.department,
  };

  try {
    await new EmployeesModel({
        ...preparedEmployee1,
        departmentHistory: [{ ...validDepartmentHistory, [field]: undefined }],
      })
      .save()
  } catch(err) {
    t.deepEqual(err, {
      code: 'VALIDATOR_ERROR_FIELD_IS_REQUIRED',
      field: `departmentHistory[0].${field}`,
    });
  }

  t.assert((await getEmployeesSavedOnDatabase()).length === 0);

  try {
    await new EmployeesModel({
        ...preparedEmployee1,
        departmentHistory: [ validDepartmentHistory , { ...validDepartmentHistory, [field]: undefined }],
      })
      .save()
  } catch(err) {
    t.deepEqual(err, {
      code: 'VALIDATOR_ERROR_FIELD_IS_REQUIRED',
      field: `departmentHistory[1].${field}`,
    });
  }

  t.assert((await getEmployeesSavedOnDatabase()).length === 0);
}));
