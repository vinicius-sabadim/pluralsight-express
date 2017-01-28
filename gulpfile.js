const gulp = require('gulp')
const jshint = require('gulp-jshint')
const jscs = require('gulp-jscs')
const wiredep = require('wiredep').stream
const inject = require('gulp-inject')
const nodemon = require('nodemon')

const jsFiles = ['*.js', 'src/**/*.js']

gulp.task('style', () => {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs())
})

gulp.task('inject', () => {
  const injectSrc = gulp.src(
    ['./public/css/*.css', './public/js/*.js'],
    { read: false }
  )
  const options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  }
  const injectOptions = {
    ignorePath: '/public'
  }

  return gulp.src('./src/views/*.jade')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'))
})

gulp.task('serve', ['style', 'inject'], () => {
  const options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 5000
    },
    watch: jsFiles
  }
  return nodemon(options)
    .on('restart', () => console.log('Restarting...'))
})
