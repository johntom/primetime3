/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
    'styles/**/*.css'
];

var fontFilesToInject = [
    'bower_components/fontawesome/fonts/*',
     // 'bower_components/fontawesome/fonts/*',
    'bower_components/bootstrap/fonts/*'
];

// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
// the order seems to matter for building production code
var jsFilesToInject = [
    'bower_components/jquery/dist/jquery.js', // add
    'bower_components/angular/angular.js',
    'bower_components/restangular/dist/restangular.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-ui-utils/modules/route/route.js',
    'bower_components/socket.io-client/dist/socket.io.min.js',
    'bower_components/sails.io.js/dist/sails.io.js',
    'bower_components/angular-sails/dist/angular-sails.js',
    'bower_components/lodash/dist/lodash.js',
    'bower_components/moment/moment.js',
    'bower_components/angular-moment/angular-moment.js',
    'bower_components/angular-translate/angular-translate.js',
    'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
    'bower_components/ng-table/ng-table.js',

    'bower_components/bootstrap/dist/js/bootstrap.min.js',

    'bower_components/angular-file-upload/angular-file-upload.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-xeditable/dist/js/xeditable.js',
    'bower_components/angular-input-modified/dist/angular-input-modified.js',
    'bower_components/marked/lib/marked.js',     //I think this deisplay html the best
    'bower_components/angular-marked/angular-marked.js',

    'bower_components/ngmap/build/scripts/googlemaps.js',
    // 5-22-15 'bower_components/ngmap/build/scripts/ng-map.js',
    'bower_components/ngmap/build/scripts/ng-map.min.js',

    'bower_components/angular-youtube-mb/dist/angular-youtube-embed.min.js',
    // kendo
    'bower_components/Kendo/src/src/kendo.all.js',
    'bower_components/Kendo/src/src/jszip.js',
    'bower_components/Kendo/src/src/kendo.timezones.js',
    // kendo
    'bower_components/angular-route/angular-route.js', //?
    'bower_components/angular-animate/angular-animate.js',  // latest needed
    'bower_components/angular-touch/angular-touch.js',
    'bower_components/ngFader/ngFader.js',
    'bower_components/angular-formstamp/formstamp.js', // leave this last
    // the above goes to production

    //
    // *->    you might put other dependencies like jQuery or Angular here   <-*
    //
    // All of the rest of your app scripts
    'src/**/*.js'
];
// 'bower_components/angular-carousel/dist/angular-carousel.js',
// 'bower_components/angular-carousel/src/directives/shifty.js',
// 'bower_components/shifty/dist/shifty.js',
//// 'bower_components/angular-resource/angular-resource.js',
//// 'bower_components/angular-route/angular-route.js',
//// 'bower_components/videogular/videogular.js',

var imagesFilesToInject = [
    'images/**/*'

];

module.exports.jsFilesToInjectNoPathChange = jsFilesToInject;

// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.

//modified by jrt tasks/config/copy.js

var templateFilesToInject = [
    // 'templates/**/*.html'
    'src/**/*.tpl.html'
];


// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function (path) {
    return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function (path) {
    return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function (path) {
    return 'assets/' + path;
});

module.exports.imagesFilesToInject = imagesFilesToInject.map(function (path) {
    return path;
});

module.exports.fontFilesToInject = fontFilesToInject.map(function (path) {
    console.log('fonts ',path)
    return path;
});

// assets/bower_components/bootstrap/fonts
// fontawesome/fonts