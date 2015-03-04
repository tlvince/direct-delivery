# Build Environment

*Note*, these instructions are for OS X, but should be similar for Linux.

## Prerequisites

Install [Node.js][], [Git][], [CouchDB][] and [ImageMagick][].

[Homebrew][] will also help you tremendously.

[Node.js]: http://nodejs.org
[Git]: http://git-scm.com
[CouchDB]: https://couchdb.apache.org
[ImageMagick]: http://imagemagick.org
[Homebrew]: http://brew.sh

## npm

We currently target Node v0.10, but our dependencies require a newer version
(v2.x) of `npm` than the bundled version (v1.x).

The upstream-recommended way to update `npm` is:

    npm install -g npm@latest

## Android

To be able to manually produce Android builds, you need to set up the Android
SDK.

### 1. Install the [Java JDK][jdk]

[jdk]: http://www.oracle.com/technetwork/java/javase/downloads/index.html

### 2. Install Ant

You may be able to make this work with `brew install ant`. In all other
cases, do it manually. [Download Ant][ant] and unzip it to somewhere.

[ant]: http://ant.apache.org/bindownload.cgi

### 3. Install the Android SDK

[Install the Android SDK manually][android-sdk]. Install the ADT bundle. You
won't need half of it (just forget about the `eclipse` folder), put the `sdk`
folder somewhere you'll find it again. You can theoretically do `brew install
android-sdk`, but this led to weird problems later on.

You'll get [detailed instructions on running the thing][android-installing]
while the zip file is downloading, they vary from platform to platform.

[android-sdk]: https://developer.android.com/sdk/index.html
[android-installing]: https://developer.android.com/sdk/installing/index.html

### 4. Update your Path variable

Now's a good time to let your system know about all this new software. In your
`.bashrc`/`.profile` (ignore the first two lines if you installed Ant with
Homebrew):

    export ANT_HOME=/path/to/apache-ant-1.9.4
    export PATH=${PATH}:/path/to/apache-ant-1.9.4/bin

    export ANDROID_HOME=/path/to/android-sdk
    export PATH=${PATH}:/path/to/android-sdk/bin
    export PATH=${PATH}:/path/to/android-sdk/tools
    export PATH=${PATH}:/path/to/android-sdk/platform-tools

And don't forget to restart your terminal session.

Once all that's done, you'll have to [manually add packages][android-packages]
to your SDK installation. Run the SDK manager as described for your platform,
ideally, just run `android`. You may have to `sudo` it, depending on how you
installed it. If the next step fails, use `sudo`, or `chown` the Android SDK
folder.

[android-packages]: https://developer.android.com/sdk/installing/adding-packages.html

The next bit is slightly confusing: a bunch of stuff is pre-selected, but *not
preinstalled*. Make sure the latest Android SDK Tools, platform-tools,
build-tools and SDK platform is installed for `Android 5.0.1 (API 21)`.

Click `Install n packages` to continue. Accept the license agreement and make
some tea. Then you can finally continue the [build][] steps.

[build]: build.md
