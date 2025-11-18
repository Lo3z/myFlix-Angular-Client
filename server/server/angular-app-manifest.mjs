
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'MyFlix-Angular-Client',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 24632, hash: '3c90e6090926cf48795414ddb553d6dd16899ac91c104a6f6f0aa9811f5d1969', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17085, hash: '0d948143fabc19350e2a92c39aa7fab4f0988398fb0616e8b5f58c1abee43932', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-DTTV3AOM.css': {size: 8100, hash: 'jHWbwFO0LXY', text: () => import('./assets-chunks/styles-DTTV3AOM_css.mjs').then(m => m.default)}
  },
};
