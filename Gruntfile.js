module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'benmanuel432@gmail.com',
                token: 'REDACTED',
                branch: 'tutorial-1',
                //server: 'season'
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}