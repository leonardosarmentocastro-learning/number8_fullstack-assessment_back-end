import dayjs from 'dayjs';

import { VALID_ADDRESS_1, VALID_ADDRESS_2 } from '../../../addresses/__tests__/__fixtures__/addresses.fixtures.js';
import { VALID_DEPARTMENT_1, VALID_DEPARTMENT_2 } from '../../../departments/__tests__/__fixtures__/departments.fixtures.js';

export const VALID_EMPLOYEE_1 = {
  active: true,
  address: VALID_ADDRESS_1,
  department: VALID_DEPARTMENT_1,
  firstName: 'Leonardo',
  hireDate: dayjs()
    .subtract(2, 'years')
    .subtract(3, 'months')
    .subtract(10, 'days')
    .startOf('day')
    .valueOf(),
  lastName: 'Sarmento de Castro',
  phone: '5512981276618',
  pictureURL: 'https://media.licdn.com/dms/image/D4D03AQGrpVCKZnAing/profile-displayphoto-shrink_800_800/0/1699902703285?e=1723075200&v=beta&t=-vnDzjzXGpY38ocIOMiZteJgxb5xtRQXZwJiqaBDErk',
};

export const VALID_EMPLOYEE_2 = {
  active: false,
  address: VALID_ADDRESS_2,
  department: VALID_DEPARTMENT_2,
  firstName: 'Nela',
  hireDate: dayjs()
    .subtract(5, 'years')
    .subtract(6, 'months')
    .subtract(1, 'days')
    .startOf('day')
    .valueOf(),
  lastName: 'Salvañá',
  phone: '5491136173875',
  pictureURL: 'https://media.licdn.com/dms/image/C4D03AQF41Co1RbjnEw/profile-displayphoto-shrink_800_800/0/1607714737227?e=1723075200&v=beta&t=gShegynHmxk9YMiePMGHuo2GB5ozELXZ9BTYCW8BsJI',
};
