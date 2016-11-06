/* global module:false */
module.exports = function (grunt) {
  const srcFilesPattern = 'src/js/*';
  const testFilesPattern = 'src/test/*';

  /**
   *
   * @param {string} nodeModuleDir
   * @param {string} fileName
   * @param {String[]} destinations
   *
   * @return {Object[]}
   */
  const getVendorFileConfig = function (nodeModuleDir, fileName, destinations) {
    const valuesToReturn = [];

    destinations.forEach((destination) => {
      valuesToReturn.push({
        cwd: 'node_modules/'.concat(nodeModuleDir),
        src: [fileName],
        dest: destination,
      });
    });

    return valuesToReturn;
  }


  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' %> */\n',

    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/<%= pkg.name %>.js',
      },
    },
    eslint: {
      options: {
        format: 'stylish',
      },
      target: ['src/js/*'],
    },
    sync: {
      main: {
        files: [
          getVendorFileConfig('jquery/dist', 'jquery.js', ['src/scripts', 'dist/scripts']),
          getVendorFileConfig('moment', 'moment.js', ['src/scripts', 'dist/scripts']),
          getVendorFileConfig('fullcalendar/dist', 'fullcalendar.js', ['src/scripts', 'dist/scripts']),
          getVendorFileConfig('fullcalendar/dist', 'fullcalendar.css', ['src/css', 'dist/css']),
        ],

        // Display log messages when copying files
        verbose: true,

        failOnError: true,
      },
    },

    // qunit: {
    //   files: ['src/test/**/*.html'],
    // },
    watch: {
      gruntfile: {
        files: srcFilesPattern,
        tasks: ['eslint:gruntfile'],
      },
      lib_test: {
        files: testFilesPattern,
        tasks: ['eslint:lib_test', 'qunit'],
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-sync');

  // Default task.
  grunt.registerTask('default', ['sync', 'concat', 'eslint', // 'qunit',
  ]);
};
