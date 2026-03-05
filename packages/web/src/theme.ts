import type { Interpolation } from "@emotion/react"
import { extendTheme, type Theme } from "@mui/joy"
export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          "500": "#5F65CA", // Default
          "600": "#5F65CA", // Hover 
          "700": "#5357A1", // Focus / Click,
          outlinedBorder: "#D9D9D9",
        },
        // neutral: {
        //   "500": "#C5C5CD", // Default
        //   "600": "#C5C5CD", // Hover 
        //   "700": "#333", // Focus / Click
        //   solidColor: "#524A69"
        // },
        // danger: {
        //   "500": "#E5A19A", // Default
        //   "600": "#E5A19A", // Hover 
        //   "700": "#E68D85", // Focus / Click
        //   solidColor: "#973A32",
        // },
        background: {
          level1: '#FFFFFF',
          level2: '#F2F3F6',
        },
      },
    }
  },
  components: {
    JoyInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.vars.fontSize.md,
          color: "#333"
        })
      }
    },
     MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '36px',
          color: '#333',
        },
      },
    },
  }
})
export const globalStylesProperties: Interpolation<Theme> = {
  "& .lucide": {
    color: "#333",
    fontSize: "38px",
    width: "36px",
    height: "36px",
  },
}