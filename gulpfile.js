var gulp    = require("gulp");


var rename = require("gulp-rename")
    concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
    inject = require("gulp-inject-string");
    
var whatchado = 'default',
    to_inject = function()
    {
        var wrappers = [
                // 'define("marmottajax",function(){',
                'define("lib/marmottajax",function(){',
                ';return marmottajax;})'];

        if(whatchado=='requirejs')
            return wrappers

        return ['', ''];
    }

gulp.task("compile", function () {
	gulp.src([

			"source/main.js",
			"source/exporter.js",
			"source/contants.js",
			"source/**/*.js"

		])
		.pipe(concat("module.js"))
		.pipe(gulp.dest("bin/"));

	return gulp.src([

			"source/main.js",
			"source/contants.js",
			"source/**/*.js",
			"!source/exporter.js"

		])
		.pipe(concat("marmottajax.js"))
        .pipe(inject.wrap(to_inject()[0], to_inject()[1]))
		.pipe(gulp.dest("bin/"))

		.pipe(uglify())
		.pipe(rename("marmottajax.min.js"))
		.pipe(gulp.dest("bin/"));

});

gulp.task("default", ["compile"], function() {
    whatchado = 'default';
	gulp.watch("source/**/*.js", ["compile"]);

});

gulp.task("requirejs", function() {
    whatchado = 'requirejs';
	gulp.run("compile");
	gulp.watch("source/**/*.js", ["compile"]);

});