export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'polkadot-pink',
      neutral: 'cyan',
      error: 'red',
    },
    input: {
      slots: {
        root: 'w-full',
        base: 'w-full !px-4 !py-3 !bg-darker-bg !border !border-cyber-blue !ring-0 !ring-transparent !text-text-primary !text-base !font-normal rounded-none transition-all duration-300 ease-in-out focus:!outline-none focus:!border-[#00FF41] focus:!ring-0 placeholder:text-gray-500',
        leading: 'hidden',
        trailing: 'hidden'
      },
      variants: {
        variant: {
          outline: {
            base: '!bg-darker-bg !ring-0'
          }
        },
        color: {
          neutral: {
            base: '!bg-darker-bg !ring-0 !border-cyber-blue'
          },
          error: {
            base: '!bg-darker-bg !ring-0 !border-neon-red'
          }
        },
        size: {
          md: {
            base: ''
          }
        }
      },
      defaultVariants: {
        variant: 'outline',
        color: 'neutral',
        size: 'md'
      }
    },
    textarea: {
      slots: {
        root: 'w-full',
        base: 'w-full !px-4 !py-3 !bg-darker-bg !border !border-cyber-blue !ring-0 !ring-transparent !text-text-primary !text-base !font-normal rounded-none resize-none transition-all duration-300 ease-in-out focus:!outline-none focus:!border-[#00FF41] focus:!ring-0 placeholder:text-gray-500'
      },
      variants: {
        variant: {
          outline: {
            base: '!bg-darker-bg !ring-0'
          }
        },
        color: {
          neutral: {
            base: '!bg-darker-bg !ring-0 !border-cyber-blue'
          },
          error: {
            base: '!bg-darker-bg !ring-0 !border-neon-red'
          }
        },
        size: {
          md: {
            base: ''
          }
        }
      },
      defaultVariants: {
        variant: 'outline',
        color: 'neutral',
        size: 'md'
      }
    }
  }
})
