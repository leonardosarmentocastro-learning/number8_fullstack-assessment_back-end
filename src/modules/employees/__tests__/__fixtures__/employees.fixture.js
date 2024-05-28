import dayjs from 'dayjs';

import { VALID_ADDRESS_1, VALID_ADDRESS_2 } from '../../../addresses/__tests__/__fixtures__/addresses.fixtures.js';
import { VALID_DEPARTMENT_1, VALID_DEPARTMENT_2 } from '../../../departments/__tests__/__fixtures__/departments.fixtures.js';

const in30days = dayjs().add(30, 'days').startOf('day').valueOf();
export const VALID_EMPLOYEE_1 = {
  firstName: 'Leonardo',
  lastName: 'Sarmento de Castro',
  hireDate: in30days,
  department: VALID_DEPARTMENT_1,
  phone: '5512981276618',
  address: VALID_ADDRESS_1,
};

const tomorrow = dayjs().add(1, 'day').startOf('day').valueOf();
export const VALID_EMPLOYEE_2 = {
  firstName: 'Nela',
  lastName: 'Salvañá',
  hireDate: tomorrow,
  department: VALID_DEPARTMENT_2,
  phone: '5491136173875',
  address: VALID_ADDRESS_2,
};
