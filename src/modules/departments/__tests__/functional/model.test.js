import test from 'ava';
import { database } from '@leonardosarmentocastro/database';

import { VALID_DEPARTMENT_1, VALID_DEPARTMENT_2 } from '../__fixtures__/departments.fixtures.js';
import { DepartmentsModel } from '../../model.js';

const cleanUp = async t => {
  await DepartmentsModel.deleteMany({});
};

test.before(t => database.connect());
test.beforeEach(t => cleanUp(t))

const getDepartmentsSavedOnDatabase = () => DepartmentsModel.find({});
test('department creation must succeeds', async t => {
  t.assert((await getDepartmentsSavedOnDatabase()).length === 0);

  await new DepartmentsModel(VALID_DEPARTMENT_1).save();
  await new DepartmentsModel(VALID_DEPARTMENT_2).save();

  t.assert((await getDepartmentsSavedOnDatabase()).length === 2);
});

[
  'name',
].map(field => {
  test(`department creation must fail due to lack of required field "${field}"`, async t => {
    t.assert((await getDepartmentsSavedOnDatabase()).length === 0);

    try {
      await new DepartmentsModel({
        name: '',
      }).save();
    } catch(err) {
      t.deepEqual(err, {
        code: 'VALIDATOR_ERROR_FIELD_IS_REQUIRED',
        field,
      });
    }

    t.assert((await getDepartmentsSavedOnDatabase()).length === 0);
  });

  test(`department creation must fail due to repetition of "${field}" field`, async t => {
    t.assert((await getDepartmentsSavedOnDatabase()).length === 0);

    try {
      await new DepartmentsModel({
        name: 'Technology',
      }).save();

      await new DepartmentsModel({
        name: 'Technology',
      }).save();
    } catch(err) {
      t.deepEqual(err, {
        code: 'VALIDATOR_ERROR_FIELD_IS_ALREADY_IN_USE',
        field,
      });
    }

    t.assert((await getDepartmentsSavedOnDatabase()).length === 1);
  });
});
