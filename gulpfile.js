var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('connect', function () {
    return $.connect.server({
        root: ['./app'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    return gulp.src('./app/index.html')
        .pipe($.open({
            uri: config.devBaseUrl + ':' + config.port + '/'
        }));
});

gulp.task('lint', function () {
    log('Analyzing source with JSHint');

    return gulp.src(config.js)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function () {
    log('Compiling Sass --> CSS');

    return gulp.src('./app/styles/scss/builderapp.scss')
        .pipe($.plumber())
        .pipe($.cssGlobbing({
            extensions: ['.scss']
        }))
        .pipe($.sass())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', '> 5%']
        }))
        .pipe(gulp.dest(config.temp));
});

gulp.task('fonts', ['clean-fonts'], function () {
    log('Copying fonts');

    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function () {
    log('Copying and compressing the images');

    return gulp.src(config.images)
        .pipe($.imagemin({
            optimizationLevel: 4
        }))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean', function () {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig);
});

gulp.task('clean-fonts', function () {
    clean(config.build + 'fonts/**/*.*');
});

gulp.task('clean-images', function () {
    clean(config.build + 'images/**/*.*');
});

gulp.task('clean-styles', function () {
    clean(config.temp + '**/*.css');
});

gulp.task('clean-code', function () {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    clean(files);
});

gulp.task('templatecache', function () {
    log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({
            empty: true
        }))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('wiredep', function () {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js), {relative: true}))
        .pipe(gulp.dest('./app/'));
});

gulp.task('inject', ['wiredep', 'styles'], function () {
    log('Wire up the app css into the html and call wiredep');

    return gulp.src(config.index)
        .pipe($.inject(gulp.src(config.css), {relative: true}))
        .pipe(gulp.dest('./app/'));
});

gulp.task('optimize', ['templatecache', 'inject'], function () {
    log('Optimizing the javascript, css, html');

    var assets = $.useref({searchPath: './app'});
    var cssFilter = $.filter('**/*.css', {restore: true});
    var jsLibFilter = $.filter('**/' + config.optimized.lib, {restore: true});
    var jsAppFilter = $.filter('**/' + config.optimized.app, {restore: true});

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(
            gulp.src('.tmp/templates.js', {read: false}), {
                starttag: '<!-- inject:templates:js -->'
            }))
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(jsLibFilter)
        //.pipe($.uglify())
        .pipe(jsLibFilter.restore)
        .pipe(jsAppFilter)
        .pipe($.uglify())
        .pipe(jsAppFilter.restore)
        .pipe($.useref())
        .pipe(gulp.dest(config.build));
});

gulp.task('watch', function () {
    $.watch(config.js, function () {
        gulp.start('lint')
    });
    $.watch(config.js, function () {
        gulp.start('inject')
    });
    $.watch(config.scss, function () {
        gulp.start('styles')
    });
});

gulp.task('default', ['inject', 'lint', 'styles', 'open', 'watch']);

/////////////////////////////////////////

function clean(path) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
