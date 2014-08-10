module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/shell.js', 'src/**/*.js'],
                dest: 'dist/built.js'
            }

        },
        uglify: {
            build: {
                src: 'dist/shell.js',
                dest: 'dist/shell.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat']);

};