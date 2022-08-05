const {series, rimraf,} = require('nps-utils');

module.exports = {
    scripts: {
        default: 'nps start',

        /**
         * Builds the app into the dist directory
         */
        build: {
            script: series(
                'nps banner.build',
                'nps clean.dist',
                'nps transpile',
                'nps copy.tmp',
                'nps copy.assets',
                'nps clean.tmp',
            ),
            description: 'Builds the app into the dist directory'
        },
        /**
         * Starts the builded app from the dist directory.
         */
        start: {
            script: 'node dist/src/server.js',
            description: 'Starts the built app',
        },

        /**
         * Transpile your app into javascript
         */
        transpile: {
            script: `tsc --project ./tsconfig.json`,
            hiddenFromHelp: true
        },
        /**
         * These run various kinds of tests. Default is unit.
         */
        test: {
            default: 'nps test.integration',
            integration: {
                default: {
                    script: series(
                        'nps banner.testIntegration',
                        'nps test.integration.run'
                    ),
                    description: 'Runs the integration tests'
                },
                run: {
                    script: 'cross-env ENV=test jest --testPathPattern=tests/integration --coverage=false --verbose --no-cache  --detectOpenHandles --runInBand --forceExit',
                    hiddenFromHelp: true
                },
            },
            unit: {
                default: {
                    script: series(
                        'nps banner.testUnit',
                        'nps test.unit.run'
                    ),
                    description: 'Runs the unit tests'
                },
                run: {
                    script: 'cross-env ENV=test jest --testPathPattern=tests/unit --coverage=false --verbose --no-cache  --detectOpenHandles --runInBand --forceExit',
                    hiddenFromHelp: true
                },
            }
        },

        /**
         * Copies static files to the build folder
         */
        copy: {
            tmp: {
                script: copyDir(
                    './.tmp',
                    './dist'
                ),
                hiddenFromHelp: true

            }
        },

        /**
         * Clean files and folders
         */
        clean: {
            default: {
                script: series(
                    `nps banner.clean`,
                    `nps clean.dist`
                ),
                description: 'Deletes the ./dist folder'
            },
            dist: {
                script: rimraf('./dist'),
                hiddenFromHelp: true
            },
            tmp: {
                script: rimraf('./.tmp'),
                hiddenFromHelp: true
            }
        },


        /**
         * This creates pretty banner to the terminal
         */
        banner: {
            build: banner('build'),
            testUnit: banner('test.unit'),
            testIntegration: banner('test.integration'),
        },

        /**
         * Copies static files to the build folder
         */
        copy: {
            tmp: {
                script: copyDir(
                    './.tmp',
                    './dist'
                ),
                hiddenFromHelp: true
            },
            package_json: {
                script: copyDir(
                    '../package.json',
                    './dist'
                ),
                hiddenFromHelp: true
            },
            openapi_json: {
                script: copyDir(
                    '../openapi_v1.json',
                    './dist'
                ),
                hiddenFromHelp: true
            },
            assets: {
                script: copyDir(
                    './assets',
                    './dist/assets'
                ),
                hiddenFromHelp: true
            }
        },
    }

}

function banner(name) {
    return {
        hiddenFromHelp: true,
        silent: true,
        description: `Shows ${name} banners to the console`,
        script: runFast(`./commands/banner.ts ${name}`),
    };
}

function copy(source, target) {
    return `copyfiles --up 1 ${source} ${target}`;
}

function copyDir(source, target) {
    return `ncp ${source} ${target}`;
}

function run(path) {
    return `ts-node ${path}`;
}

function runFast(path) {
    return `ts-node --transpile-only ${path}`;
}

function tslint(path) {
    return `tslint -c ./tslint.json ${path} --format stylish`;
}
