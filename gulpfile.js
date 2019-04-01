/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    nodemon = require('gulp-nodemon'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    bundler = webpack(webpackConfig),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject('./tsconfig.json'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('less', lessFn);
gulp.task('nodemon', nodemonFn);
gulp.task('typescript', typescriptFn);
gulp.task('browserSync', browserSyncFn);


// less to CSS and Inject via BrowserSync
function lessFn(done) {
    gulp
        .src('./app/frontend/css/**/*.less')
        .pipe(less({ outputStyle: 'compressed' }))
        .on('error', swallowError)
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })
        )
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/public/css/'))
        .pipe(browserSync.stream());
    done();
};

function nodemonFn(done) {
    var started = false;
    nodemon({
        script: 'dist/server/index.js',
        nodeArgs: ['--inspect', '--nolazy'], //nolazy makes nodejs load all js files even if the haven't been accessed yet.
        ignore: ['app/frontend/', 'gulpfile.js', 'webpack.config.js', 'dist/public/']
    })
        .on('start', function () {
            if (!started) {
                done();
                started = true;
            }
        })
        .once('quit', function () {
            process.exit();
        });
    done();
}

function typescriptFn(done) {
    gulp.src("app/backend/**/*.ts") // or tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('.')) 
        .pipe(gulp.dest('dist/server'));
    done();
}

function browserSyncFn(done){
    browserSync.init({
        proxy: {
            target: 'localhost:3000',
            ws: true
        },
        port: 80,
        notify: true,
        ghostMode: false,
        middleware: [
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                stats: { colors: true }
            }),
            webpackHotMiddleware(bundler)
        ]
    });
    done();
}

// Main Entry
gulp.task('default', gulp.series(gulp.parallel('typescript', 'less'), 'nodemon', function (done) {
    gulp.watch('app/frontend/css/**/*.less', gulp.series('less'));
    gulp.watch('app/backend/index.ts', gulp.series('typescript'));
    gulp.watch('app/backend/views/**/*.pug').on('change', browserSync.reload);
    done();
}));

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}