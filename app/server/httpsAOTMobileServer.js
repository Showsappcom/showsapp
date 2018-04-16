var express = require( 'express' );
var https = require( 'https' );
var fs = require( 'fs' );
var app = express();
//this is where I need to
var path = '/Users/mackenzie/Documents/Projects/Jupiter_FE/MaterialBuild/target/aotMobile';

var options = {
  cert: fs.readFileSync( '/Users/mackenzie/Documents/Projects/Jupiter_FE/MaterialBuild/certificates/elms.pem' ),
  key: fs.readFileSync( '/Users/mackenzie/Documents/Projects/Jupiter_FE/MaterialBuild/certificates/local_key.pem' ),
  passphrase: 'changeit'
};


app.use( express.static( path ) );
app.get( '/*', function ( req, res ) {
  //console.log("req", req, res);
  res.sendfile( '/Users/mackenzie/Documents/Projects/Jupiter_FE/MaterialBuild/target/aotMobile/index.html' );
} )

var port = process.env.PORT || 5055;

https.createServer( options, app ).listen( port, function () {
  console.log( 'Express started on https://localhost:' +
    port + '; press Ctrl-C to terminate.' );
} );
