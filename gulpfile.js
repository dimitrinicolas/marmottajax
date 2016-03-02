var gulp    = require("gulp");


var rename = require("gulp-rename")
    concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
    inject = require("gulp-inject-string");
    
var whatchado = 'default',
    to_inject = function()
    {
        var module_name = (process.argv[3] && process.argv[3].slice(2)) || 'lib/marmottajax',
            wrappers = [
                'define("'+module_name+'", function() {',
                ';return marmottajax; })'];

        if(whatchado=='requirejs')
            return wrappers

        return [';var marmottajax = (function(){', ';return marmottajax; })();'];
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