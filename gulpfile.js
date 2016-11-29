var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var path = require('path');
var publicPath = path.resolve('./public/js');

gulp.task('webpack-dev', function() {
  return gulp.src('./src/main.js')
    .pipe(webpack({
      entry: './src/main.js',
      output: {
        path: publicPath,
        filename: 'bundle.js'
      },
      watch: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('webpack-prod', function() {
  return gulp.src('./src/main.js')
    .pipe(webpack({
      entry: './src/main.js',
      output: {
        path: publicPath,
        filename: 'bundle.js'
      },
      devtool: 'source-map',
      module: {
        loaders: [
          {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch', 'webpack-dev']);
gulp.task('prod', ['sass', 'webpack-prod']);