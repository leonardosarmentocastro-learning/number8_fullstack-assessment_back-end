import { AddressesModel } from '../modules/addresses/index.js';
import { VALID_ADDRESS_1, VALID_ADDRESS_2 } from '../modules/addresses/__tests__/__fixtures__/addresses.fixtures.js';

export const seedAddresses = async () => {
  console.info('[ seeds::addresses ] deleting "addresses" on database...');
  await AddressesModel.deleteMany({});
  console.info('[ seeds::addresses ] done deleting "addresses" on database.');

  console.info('[ seeds::addresses ] started creating "addresses" on database...');
  const createdAddress1 = await new AddressesModel(VALID_ADDRESS_1).save();
  const createdAddress2 = await new AddressesModel(VALID_ADDRESS_2).save();
  console.info('[ seeds::addresses ] done creating "addresses" on database.');

  return { createdAddress1, createdAddress2 };
};
