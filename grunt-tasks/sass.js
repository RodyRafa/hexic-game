module.exports = function(grunt) {
  'use strict';
  grunt.config('sass', {
    "dist": {
      "src": "assets/sass/main.sass",
      "dest": "dist/assets/css/main.min.css"
    }
  });

  grunt.registerTask('sass', function() {
    grunt.task.run(['sass']);
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
