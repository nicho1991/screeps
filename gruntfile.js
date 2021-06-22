module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'ladefoged1991@gmail.com',
                token: '2d49a873-304a-46fc-a82d-6849e9bba804',
                branch: 'default',
                //server: 'season'
            },
            dist: {
                src: ['../main/*.js']
            }
        }
    });
}