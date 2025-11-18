
export default {
  basePath: '/myFlix-Angular-Client',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
