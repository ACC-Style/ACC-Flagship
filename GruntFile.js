module.exports = function(grunt) {
    //Project Config
    var vars = grunt.file.readJSON('./htmlsource/models/_global.json');
    grunt.initConfig({
        bower: {
            dev: {
                dest: 'htmlsource/assets/',
                js_dest: 'htmlsource/assets/js',
                css_dest: 'htmlsource/assets/css',
                options: {
                    ignorePackages: ['foundation-sites']
                }
            }
        },
        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 8000,
                    open: {
                        target: 'http://localhost:8000',
                    },
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: './htmlsource/assets/scss',
                    src: ['*.scss', 'browserFIX/*.scss'],
                    dest: './htmlsource/assets/css',
                    ext: '.css'
                }]
            }
        },
        copy: {
            STYLES: {
                files: [{
                    expand: true,
                    cwd: 'htmlsource/assets/css',
                    src: ['**','!desktop.ini'],
                    dest: 'www/assets/css'
                }]
            },
            STYLEGUIDE: {
                files: [{
                    expand: true,
                    cwd: 'htmlsource/assets/css',
                    src: ['**','!desktop.ini'],
                    dest: 'htmlsource/styleguide/assets/css'
                },{
                    expand: true,
                    cwd: 'htmlsource/assets/js',
                    src: ['**','!desktop.ini'],
                    dest: 'htmlsource/styleguide/assets/js'
                },{
                    expand: true,
                    cwd: 'htmlsource/assets/images',
                   src: ['**','!desktop.ini', '!TempContent/desktop.ini'],
                    dest: 'htmlsource/styleguide/assets/images'
                },
                {
                    expand: true,
                    cwd: 'htmlsource/assets/fonts',
                    src: ['**','!desktop.ini'],
                    dest: 'htmlsource/styleguide/assets/fonts'
                },
                {
                    expand: true,
                    cwd: 'bower_components/styledown-skins/dist/Default/',
                    src: 'styleguide.min.css',
                    dest: 'htmlsource/styleguide/assets/css'
                },{
                    expand: true,
                    cwd: 'bower_components/styledown-skins/dist/Default/',
                    src: 'styleguide.min.js',
                    dest: 'htmlsource/styleguide/assets/js'
                }]
            },
        },
        liquid: {
            options: {
                includes: 'htmlsource/templates/includes',
                global: vars,
            },
            pages: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'htmlsource/templates/*.liquid',
                    dest: 'www/',
                    ext: '.html'
                }]
            }
        },
    compass: {
        dist:{
            options: {
            config: 'htmlsource/compass/config.rb'
            }
        }
      },
    styledown: {
        default: {
            files: {
              'htmlsource/styleguide/index.html': ['htmlsource/assets/css/base.css']
            },
            options: {
                  title: 'ACC Flagship',
                  css: [ 
                        'http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,700,600,400,300|Roboto+Slab:400,700|Raleway:300',
                       // 'assets/css/screen.css',
                        'assets/css/base.css',
                       // 'assets/css/responsive.css',
                       // 'assets/css/qii-search.css',
                        'assets/css/styleguide-shame.css',
                        ],
                  sg_css: 'assets/css/styleguide.min.css',
                  sg_js: [
                    '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
                    'assets/js/styleguide.min.js'
                  ],
                  body:
                    '<div class=sg-menu>' +
                      '<div class=sg-title>Your Style Guide Title</div>' +
                       '<nav class=sg-toc></nav>' +
                     '</div>' +
                     '<div class=sg-content>' +
                       '<div sg-content></div>' +
                       '<div class=sg-copyright>&copy; Your Copyright</div>' +
                     '</div>'
                }
            }
        },
    watch: {
        options: {
            livereload: true,
        },
        scss:{
            files:['htmlsource/assets/scss/**'],
             tasks: ['compass:dist','styledown','copy:STYLEGUIDE'],
        },
        data: {
            files: ['htmlsource/templates/**'],
            tasks: ['liquid'],
        }
    }
    });
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-liquid');
    grunt.loadNpmTasks('grunt-styledown');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass-convert');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-auto-install');
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Default task.
    grunt.registerTask('build', [ 'liquid', ]);
    grunt.registerTask('serve', ['compass:dist','styledown','copy:STYLEGUIDE','connect', 'watch', ]);
    
}