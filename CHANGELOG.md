# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.1] - 2019-5-8
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
- `onEnter` and `onLeave` no long return an array, just a single `IntersectionObserverEntry`

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

[2.2.1]: https://www.npmjs.com/package/react-hook-inview/v/2.2.1
[2.0.2]: https://www.npmjs.com/package/react-hook-inview/v/2.0.2
[2.0.1]: https://www.npmjs.com/package/react-hook-inview/v/2.0.1
[2.0.0]: https://www.npmjs.com/package/react-hook-inview/v/2.0.0
[1.0.2]: https://www.npmjs.com/package/react-hook-inview/v/1.0.2
[1.0.1]: https://www.npmjs.com/package/react-hook-inview/v/1.0.1
[1.0.0]: https://www.npmjs.com/package/react-hook-inview/v/1.0.0
