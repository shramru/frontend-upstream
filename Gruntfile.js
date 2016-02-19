module.exports = function (grunt) {

    grunt.initConfig({

        shell: {
            options: {
                stdout: true,
                stderr: true
            },

            dev: {
                command: 'node server'
            }
        },
        fest: {

            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    spawn: false,
                    atBegin: true
                },
            }
        },

        concurrent: {
            dev: ['shell', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },

        qunit: {
            all: ['./public_html/tests/index.html']
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');

    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);

};
