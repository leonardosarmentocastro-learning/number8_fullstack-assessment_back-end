import detectPort from 'detect-port';

import { server } from '../server.js';

export const startApiOnRandomPort = async (t) => {
  const availablePort = await detectPort();
  const baseUrl = `http://localhost:${availablePort}`;

  // Test url used for an specific functional test suit.
  t.context.endpointBaseUrl = `${baseUrl}${t.context.endpointOriginalPath || ''}`;

  // API instance that will be closed at the end of each functional test suit.
  t.context.api = await server.start(availablePort);
};
