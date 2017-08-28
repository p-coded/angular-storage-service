module.exports = function (grunt) {
// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["dist", '.tmp'],
        useminPrepare: {
            html: 'public_html/index.html'
        },
        usemin: {
            html: ['dist/index.html']
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },
        revPackage: {
            main: 'dist/js/*.*'
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
//    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-rev-package');
    
    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('pack-project', [
        'useminPrepare', 
        'concat', 
        'usemin', 
        'uglify', 
        'cssmin', 
        'string-replace', 
        'revPackage'
    ]);
};
