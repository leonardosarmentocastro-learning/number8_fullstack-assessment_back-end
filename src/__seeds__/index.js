import { seedAddresses } from './addresses.seeds.js';
import { seedDepartments } from './departments.seeds.js';
import { seedEmployees } from './employees.seeds.js';

export const seedDatabase = async () => {
  const { createdAddress1, createdAddress2 } = await seedAddresses();
  const { createdDepartment1, createdDepartment2, createdDepartment3 } = await seedDepartments();
  const { createdEmployee1, createdEmployee2 } = await seedEmployees({
    createdAddress1,
    createdAddress2,
    createdDepartment1,
    createdDepartment2,
    createdDepartment3,
  });

  return {
    // addresses
    createdAddress1,
    createdAddress2,

    // departments
    createdDepartment1,
    createdDepartment2,
    createdDepartment3,

    // employees
    createdEmployee1,
    createdEmployee2,
  };
};
