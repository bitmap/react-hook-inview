# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.3.4] - 2020-11-17

### Added

- Storybook

### Changed

- Update tests to render hooks instead of components
- Update types and fix deps array to appease coverage
- Add @deprecated flag to legacy options

## [4.3.1] - 2020-10-9

### Changed

- Fix a bug where `root` option was not updating observer unless ref was passed as a dependency

## [4.3.0] - 2020-8-28

### Added

- Jest tests

### Changed

- No API updates, but refactored everything to rely more on useCallback and consolidated useInViewEffect and internal useObserver functions

## [4.2.0] - 2020-3-27

### Changed

- Fix a bug in Firefox where "inView" always returns true if threshold is not 0

## [4.1.2] - 2019-8-14

### Added

- Added ES module support
- Add `@cabe/typescript` eslint config
- Simplify publish

## [4.0.0] - 2019-6-26

### Changed

- Major API refactor
  - `useInView` now returns a ref, boolean, entry, and observer
  - Deprecated `target` option in favor of new API
  - Added internal `useObserver` hook to manage observer instance
- Expanded TypeScript definitions

### Added

- `useInViewEffect` hook added that accepts a only callback and options

## [3.0.0] - 2019-5-29

### Added

- New optional argument to trigger an update to effect hook

## [2.2.2] - 2019-5-8

### Changed

- [PR from @krazyjakee](https://github.com/bitmap/react-hook-inview/pull/2)
  - Fix a bug where es6 modules cannot be compiled
  - Automatically export type definitions file on compile
  - Add prepare script to package.json, change types file to `dist/index.d.ts

### Added

- Added .npmignore to ignore `src` on npminstall

## [2.1.0] - 2019-5-3

### Changed

- 100% TypeScript
- `onEnter` and `onLeave` no longer return an array, just a single `IntersectionObserverEntry`

## [2.0.2] - 2019-4-19

### Added

- Add WIP TypeScript file

### Changed

- Fix typo, update readme

## [2.0.1] - 2019-4-19

### Changed

- Better type definitions

## [2.0.0] - 2019-4-18

### Added

- TypeScript definitions

### Changed

- Module is now a named export: `import { useInView } from 'react-hook-inview`
- Updated eslint configuration

## [1.0.2] - 2019-3-11

### Removed

- Rollback `useLayoutEffect`, no noticiable performance benefits and causes errors server-side

## [1.0.1] - 2019-2-14

### Changed

- replace `useEffect` with `useLayoutEffect`

## [1.0.0] - 2019-2-12

Initial release

[4.3.1]: https://www.npmjs.com/package/react-hook-inview/
[4.3.0]: https://www.npmjs.com/package/react-hook-inview/v/4.3.0
[4.2.0]: https://www.npmjs.com/package/react-hook-inview/v/4.2.0
[4.1.2]: https://www.npmjs.com/package/react-hook-inview/v/4.1.2
[4.0.0]: https://www.npmjs.com/package/react-hook-inview/v/4.0.0
[3.0.0]: https://www.npmjs.com/package/react-hook-inview/v/3.0.0
[2.2.2]: https://www.npmjs.com/package/react-hook-inview/v/2.2.2
[2.1.0]: https://www.npmjs.com/package/react-hook-inview/v/2.1.0
[2.0.2]: https://www.npmjs.com/package/react-hook-inview/v/2.0.2
[2.0.1]: https://www.npmjs.com/package/react-hook-inview/v/2.0.1
[2.0.0]: https://www.npmjs.com/package/react-hook-inview/v/2.0.0
[1.0.2]: https://www.npmjs.com/package/react-hook-inview/v/1.0.2
[1.0.1]: https://www.npmjs.com/package/react-hook-inview/v/1.0.1
[1.0.0]: https://www.npmjs.com/package/react-hook-inview/v/1.0.0
