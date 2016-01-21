module.exports = function () {
    var app = './app/';
    var temp = './app/.tmp/';

    var config = {
        /**
         * Files paths
         */
        build: './dist/',
        css: [
            app + 'styles/surveyViewer.css',
            app + 'styles/surveyBuilder.css',
            temp + '**/*.css'
        ],
        devBaseUrl: 'http://localhost',
        fonts: [],
        htmltemplates: [
            app + 'components/**/*.html',
            app + 'states/**/*.html'
        ],
        images: [],
        js: [
            './app/**/*.js',
            '!./app/vendor/**/*.js' +
            ''],
        index: app + 'index.html',
        scss: app + '**/*.scss',
        port: 3000,
        temp: temp,

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './app/vendor/',
            ignorePath: ''
        },

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                standAlone: false,
                root: './app/'
            }
        }
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};



