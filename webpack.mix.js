const mix = require('laravel-mix');
const webpack = require('webpack');
const {
    spawn
} = require('child_process');

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const {
    VuetifyProgressiveModule
} = require('vuetify-loader')

function generateRoute(event = null, file = null) {
    console.log(event, ': ', file);

    const ziggy = spawn('php', ['artisan', 'ziggy:generate', 'resources/assets/js/providers/route-provider.js']);

    ziggy.stdout.on('data', data => {
        console.log(`stdout: ${data}`);
    });

    ziggy.stderr.on('data', data => {
        console.log(`stderr: ${data}`);
    });

    ziggy.on('close', code => {
        console.log(`child process exited with code ${code}`);
    });
}
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.disableNotifications()
    .webpackConfig({
        resolve: {
            modules: [
                path.resolve('./resources/assets/js'),
                path.resolve('./node_modules'),
            ]
        },
        output: {
            publicPath: '/',
            filename: mix.config.production ? '[name].[chunkhash].js' : '[name].js',
            chunkFilename: mix.config.production ? 'js/chunks/[name].[chunkhash].js' : 'js/chunks/[name].js',
        },
        module: {
            rules: [
                // {
                //     test: /\.vue$/,
                //     loader: 'vue-loader',
                //     options: {
                //         compilerOptions: {
                //             modules: [VuetifyProgressiveModule]
                //         }
                //     }
                // },
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)(\?.*)?$/,
                    oneOf: [{
                        test: /\.(png|jpe?g|gif)$/,
                        resourceQuery: /vuetify-preload/,
                        use: [
                            'vuetify-loader/progressive-loader',
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8000
                                }
                            }
                        ]
                    }]
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                axios: 'axios',
                _: 'lodash',
                Vue: 'vue',
                moment: 'moment'
            }),
            new VuetifyLoaderPlugin()
        ],
    })
    // .js('resources/js/auth.js', 'public/js/auth.js')
    .js('resources/js/app.js', 'public/js/app.js')
    // .sass('resources/sass/auth.scss', 'public/css/auth.css')
    .sass('resources/sass/app.scss', 'public/css/app.css')
    .sourceMaps()
    .browserSync({
        open: false,
        https: false,
        port: 3031,
        proxy: 'mea-complaint.test',
        host: 'mea-complaint.test',
        files: [
            './app',
            './resources',
            {
                match: ["routes/*.php"],
                fn: (event, file) => (generateRoute(event, file))
            }
        ]
    })
    .version()
    .then(function () {
        generateRoute()
    });
