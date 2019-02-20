var gulp = require("gulp");
var styleguide = require("sc5-styleguide");
var sass = require("gulp-sass");
var outputPath = "docs";
var SCSS_Path = "htmlsource/assets/scss/*.scss";

gulp.task("styleguide:generate", function() {
	return gulp
		.src(SCSS_Path)
		.pipe(
			styleguide.generate({
				title: "My Styleguide",
				server: true,
				rootPath: outputPath,
				appRoot: "http://127.0.0.1:5500/docs",
				overviewPath: "README.md"
			})
		)
		.pipe(gulp.dest(outputPath));
});

gulp.task("styleguide:applystyles", function() {
	return gulp
		.src(SCSS_Path)
		.pipe(
			sass({
				errLogToConsole: true
			})
		)
		.pipe(styleguide.applyStyles())
		.pipe(gulp.dest(outputPath));
});

gulp.task("watch", ["styleguide"], function() {
	// Start watching changes and update styleguide whenever changes are detected
	// Styleguide automatically detects existing server instance
	gulp.watch(["*.scss"], ["styleguide"]);
});

gulp.task("styleguide", ["styleguide:generate", "styleguide:applystyles"]);
