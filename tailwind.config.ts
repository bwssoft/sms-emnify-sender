import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
				rightModalOpen: {
					from: { opacity: '0', transform: 'translateX(2000px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				overlayShow: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				centerModalOpen: {
					from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
					to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
				},
				slideDownAndFade: {
					from: { opacity: '0', transform: 'translateY(-2px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				slideLeftAndFade: {
					from: { opacity: '0', transform: 'translateX(2px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				slideUpAndFade: {
					from: { opacity: '0', transform: 'translateY(2px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					'0%': { transform: 'translateY(200%)' },
					'100%': { transform: 'translateY(0)' },
				},
				fadeOut: {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(200%)' },
				},
				slideRightAndFade: {
					from: { opacity: '0', transform: 'translateX(-2px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
			},
			animation: {
				'right-modal-open': 'rightModalOpen 600ms ease-in-out',
				'overlay-show': 'overlayShow 300ms ease-in-out',
				'center-modal-open': 'centerModalOpen 150ms ease-in-out',
				'slide-down-and-fade': 'slideDownAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-left-and-fade': 'slideLeftAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-up-and-fade': 'slideUpAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-right-and-fade': 'slideRightAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)',
				'fade-in': 'fadeIn 700ms ease-in-out',
				'fade-out': 'fadeOut 700ms ease-in-out'
			},
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwindcss-animate'),
  ],
}
export default config
