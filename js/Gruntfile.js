/**
 * @file Gruntfile for the minification of JavaScript and compilation of Bootstrap
 * @author griffinj@lafayette
 *
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    uglify: {
		options: {
		    banner: '/**\n' + ' * @file <%= pkg.name %> Module by the Lafayette College Libraries last built on <%= grunt.template.today("yyyy-mm-dd") %>\n' + ' * @see {@link https://github.com/LafayetteCollegeLibraries Lafayette College Libraries}\n' + ' */\n'
		},
		dynamic_mappings: {
		    files: [
{
    expand: true,
    cwd: 'src/',
    src: ['**/*.js'],
    dest: 'build/',
    ext: '.min.js',
    extDot: 'first'
},
			    ],
		},
	    },
	    jshint: {
		options: {
		    smarttabs: true,
		    jquery: true
		},
		all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
	    }
	});

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['jshint']);
};
