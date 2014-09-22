module.exports = function (grunt) {

    var src = ['src/core.js', 'src/version.js', 'src/**/*.js'];

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
        },

        watch: {
            script: {
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: ['build'],
                options: {
                    spawn: true,
                    livereload: true,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['build', 'doc']);
    grunt.registerTask('build', ['concat', 'uglify', 'jasmine']);
    grunt.registerTask('doc', ['concat', 'jsdoc']);

};