// Karma configuration
// Generated on Wed Jun 29 2016 13:42:08 GMT+0200 (CEST)

(function () {
'use strict';

module.exports = function(config) {

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-bootstrap/ui-bootstrap.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/ng-resource/lib/angular-resource.js',

      'chargeback_dashboard/static/**/*.html',
      'chargeback_dashboard/static/dashboard/chargeback/chargeback.module.js',
      'chargeback_dashboard/static/**/*.service.js',
      'chargeback_dashboard/static/**/*.directive.js',
      'chargeback_dashboard/static/**/*.module.js',
      'chargeback_dashboard/static/**/*.controller.js',
      'chargeback_dashboard/static/**/*.js',
      'chargeback_dashboard/static/**/*spec.js',
      'chargeback_dashboard/static/**/*.directive.html'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // preprocessors: {
    //   // Used to collect templates for preprocessing.
    //   // NOTE: the templates must also be listed in the files section below.
    // },
    preprocessors: {
      'chargeback_dashboard/static/dashboard/widgets/*.html': 'ng-html2js'
    },
    ngHtml2JsPreprocessor: {
      stripPrefix : "chargeback_dashboard",
      moduleName: 'templates'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [/*'Firefox', 'Chrome', */'PhantomJS'],

    plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
        ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};

}());
