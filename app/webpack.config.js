const path = require( 'path' );

const autoprefixer = require( 'autoprefixer' );
const CaseSensitivePathsPlugin = require( 'case-sensitive-paths-webpack-plugin' );
const CommonsChunkPlugin = require( 'webpack/lib/optimize/CommonsChunkPlugin' );
const ContextReplacementPlugin = require( 'webpack/lib/ContextReplacementPlugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const DefinePlugin = require( 'webpack/lib/DefinePlugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const LoaderOptionsPlugin = require( 'webpack/lib/LoaderOptionsPlugin' );
const ProgressPlugin = require( 'webpack/lib/ProgressPlugin' );
// const AggressiveSplittingPlugin = require( 'webpack/lib/optimize/AggressiveSplittingPlugin' );
const UglifyJsPlugin = require( 'webpack/lib/optimize/UglifyJsPlugin' );
const WebpackMd5Hash = require( 'webpack-md5-hash' );
const ngToolsWebpack = require( '@ngtools/webpack' );
const fs = require( 'fs' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const workboxPlugin = require( 'workbox-webpack-plugin' );
const AngularCompilerPlugin = ngToolsWebpack.AngularCompilerPlugin


//=========================================================
//  VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_PRODUCTION_DESK_AOT = NODE_ENV === 'aot_production';
const ENV_PRODUCTION_DESK_AOT_VIS = NODE_ENV === 'aot_production_vis';
const ENV_DESKTOP_AOT_CORDOVA = NODE_ENV === 'aot_cordova';
const ENV_TEST = NODE_ENV === 'test';

const HOST = '0.0.0.0';
const PORT = 5550;

const IS_DEV = process.env.DEV;

const DIST_DIR = 'target';

//=========================================================
//  LOADERS
//---------------------------------------------------------
const rules = {
  componentStyles: {
    test: /\.scss$/,
    loader: 'raw-loader!postcss-loader!sass-loader',
    exclude: path.resolve( 'src/shared/styles' )
  },
  css: {
    test: /\.css$/,
    loaders: [ 'to-string-loader', 'css-loader' ]
  },
  sharedStyles: {
    test: /\.scss$/,
    loader: 'style-loader!css-loader!postcss-loader!sass-loader',
    include: path.resolve( 'src/shared/styles' )
  },
  sharedStylesExtracted: {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract( 'css-loader?-autoprefixer!postcss-loader!sass-loader' ),
    include: path.resolve( 'src/shared/styles' )
  },
  html: {
    test: /\.html$/,
    loader: 'raw-loader'
  },
  json: {
    test: /\.json$/,
    loader: 'json-loader',
    exclude: /bower_components/
  },
  typescriptaot: {
    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
    loader: '@ngtools/webpack',
    exclude: [ 'node_modules' ]
  },
  mapBoxLoader: {
    test: /node_modules.+js$/,
    loader: 'ify-loader'
  },
  typescript: {
    test: /\.ts$/,
    loaders: [ 'ts-loader', 'angular2-template-loader', 'angular2-router-loader' ],
    exclude: [ 'node_modules' ]
  },
  polymer: {
    test: /\.html$/, // handles html files. <link rel="import" href="path.html"> and import 'path.html';
    loader: 'wc-loader'
  },
  fontLoader: {
    test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },
  imageLoader: {
    test: /\.(svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader'
  }
};


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = module.exports = {};

config.resolve = {
  extensions: [ '.ts', '.js' ],
  modules: [
    path.resolve( '.' ),
    'node_modules'
  ]
};

config.module = {
  rules: [
    rules.html,
    rules.json,
    rules.componentStyles,
    rules.fontLoader,
    rules.imageLoader
  ]
};

config.plugins = [
  new CaseSensitivePathsPlugin(),
  new DefinePlugin( {
    'process.env.NODE_ENV': JSON.stringify( NODE_ENV ),
    'process.env.DEV': JSON.stringify( IS_DEV )

  } ),
  new LoaderOptionsPlugin( {
    debug: false,
    minimize: ENV_PRODUCTION || ENV_PRODUCTION_DESK_AOT,
    options: {
      resolve: {
        sassLoader: {
          outputStyle: 'compressed',
          precision: 10,
          sourceComments: false
        },
        postcss: [
          autoprefixer( { browsers: [ 'last 3 versions' ] } )
        ]
      }
    }
  } )
];


//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if ( ENV_DEVELOPMENT || ENV_PRODUCTION ) {


  if ( ENV_DEVELOPMENT ) {

    config.module.rules.push( rules.mapBoxLoader );

  }

  config.entry = {
    main: './src/main.ts',
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts'
  };

  config.module.rules.push( rules.typescript );
  config.output = {
    path: path.resolve( './target/desktop' ),
    publicPath: '/'
  };

  config.plugins.push(
    new CommonsChunkPlugin( {
      name: [ 'vendor', 'polyfills' ],
      minChunks: Infinity
    } ),
    new CopyWebpackPlugin( [
      { from: './src/shared/assets', to: 'assets' },
      { from: './src/shared/styles/fonts', to: 'fonts' }
    ] ),
    new HtmlWebpackPlugin( {
      chunkSortMode: 'dependency',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    } ),
    new BundleAnalyzerPlugin( {
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'server',
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: 'report.html',
      // Module sizes to show in report by default.
      // Should be one of `stat`, `parsed` or `gzip`.
      // See "Definitions" section for more information.
      defaultSizes: 'parsed',
      // Automatically open report in default browser
      openAnalyzer: true,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: false,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: 'silent'
    } ) );
}

else if ( ENV_DESKTOP_AOT_CORDOVA ) {
  config.entry = {
    main: './src/main.aot.ts',
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts'
  };
  // config.module.rules.push(rules.typescriptaot);


  // config.module.rules.push( rules.typescriptaot );

  config.output = {
    path: path.resolve( '/Users/mackenzie/Documents/Projects/Cordova/lxi/www' ),
    publicPath: ''
  };

  config.plugins.push(
    new CommonsChunkPlugin( {
      name: [ 'vendor', 'polyfills' ],
      minChunks: Infinity
    } ),

    new CopyWebpackPlugin( [
      { from: './src/shared/assets', to: 'assets' },
      { from: './src/shared/styles/fonts', to: 'fonts' }
    ] ),
    new HtmlWebpackPlugin( {
      chunkSortMode: 'dependency',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/indexCordova.html'
    } )
  );
}
else if ( ENV_PRODUCTION_DESK_AOT || ENV_PRODUCTION_DESK_AOT_VIS ) {

  config.entry = {
    main: './src/main.aot.ts',
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts'
  };
  // config.module.rules.push(rules.typescriptaot);


  config.module.rules.push( rules.typescriptaot );

  config.output = {
    path: path.resolve( './target/aot' ),
    publicPath: '/'
  };

  if ( ENV_PRODUCTION_DESK_AOT_VIS ) {
    config.plugins.push( new BundleAnalyzerPlugin( {
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'server',
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: 'report.html',
      // Module sizes to show in report by default.
      // Should be one of `stat`, `parsed` or `gzip`.
      // See "Definitions" section for more information.
      defaultSizes: 'parsed',
      // Automatically open report in default browser
      openAnalyzer: true,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: false,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: 'silent'
    } ) )
  }

  config.plugins.push(
    new CommonsChunkPlugin( {
      name: [ 'vendor', 'polyfills' ],
      minChunks: Infinity
    } ),

    new CopyWebpackPlugin( [
      { from: './src/shared/assets', to: 'assets' },
      { from: './src/shared/styles/fonts', to: 'fonts' }
    ] ),
    new HtmlWebpackPlugin( {
      chunkSortMode: 'dependency',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    } )
  );


}


//=====================================
//  DEVELOPMENT
//-------------------------------------
if ( ENV_DEVELOPMENT ) {
  config.devtool = 'cheap-module-source-map';

  config.output.filename = '[name].js';

  config.module.rules.push( rules.sharedStyles );
  config.module.rules.push( rules.css );

  config.plugins.push(
    new ProgressPlugin(),
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)/, path.resolve( __dirname, './src' )
    ),
    new CopyWebpackPlugin( [
      { from: './src/shared/assets', to: 'assets' }
    ] ),
    new workboxPlugin.GenerateSW( {
      cacheId: 'shows-app[manifestHash]',
      clientsClaim: true,
      directoryIndex: 'index.html',
      // globDirectory: DIST_DIR,
      // globPatterns: [ '**/*.{html,js,css}' ],
      // importsDirectory: 'assets',
      importWorkboxFrom: 'local',
      navigateFallback: '/index.html',
      precacheManifestFilename: 'sa-manifest.[manifestHash].js',
      swDest: 'sw-dev.js',
      skipWaiting: true,
    } )
  );


  config.devServer = {
    contentBase: './src',
    compress: true,
    historyApiFallback: true,
    host: HOST,
    port: PORT,
    // https: {
    //     cert: fs.readFileSync('./certificates/elms.pem'),
    //     key: fs.readFileSync('./certificates/local_key.pem'),
    //     passphrase: 'changeit'
    // },
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  };
}


