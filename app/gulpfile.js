var gulp = require( 'gulp' );
var replace = require( "gulp-replace" );
var rename = require( "gulp-rename" );
var vulcanize = require( "gulp-vulcanize" );

gulp.task( 'default', [ 'update_build_number' ], function () {

  return true;

} );


gulp.task( 'update_build_number', function () {

  var VERS = '';
  for ( var i = 0, iLen = process.argv.length; i < iLen; i++ ) {

    if ( process.argv[ i ] === '--ver' && process.argv[ i + 1 ] ) {

      VERS += 'versionInfo: ' + '\'' + process.argv[ i + 1 ] + '\'';
      gulp.src( [ './src/configurations/app.configuration.ts' ], { base: './' } ) // Any file globs are supported
        .pipe( replace( new RegExp( 'versionInfo: \?(.*)' ), VERS ) )
        .pipe( gulp.dest( './' ) )
    }

  }
} );



