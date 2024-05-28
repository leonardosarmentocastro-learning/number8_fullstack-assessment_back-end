import { LOCALE, TIMEOUT } from './constants.js';

export const getRequestOptions = (t) => ({
  headers: {
    'accept-language': LOCALE, // Language which the application will serve content.
  },
  // json: true, // Automatically parses "response.body": https://github.com/sindresorhus/got/issues/174#issuecomment-298292987
  method: t.context.endpointMethod || 'get',
  timeout: {
    request: TIMEOUT,
  },
});
