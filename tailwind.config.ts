import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        perpetua: ['Perpetua', 'serif'],
      },
      maxWidth: {
        site: '2000px',
      },
      spacing: {
        'nav-offset': '60px',
        'global': '10px',
      },
      letterSpacing: {
        tightest: '-3px',
      },
      screens: {
        desktop: '768px',
      },
    },
  },
  plugins: [],
};

export default config;
