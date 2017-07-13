import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  FONTS_DEST = `${this.APP_DEST}/fonts`;

  FONTS_SRC = [
    'node_modules/font-awesome/fonts/**',
    'node_modules/simple-line-icons/fonts/**'
  ];

  constructor() {
    super();

    this.APP_TITLE = 'BW Staff Assessment System';

    this.ENABLE_SCSS = true;

    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'font-awesome/css/font-awesome.min.css', inject: true },
      { src: 'simple-line-icons/css/simple-line-icons.css', inject: true },
      { src: 'animate.css/animate.css', inject: true },
      { src: 'ng2-toastr/bundles/ng2-toastr.min.css', inject: true },
      { src: 'ng2-dnd/style.css', inject: true },
      { src: 'jquery/dist/jquery.min.js', inject: 'libs' },
      { src: 'pace-progress/pace.min.js', inject: 'libs' },
      { src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs' },
      { src: `air-datepicker/dist/css/datepicker.min.css`, inject: true },
      { src: `air-datepicker/dist/js/datepicker.min.js`, inject: 'libs' },
      { src: `air-datepicker/dist/js/i18n/datepicker.en.js`, inject: 'libs' },
      { src: 'select2/dist/js/select2.full.min.js', inject: 'libs' },
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // For @ngx-translate package
    this.SYSTEM_BUILDER_CONFIG.packageConfigPaths.push(join('node_modules', '@ngx-translate', '*', 'package.json'));

    let additionalPackages: ExtendPackages[] = [{
      name: '@ngx-translate/core',
      path: 'node_modules/@ngx-translate/core/bundles/core.umd.js'
    }, {
      name: '@ngx-translate/http-loader',
      path: 'node_modules/@ngx-translate/http-loader/bundles/http-loader.umd.js'
    }, {
      name: 'ngx-bootstrap',
      path: 'node_modules/ngx-bootstrap/bundles/ngx-bootstrap.umd.min.js'
    }, {
      name: 'ng2-ckeditor',
      path: 'node_modules/ng2-ckeditor',
      packageMeta: {
        main: 'lib/index.js',
        defaultExtension: 'js'
      }
    }, {
      name: 'moment',
      path: 'node_modules/moment',
      packageMeta: {
        main: 'moment.js',
        defaultExtension: 'js'
      },
    }, {
      name: 'moment-timezone',
      path: 'node_modules/moment-timezone',
      packageMeta: {
        main: 'builds/moment-timezone-with-data.js',
        defaultExtension: 'js'
      }
    }, {
      name: 'ng2-dnd',
      path: 'node_modules/ng2-dnd/bundles/index.umd.js'
    }];

    this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')({ ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
