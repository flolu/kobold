/** @type {import('tailwindcss').Config} */

const {fontFamily, fontSize} = require('tailwindcss/defaultTheme')

// Make custom color opacity work with CSS variables
const withOpacity = variableName => {
  return ({opacityVariable, opacityValue}) => {
    if (opacityValue) return `rgba(var(${variableName}), ${opacityValue})`
    if (opacityVariable) return `rgba(var(${variableName}), var(${opacityVariable}, 1))`
    return `rgb(var(${variableName}))`
  }
}

const backgroundColors = {
  50: withOpacity('--background-50'),
  100: withOpacity('--background-100'),
  500: withOpacity('--background-500'),
  900: withOpacity('--background-900'),
}

const backgroundGlassColors = {
  50: 'rgba(var(--background-50), var(--glass-opacity-50))',
  100: 'rgba(var(--background-100), var(--glass-opacity-100))',
  500: 'rgba(var(--background-500), var(--glass-opacity-500))',
  900: 'rgba(var(--background-900), var(--glass-opacity-900))',
}

const foregroundColors = {
  50: withOpacity('--foreground-50'),
  100: withOpacity('--foreground-100'),
  500: withOpacity('--foreground-500'),
  900: withOpacity('--foreground-900'),
}

const primaryColors = {
  50: withOpacity('--primary-50'),
  100: withOpacity('--primary-100'),
  500: withOpacity('--primary-500'),
  900: withOpacity('--primary-900'),
}

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{sass,scss,css}',
  ],
  theme: {
    colors: {
      current: 'currentColor',
      primary: primaryColors,
      background: backgroundColors,
    },
    fontFamily: {
      sans: ['var(--font-main)', ...fontFamily.sans],
      serif: fontFamily.serif,
      mono: fontFamily.mono,
    },
    fontSize: {
      ...fontSize,
      sm: ['0.9rem', '1.3rem'],
      base: ['1.1rem', '1.6rem'],
      lg: ['1.3rem', '1.8rem'],
    },
    extend: {
      textColor: {
        ...foregroundColors,
        primary: primaryColors,
      },
      backgroundColor: {
        ...backgroundColors,
        primary: primaryColors,
        glass: backgroundGlassColors,
      },
      borderColor: {
        ...foregroundColors,
        background: backgroundColors,
        primary: primaryColors,
      },
      opacity: {
        theme: 'var(--opacity)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
