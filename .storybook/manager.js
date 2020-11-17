import { addons } from '@storybook/addons';

const theme = {
  base: 'dark',

  colorPrimary: 'pink',
  colorSecondary: 'rgba(255, 255, 255, 0.25)',

  // UI
  appBg: '#000',
  appContentBg: '#1a1a1a',
  appBorderColor: 'rgba(255,255,255,0.25)',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'white',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: 'white',
  barBg: '#1a1a1a',

  // Form colors
  inputBg: 'grey',
  inputBorder: 'transparent',
  inputTextColor: 'white',
  inputBorderRadius: 0,

  brandTitle: 'react-hook-inview',
  brandUrl: 'https://bitmap.github.io/react-hook-inview',
};

addons.setConfig({
  isFullscreen: false,
  showNav: false,
  showPanel: true,
  panelPosition: 'right',
  sidebarAnimations: true,
  isToolshown: false,
  theme,
  selectedPanel: undefined,
  initialActive: 'canvas',
});
