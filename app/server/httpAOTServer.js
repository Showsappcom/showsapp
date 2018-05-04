var express = require( 'express' );
// var https = require( 'https' );
var http = require( 'http' );
var fs = require( 'fs' );
var app = express();
//this is where I need to
var path = '/Users/mackenzie/Documents/Projects/Personal/showsAppGitHub/app/target/aot';




app.use( express.static( path ) );
app.get( '/*', function ( req, res ) {
  //console.log("req", req, res);
  res.sendfile( '/Users/mackenzie/Documents/Projects/Personal/showsAppGitHub/app/target/aot/index.html' );
} );

var port = process.env.PORT || 5052;

http.createServer( app ).listen( port, function () {
  console.log( 'Express started on https://localhost:' +
    port + '; press Ctrl-C to terminate.' );
} );
