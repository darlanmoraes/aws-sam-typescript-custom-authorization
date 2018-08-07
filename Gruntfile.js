module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-compress');

  const modules = {
    src: [
      'node_modules/bluebird/**',
      'node_modules/http-status-codes/**'
    ]
  };

  const shareds = {
    cwd: './.typescript/',
    src: [
      'shared/**.js',
      'shared/**/**.js'
    ],
    expand: true,
    dest: '/src'
  };

  function compress(lambda) {
    return {
      options: {
        archive: `./.compress/lambda-${lambda}.zip`
      },
      files: [
        { ...modules },
        { ...shareds },  
        {
          cwd: './.typescript/',
          src: [
            `lambdas/${lambda}/**.js`,
            `lambdas/${lambda}/**/**.js`
          ],
          expand: true,
          dest: '/src'
        }
      ]
    };
  }

  grunt.initConfig({
    compress: {
      authorizer: compress('authorizer'),
      comments: compress('comments'),
      posts: compress('posts')
    }
  });

  const lambda = grunt.option('lambda');
  if (lambda) {
    grunt.registerTask('package', [`compress:${lambda}`]);
  } else {
    grunt.registerTask('package', ['compress']);
  }

};