//=====================================
//  PRODUCTION
//-------------------------------------
if ( ENV_DESKTOP_AOT_CORDOVA ) {
  config.devtool = 'source-map';


  if ( IS_DEV === 'false' ) {
    // console.log('PRODUCTION BUILD !!!!!!!!!!!!!!!!!!!!!!!!!!!!!', IS_DEV);
    config.module.rules.push( rules.stringReplaceProd, rules.typescriptaot );
    // config.module.rules.push( rules.typescriptaot);
  } else {
    // console.log('DEV BUILD !!!!!!!!!!!!!!!!!!!!!!!!!!!!!', IS_DEV);

    config.module.rules.push( rules.stringReplaceDev, rules.typescriptaot );

  }

  config.output.filename = '[name].[chunkhash].js';

  config.module.rules.push( rules.sharedStylesExtracted );
  config.module.rules.push( rules.css );

  config.plugins.push(
    new AngularCompilerPlugin( {
      tsConfigPath: './tsconfig.cordova.aot.json',
      entryModule: `${__dirname}/src/components/app/app.module#AppModule`,
      sourcemap: true
    } ),
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve( __dirname, '/src' )
    ),
    new WebpackMd5Hash(),
    new ExtractTextPlugin( 'styles.[contenthash].css' ),
    new CopyWebpackPlugin( [
      { from: './src/shared/assets', to: 'assets' },
      { from: './src/manifest.json' }

    ] ),
    new UglifyJsPlugin( {
      comments: true,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: false, // eslint-disable-line camelcase
        unused: true,
        warnings: false,
        drop_console: false //added this...

      },
      mangle: { screw_ie8: true }
    } )
  );
}
else if ( ENV_PRODUCTION_DESK_AOT || ENV_PRODUCTION_DESK_AOT_VIS ) {
  config.devtool = 'source-map';

  config.output.filename = '[name].[chunkhash].js';

  config.module.rules.push( rules.sharedStylesExtracted );
  config.module.rules.push( rules.css );

  config.plugins.push(
    new AngularCompilerPlugin( {
      tsConfigPath: './tsconfig.aot.json',
      entryModule: `${__dirname}/src/components/desktop/app/app.module#AppModule`,
      sourcemap: true
    } ),
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve( __dirname, '/src' )
    ),
    new WebpackMd5Hash(),
    new ExtractTextPlugin( 'styles.[contenthash].css' ),
    new CopyWebpackPlugin( [
      { from: './src/shared/assets', to: 'assets' },
      { from: './src/manifest.json' }

    ] ),
    new UglifyJsPlugin( {
      comments: true,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: false, // eslint-disable-line camelcase
        unused: true,
        warnings: false,
        drop_console: false //added this...

      },
      mangle: { screw_ie8: true }
    } ),
    new workboxPlugin.GenerateSW( {
      cacheId: 'showsapp-pwa',
      clientsClaim: true,
      directoryIndex: 'index.html',
      // globDirectory: DIST_DIR,
      // globPatterns: [ '**/*.{html,js,css}' ],
      // importsDirectory: 'assets',
      importWorkboxFrom: 'local',
      navigateFallback: '/index.html',
      precacheManifestFilename: 'sa-manifest.[manifestHash].js',
      swDest: 'swapppwa.js',
      skipWaiting: true,
    } )
  );
}


//=====================================
//  TEST
//-------------------------------------
if ( ENV_TEST ) {
  config.devtool = 'inline-source-map';

  config.module.rules.push( rules.typescript );
  config.plugins.push(
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve( __dirname, '/src' )
    )
  );

  // console.log('the config is', config.module.rules);

}
