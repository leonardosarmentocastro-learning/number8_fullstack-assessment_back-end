import { DepartmentsModel } from '../modules/departments/index.js';
import { VALID_DEPARTMENT_1, VALID_DEPARTMENT_2, VALID_DEPARTMENT_3 } from '../modules/departments/__tests__/__fixtures__/departments.fixtures.js';

export const seedDepartments = async () => {
  console.info('[ seeds::departments ] deleting "departments" on database...');
  await DepartmentsModel.deleteMany({});
  console.info('[ seeds::departments ] done deleting "departments" on database.');

  console.info('[ seeds::departments ] started creating "departments" on database...');
  const createdDepartment1 = await new DepartmentsModel(VALID_DEPARTMENT_1).save();
  const createdDepartment2 = await new DepartmentsModel(VALID_DEPARTMENT_2).save();
  const createdDepartment3 = await new DepartmentsModel(VALID_DEPARTMENT_3).save();
  console.info('[ seeds::departments ] done creating "departments" on database.');

  return { createdDepartment1, createdDepartment2, createdDepartment3 };
};
