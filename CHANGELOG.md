# Change log

All notable changes to this project will be documented in this file, following
the [Keep a CHANGELOG][keep-a-changelog] format.

## [unrealesed] - next version

### Added

- Add descriptive label to cancel comment text box
- Color code facility round status at schedule history
- Color code interim stock count column to purple
- Save deliver items values on exit and preview to avoid loss of data before final save.
- Recipient phone number at sign off screen
- Attempt sync if connection status change and the device is online
- Add Date subhead to facility rounds at schedule history page.

### Changed

- Update sync fail message
- Color code cancel delivery options and make radio button bigger

### Fixed

- Color code parking list items
- Dot your i’s while signing signature bug fix
- Fix network connection status listener bug

### Security

- Auto re-login before sync attempt if session has expired.


## [1.0.2] - 2015-03-06 17:09:42 +0100

### Added

- eHealth Bootstrap theme
- New application icon
- Recipient name at sign off screen
- Drop-down logout menu
- Show current logged in user
- Add legend to cancel screen
- Add label to cancel comment box
- Responsive and stay at the top navbar
- Color code facility round status
- Hamburger menu on small screens (i.e collapse nav on small screens)

### Changed

- Programmatic Cordova builds
- Change label from "Returned Qty" to "Retrieved Qty"
- Large input fields (button, input fields, radio buttons, and checkboxes)

### Fixed

- Hide sync msg while offline and update sync messages
- Asset linking in Cordova builds
- Electronic signature on some devices (via Crosswalk)
- Instant auto calculate of qtys once onHand qty changes

### Removed

- Unused (mock) authentication service
- Unused pouch-persist artefacts and other dead code
- Favicon generation (we're targeting Cordova)
- Remove number input field spinners space on tablet
- Removed input field paddings and right aligned qty input values

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
