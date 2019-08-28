import { join, relative, dirname } from 'path';
import assert from 'assert';

const layouts = ['default', 'admin'];

export function getNameFromPkg(pkg) {
  if (!pkg.name) {
    return null;
  }
  return pkg.name.split('/').pop();
}

export default function (api, options = {}) {
  const { paths, debug } = api;

  // 带布局时的路由
  // routes: [
  //   {
  //     "path": "/",
  //     "component": "./src/layouts/index.js",
  //     "routes": [
  //       {
  //         "path": "/user",
  //         "exact": true,
  //         "component": "./src/pages/user.js"
  //       },
  //       {
  //         "path": "/welcome",
  //         "exact": true,
  //         "component": "./src/pages/welcome.js"
  //       },
  //       {
  //         "component": "() => React.createElement(require('C:/Git/bering/web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, 
  //        { pagesPath: 'src/pages', hasRoutesInConfig: false })"
  //       }
  //     ]
  //   },
  //   {
  //     "component": "() => React.createElement(require('C:/Git/bering/web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })"
  //   }
  // ]

  // 不带布局
  // routes: [
  //   {
  //     "path": "/user",
  //     "exact": true,
  //     "component": "./src/pages/user.js"
  //   },
  //   {
  //     "path": "/welcome",
  //     "exact": true,
  //     "component": "./src/pages/welcome.js"
  //   },
  //   {
  //     "component": "() => React.createElement(require('C:/Git/bering/web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })"
  //   }
  // ]

  api.modifyRoutes(routes => {
    const layoutConfig = process.env.BLOCK_PAGES_LAYOUT || options.layout;
    debug("options: " + JSON.stringify(options, null, 2));

    if (layoutConfig) {
      assert(
        layouts.includes(layoutConfig),
        `layout must be one of ${layouts.join(',')}`
      );
      const layout = join(__dirname, `./layouts/${layoutConfig}`);
      const pathToLayout = relative(paths.absPagesPath, layout);
      debug("paths: " +JSON.stringify(paths, null, 2)); 
      debug("layout: " + JSON.stringify(layout, null, 2));
      debug("pathToLayout: " + JSON.stringify(pathToLayout, null, 2));
      debug("原始routes: " + JSON.stringify(routes, null, 2));

      const  layoutRoutes = [
        {
          path: '/',
          component: layout,
          routes: routes
        }
      ];

      debug("修改后routes: " + JSON.stringify(layoutRoutes, null, 2));

      return layoutRoutes;
    }

    return routes;
  });


  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set('@', join(paths.absSrcPath, '@'));
  });
}
