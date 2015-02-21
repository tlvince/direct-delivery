# Release

Direct Delivery is an Angular app, packaged as an Android app via Cordova.

We currently have two build types: *debug* and *release*. Debug builds are
unsigned and suitable for testing. Release builds are signed and ready for
distribution.

## Debug

Create a debug build via:

1. Increment the build version:

        gulp release [--major|--minor|--patch]

2. Build the Android app:

        NODE_ENV=stage gulp build

3. Build the Cordova app:

        gulp cordova

## Release

Create a release build via:

1. Increment the build version:

        gulp release [--major|--minor|--patch]

2. Build the Android app:

        NODE_ENV=production gulp build

3. Build the Cordova app:

        gulp cordova --release
