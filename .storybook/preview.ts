import { DarkMode } from "@mui/icons-material";
import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';

export const parameters = {
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black'},
    // Override the default light theme
    light: { ...themes.normal, appBg: 'red' }
  },
  DarkMode: {
    stylePreview: true
  },
};


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};


export default preview;
