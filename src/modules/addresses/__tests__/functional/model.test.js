import test from 'ava';
import { database } from '@leonardosarmentocastro/database';

import { VALID_ADDRESS_1, VALID_ADDRESS_2 } from '../__fixtures__/addresses.fixtures.js';
import { AddressesModel } from '../../model.js';
import { POSTAL_CODE_LOCALES } from '../../constants.js';

const cleanUp = async t => {
  await AddressesModel.deleteMany({});
};

test.before(t => database.connect());
test.beforeEach(t => cleanUp(t))

const getDepartmentsSavedOnDatabase = () => AddressesModel.find({});
test('address creation must succeeds', async t => {
  t.assert((await getDepartmentsSavedOnDatabase()).length === 0);

  await new AddressesModel(VALID_ADDRESS_1).save();
  await new AddressesModel(VALID_ADDRESS_2).save();

  t.assert((await getDepartmentsSavedOnDatabase()).length === 2);
});

[
  'city',
  'state',
  'streetAddress',
  'streetNumber',
  'zipCode',
].map(field => {
  test(`address creation must fail due to lack of required field "${field}"`, async t => {
    t.assert((await getDepartmentsSavedOnDatabase()).length === 0);

    try {
      await new AddressesModel({
        ...VALID_ADDRESS_1,
        [field]: '',
      }).save();
    } catch(err) {
      t.deepEqual(err, {
        code: 'VALIDATOR_ERROR_FIELD_IS_REQUIRED',
        field,
      });
    }

    t.assert((await getDepartmentsSavedOnDatabase()).length === 0);
  });
});

test(`address creation must fail due to invalid "${POSTAL_CODE_LOCALES.join(', ')}" zip code`, async t => {
  t.assert((await getDepartmentsSavedOnDatabase()).length === 0);

  try {
    await new AddressesModel({
      ...VALID_ADDRESS_1,
      zipCode: 'invalid zipcode',
    }).save();
  } catch(err) {
    t.deepEqual(err, {
      code: 'ADDRESSES_VALIDATOR_ERROR_INVALID_ZIP_CODE',
      field: 'zipCode',
      value: 'invalid zipcode',
    });
  }

  t.assert((await getDepartmentsSavedOnDatabase()).length === 0);

  try {
    await new AddressesModel({
      ...VALID_ADDRESS_2,
      zipCode: '12345-123123',
    }).save();
  } catch(err) {
    t.deepEqual(err, {
      code: 'ADDRESSES_VALIDATOR_ERROR_INVALID_ZIP_CODE',
      field: 'zipCode',
      value: '12345-123123',
    });
  }

  t.assert((await getDepartmentsSavedOnDatabase()).length === 0);
});
