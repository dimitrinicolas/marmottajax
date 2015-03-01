var gulp = require("gulp");

var rename = require("gulp-rename");

var concat = require("gulp-concat"),
	uglify = require("gulp-uglify");

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
		.pipe(gulp.dest("bin/"))

		.pipe(uglify())
		.pipe(rename("marmottajax.min.js"))
		.pipe(gulp.dest("bin/"));

});

gulp.task("default", ["compile"], function() {

	gulp.watch("source/**/*.js", ["compile"]);

});