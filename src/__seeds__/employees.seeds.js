import { EmployeesModel } from '../modules/employees/index.js';
import { VALID_EMPLOYEE_1, VALID_EMPLOYEE_2 } from '../modules/employees/__tests__/__fixtures__/employees.fixtures.js';

export const seedEmployees = async ({
  createdAddress1,
  createdAddress2,
  createdDepartment1,
  createdDepartment2,
  createdDepartment3,
}) => {
  console.info('[ seeds::employees ] deleting "employees" on database...');
  await EmployeesModel.deleteMany({});
  console.info('[ seeds::employees ] done deleting "employees" on database.');

  console.info('[ seeds::employees ] started creating "employees" on database...');
  const createdEmployee1 = await new EmployeesModel({
    ...VALID_EMPLOYEE_1,
    address: createdAddress1,
    department: createdDepartment1.id,
    departmentHistory: [{
      date: VALID_EMPLOYEE_1.hireDate,
      department: createdDepartment1.id,
    }],
  }).save();
  const createdEmployee2 = await new EmployeesModel({
    ...VALID_EMPLOYEE_2,
    address: createdAddress2,
    department: createdDepartment2.id,
    departmentHistory: [{
      date: VALID_EMPLOYEE_2.hireDate,
      department: createdDepartment2.id,
    }],
  }).save();
  console.info('[ seeds::employees ] done creating "employees" on database.');

  return { createdEmployee1, createdEmployee2 };
};
