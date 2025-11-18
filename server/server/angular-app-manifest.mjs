
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/myFlix-Angular-Client/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 24634, hash: 'd0f540882d6173bb93a9372f330c091b427321d7354e8b8668db0331af4bb726', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17087, hash: '66122009f5e465140f2f8d1f44ce5d3e9641b8bb85b1002ca261c081787f9ec8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-DTTV3AOM.css': {size: 8100, hash: 'jHWbwFO0LXY', text: () => import('./assets-chunks/styles-DTTV3AOM_css.mjs').then(m => m.default)}
  },
};
