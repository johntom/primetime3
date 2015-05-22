module.exports = function (grunt) {
	grunt.registerTask('default', ['compileAssets', 'linkAssets',  'watch']);
	// jrt change on 5-21-2015
	//grunt.registerTask('default', ['compileAssets', 'linkAssets']);
};
