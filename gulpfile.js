var gulp          = require('gulp'),
    imagemmin     = require('gulp-imagemin'),
    clean         = require('gulp-clean'),
    concat        = require('gulp-concat'),
    htmlReplace   = require('gulp-html-replace'),
    uglify        = require('gulp-uglify'),
    cssmin        = require('gulp-cssmin'),
    browserSync   = require('browser-sync'),
    csslint       = require('gulp-csslint'),
    autoprefixer  = require('gulp-autoprefixer'),
    sourcemaps    = require('gulp-sourcemaps'),
    sass          = require('gulp-sass'),
    spritesmith   = require('gulp.spritesmith'),
    gutil         = require('gulp-util'),
    babel         = require('gulp-babel');


var autoprefixerOptions  = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
}

gulp.task('default', ['server'], function(){});

gulp.task('build', ['copy'], function(){});

gulp.task('copy', ['clean'], function(){
	return gulp.src(['src/**/*', '!src/sass/**/*'])
		.pipe(gulp.dest('build'));
});

gulp.task('clean', function(){
  return gulp.src('build')
        .pipe(clean());
});

gulp.task('sass', function(){
    return gulp.src('./src/sass/test-netshoes.min.+(scss|sass)')
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error',sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write(''))            
      .pipe(gulp.dest('./src/public/css/'))
      .pipe(browserSync.reload({
        stream: true
    }));
});


gulp.task('minify-js', function () {
  gulp.src('src/scripts/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
      presets: ['es2015']
  }))
  .pipe(concat('netshoes.min.js'))
  .pipe(uglify())
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('src/public/js/'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('server', ['sass'], function(){
 
  gulp.watch('src/scripts/**/*.js', ['minify-js']);

  gulp.watch('src/sass/**/*.+(scss|sass)', ['sass']);

  //gulp.watch(['src/images/icons/**/*'], ['sprite']);

});
