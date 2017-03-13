# Dao of Code

Dao of Code is a social platform for those who are interested in learning
to code. With Dao of Code you can easily share images, videos, audio and
code snippets with other students.

This is the front end repository. The back end can be found at [https://github.com/jukump/dao-of-code-backend](https://github.com/jukump/dao-of-code-backend).

# Application Builds

## Android
The latest Android build can be downloaded at
[https://dao-api.othnet.ga/builds/latest.apk](https://dao-api.othnet.ga/builds/latest.apk).

To build the APK from source, make sure you have Ionic 2 and Cordova installed:

```sh
npm install -g cordova ionic
```

Then execute the following command to build the APK:

```sh
ionic build android
```

Note that this requires you to have Android Studio and SDK installed
as well as the `ANDROID_HOME` environment variable in your `PATH`.

## iOS
Looking for an iOS build? Build yourself! Here's how:

To build for iOS from source, make sure you have Ionic 2 and Cordova installed:

```sh
npm install -g cordova ionic
```

Then execute the following command to build:

```sh
ionic build ios
```

Note that you will need Xcode 7 or newer, iOS 9 or newer and an Apple ID
or Apple Developer account
