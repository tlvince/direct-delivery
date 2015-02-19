# Release

Direct Delivery is an Angular app, packaged as an Android app via Cordova.

Create a new release via:

1. Increment the build version:

        gulp release [--major|--minor|--patch]

2. Build the Android app:

        gulp build

3. Build the Cordova app:

        gulp cordova
