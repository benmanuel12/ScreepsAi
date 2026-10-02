module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'benmanuel432@gmail.com',
                token: process.env.SCREEPS_TOKEN,
                branch: 'default',
                //server: 'season'
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}