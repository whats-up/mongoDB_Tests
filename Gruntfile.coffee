module.exports = (grunt)->
  pkg= grunt.file.readJSON 'package.json'
  grunt.initConfig
    watch:
      test:
        files: ['coffee/**/*.coffee','test/**/*.coffee','ex/**/*.coffee']
        tasks: 'coffee'
      mocha:
        files: ['test/**/*.js']
        tasks: 'espower'
      power_assert:
        files: ['espowered/**/*.js']
        tasks: 'simplemocha'
    coffee:
      compile:
        options:
          bare: true
        files: [{
          expand: true
          cwd: 'coffee/'
          src: ['**/*.coffee']
          dest: 'js/'
          ext: '.js'
        },{
          expand: true
          cwd: 'test/'
          src: ['**/*.coffee']
          dest: 'test/'
          ext: '.js'
        },{
          expand: true
          cwd: 'ex/'
          src: ['**/*.coffee']
          dest: 'ex/'
          ext: '.js'
        }
        ]
    simplemocha:
      all:
        src: ['espowered/**/*.js']
      options:
        reporter: 'spec'
        ui: 'bdd'
    espower:
      test:
        options :
          powerAssertVariableName: 'assert',
          targetMethods:
            oneArg: [
                'ok',
                'ng'
            ],
            twoArgs: [
                'equal',
                'notEqual',
                'strictEqual',
                'notStrictEqual',
                'deepEqual',
                'notDeepEqual',
                'projectSpecificEqual',
                'notProjectSpecificEqual'
              ]
        files: [{
           expand: true,
           cwd: 'test/',
           src: ['**/*.js'],
           dest: 'espowered/',
           ext: '.js'
        }]

  for taskName of pkg.devDependencies
    if (taskName.substr(0, 6) == 'grunt-')
      grunt.loadNpmTasks(taskName)
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-simple-mocha'
  grunt.registerTask 'default', ['watch']
  return
