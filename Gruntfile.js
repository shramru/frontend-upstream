module.exports = function (grunt) {

    grunt.initConfig({

        shell: {
            dev: {
                command: 'node server.js'
            }
            // запуск сервера через скрипт shell'a https://www.npmjs.com/package/grunt-shell
        },

        watch: {
            // запуск watcher'a, который следит за изенениями файлов  templates/*.xml
            // и если они изменяются, то запускает таск сборки шаблонов (grunt fest)
            files: ['templates/*.xml'],
            tasks: ['fest']
        },
        
        concurrent: {
            // одновременный запуска shell'a и watcher'a https://www.npmjs.com/package/grunt-concurrent
            target: {
                tasks: ['shell:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
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
<<<<<<< HEAD
=======
        },
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    livereload: true
                }
            }
        },
        concurrent: {
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true
            }
        },
        qunit: {
            all: ['./public_html/tests/index.html']
>>>>>>> upstream/v2
        }

    });

    // подключть все необходимые модули
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');

<<<<<<< HEAD
    // результат команды grunt
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default', ['concurrent:target']);
=======
    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);

>>>>>>> upstream/v2
};
