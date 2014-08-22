module.exports = function (grunt) {

    var src = ['src/shell.js', 'src/shell.include.js', 'src/**/*.js'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: src,
                dest: 'dist/shell.js'
            }

        },
        uglify: {
            build: {
                src: 'dist/shell.js',
                dest: 'dist/shell.min.js'
            }
        },
        jshint: {
        	all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },
        jasmine: {
            pivotal: {
                src: 'dist/shell.js',
                options: {
                    specs: 'test/**/*.spec.js'
                }
            }
        },
        jsdoc: {
            dist: {
                src: src,
                options: {
                    destination: 'dist/doc'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['concat', 'uglify', 'jasmine', 'doc']);
    grunt.registerTask('build', ['concat', 'uglify', 'jasmine']);
    grunt.registerTask('doc', ['concat', 'jsdoc']);

};