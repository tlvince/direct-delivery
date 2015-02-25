# Publishing

Before you can build a release version, you'll have to set up the release keys
for the Play Store. They consist of two files: `ant.properties` and
`ehealth.keystore`. Both should be placed in the hidden `.android` directory.
Please ask an active [contributor][] for a copy.

Then:

1. Pull latest changes and `npm install`, just in case
2. Run the tests `npm test`. Don't proceed if they fail
3. Increment the version number via `gulp release [--major|--minor|--patch]`
   ([semver][])
4. Push the tags (`git push --tags`). TravisCI will build the release APKs for
   you and put them in the [direct-delivery][s3] S3 bucket
5. Download the latest release APK
5. Log in to the [Google Play Store Developer Console][play] (ask @janetbutts
   if you run into permission issues)
6. Under the `APK`-tab in the second sidebar, navigate to "Upload new APK to
   Production", upload the `direct-delivery-v[semver].apk` file and confirm the
   release
7. Wait a few hours (takes between one and five hours until the new version is
   online in the Play Store)
8. Notify @janetbutts for follow-up

[contributor]: https://github.com/eHealthAfrica/direct-delivery/graphs/contributors
[semver]: http://semver.org
[s3]: https://shrub.appspot.com/direct-delivery/
[play]: https://play.google.com/apps/publish
