# Change log

All notable changes to this project will be documented in this file, following
the [Keep a CHANGELOG][keep-a-changelog] format.

## [Unreleased][unreleased]

### Added

- eHealth Bootstrap theme
- New application icon

### Changed

- Programmatic Cordova builds

### Fixed

- Asset linking in Cordova builds
- Electronic signature on some devices (via Crosswalk)

### Removed

- Unused (mock) authentication service
- Unused pouch-persist artefacts and other dead code
- Favicon generation (we're targeting Cordova)

### Security

- Restrict Cordova access to required DB endpoints

## [1.0.1] - 2015-02-17

### Added

- Received stock between delivery column
- Cordova build task (`gulp cordova`)
- Enhanced schedule history table, with colour coding
- Source maps to builds
- Show product-specific presentation in delivery workflow
- Show today's date in home screen

### Changed

- Fixture driver ID to `a@a.com`

### Fixed

- Daily schedule resolving in home screen tabs
- Initial empty schedule table

## 1.0.0 - 2015-02-10

### Added

- First release

[unreleased]: https://github.com/eHealthAfrica/direct-delivery/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/eHealthAfrica/direct-delivery/compare/v1.0.0...v1.0.1
[keep-a-changelog]: http://keepachangelog.com
