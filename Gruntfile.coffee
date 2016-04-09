path = require("path")
module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    express:
      dev:
        options:
          script: "src/app.js"
      production:
        options:
          script: "build/app.min.js"
    watch:
      express:
        files: ['**/*.js'],
        tasks: ['express:dev']
        options:
          spawn: false
    mkdir:
      mongodb:
        options:
          mode: 777
          create: ['tmp/mongo-data']
    bgShell:
      local_mongodb:
        cmd: "mongod --dbpath=" + __dirname + "/tmp/mongo-data"
        bg: true
    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      build:
        src: 'src/*.js',
        dest: 'build/app.min.js'

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-express-server'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-mkdir'
  grunt.loadNpmTasks 'grunt-bg-shell'
  
  grunt.registerTask 'default', [
    'mkdir:mongodb', 'bgShell:local_mongodb'
    'express:dev', 'watch'
  ]
  grunt.registerTask 'production', ['uglify', 'express:production']

