# Build

Direct Delivery is an Angular app, packaged as an Android app via Cordova.

We currently have two build types: *debug* and *release*. Debug builds are
unsigned and suitable for testing. Release builds are signed and ready for
distribution.

Our continuous integration server (TravisCI) automates our Android builds on
the following conditions:

* Pushes to `develop` produce *debug* builds
* New tags produce *release* builds

All other triggers (pull requests, other branches) are ignored.

Resulting APKs are deployed to Amazon S3 and can be browsed at:
<https://shrub.appspot.com/direct-delivery/>

#Pre Build Steps

Remember to add all required cordova plugins to /cordova-plugins.json

## Manual

After your [build environment][] has been set up, APKs can be
built manually via the following. Resulting files can be found in `build`.

[build environment]: build-environment.md

### Debug

Create a debug build via:

1. Increment the build version:

        gulp release [--major|--minor|--patch]

2. Build the Android app:

        NODE_ENV=stage gulp build

3. Build the Cordova app:

        gulp cordova

### Release

Create a release build via:

1. Increment the build version:

        gulp release [--major|--minor|--patch]

2. Build the Android app:

        NODE_ENV=production gulp build

3. Build the Cordova app:

        gulp cordova --release
