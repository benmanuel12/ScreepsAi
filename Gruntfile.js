module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'benmanuel432@gmail.com',
                token: '0e686ceb-944f-430e-b53b-1a6f1a4082e3',
                branch: 'tutorial-1',
                //server: 'season'
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}